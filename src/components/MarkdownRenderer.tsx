"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { toString } from "mdast-util-to-string";
import type { Plugin } from "unified";
import type { Root } from "mdast";
import { createHeadingIdAllocator } from "@/lib/headings";

interface MarkdownAstNode {
  type: string;
  depth?: number;
  children?: MarkdownAstNode[];
  data?: {
    hProperties?: Record<string, string>;
  };
}

/** Assign IDs in document order so Markdown anchors and the sidebar always agree. */
const remarkHeadingIds: Plugin<[], Root> = () => (tree) => {
  const createId = createHeadingIdAllocator();

  const walk = (node: MarkdownAstNode) => {
    if (node.type === "heading") {
      const text = toString(node as never).trim();
      node.data ??= {};
      node.data.hProperties ??= {};
      node.data.hProperties.id = createId(text);
    }

    node.children?.forEach(walk);
  };

  walk(tree as unknown as MarkdownAstNode);
};

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-headings:font-semibold prose-h1:text-2xl prose-h1:sm:text-3xl prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2 prose-h2:dark:border-slate-800 prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline prose-a:dark:text-sky-400 prose-pre:overflow-x-auto prose-pre:bg-slate-900 prose-pre:text-sm prose-pre:dark:bg-slate-950 prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal prose-code:text-sky-600 prose-code:dark:bg-slate-800 prose-code:dark:text-sky-400 prose-table:block prose-table:overflow-x-auto prose-table:rounded-lg prose-table:border prose-table:border-slate-200 prose-table:dark:border-slate-800 prose-th:whitespace-nowrap prose-th:bg-slate-50 prose-th:dark:bg-slate-800/50 prose-td:border-t prose-td:border-slate-200 prose-td:dark:border-slate-800 prose-blockquote:border-sky-500 prose-blockquote:bg-sky-50/50 prose-blockquote:py-1 prose-blockquote:dark:bg-sky-950/20 prose-img:rounded-xl prose-img:shadow-md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkHeadingIds]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
