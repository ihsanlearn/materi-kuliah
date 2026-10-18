import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { toString } from "mdast-util-to-string";
import type { Heading, Root } from "mdast";

export interface HeadingNode {
  id: string;
  text: string;
  level: number;
  children: HeadingNode[];
}

/** Keep this algorithm compatible with the original MarkdownRenderer slugger. */
export function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s/g, "-")
    .replace(/^-|-$/g, "");
}

/** Creates a fresh, deterministic ID allocator for one Markdown document. */
export function createHeadingIdAllocator() {
  const used = new Set<string>();

  return (text: string): string => {
    const base = slugifyHeading(text);
    if (!used.has(base)) {
      used.add(base);
      return base;
    }

    let suffix = 1;
    let candidate = `${base}-${suffix}`;
    while (used.has(candidate)) {
      suffix += 1;
      candidate = `${base}-${suffix}`;
    }
    used.add(candidate);
    return candidate;
  };
}

function getHeadings(root: Root): Heading[] {
  const headings: Heading[] = [];
  const walk = (node: Root | Heading | { type: string; children?: unknown[] }) => {
    if (node.type === "heading") headings.push(node as Heading);
    if ("children" in node && Array.isArray(node.children)) {
      for (const child of node.children) {
        if (child && typeof child === "object" && "type" in child) {
          walk(child as Root | Heading | { type: string; children?: unknown[] });
        }
      }
    }
  };

  walk(root);
  return headings;
}

/** Extract h1-h3 headings into a nested tree. Code-block contents are not headings in mdast. */
export function extractHeadings(markdown: string): HeadingNode[] {
  const root = unified().use(remarkParse).use(remarkGfm).parse(markdown);
  const headings = getHeadings(root);
  const createId = createHeadingIdAllocator();
  const firstH1 = headings.findIndex((heading) => heading.depth === 1);
  const roots: HeadingNode[] = [];
  const stack: HeadingNode[] = [];

  headings.forEach((heading, index) => {
    const text = toString(heading).trim();
    const id = createId(text);
    if (heading.depth > 3 || !text) return;

    // The page title is rendered outside the Markdown body; omit only the first h1.
    if (index === firstH1) return;

    const node: HeadingNode = {
      id,
      text,
      level: heading.depth,
      children: [],
    };

    while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];
    if (parent) parent.children.push(node);
    else roots.push(node);
    stack.push(node);
  });

  return roots;
}
