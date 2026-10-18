"use client";

import React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface MarkdownRendererProps {
  content: string;
}

/**
 * Build stable anchor IDs for Markdown headings so links such as
 * [Introduction](#1-introduction) can scroll to the right section.
 */
function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getTextContent(node.props.children);
  }

  return "";
}

function slugifyHeading(children: React.ReactNode): string {
  return getTextContent(children)
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s/g, "-")
    .replace(/^-|-$/g, "");
}

const markdownComponents: Components = {
  h1: ({ children, ...props }) => (
    <h1 {...props} id={slugifyHeading(children)}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 {...props} id={slugifyHeading(children)}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...props} id={slugifyHeading(children)}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 {...props} id={slugifyHeading(children)}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 {...props} id={slugifyHeading(children)}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 {...props} id={slugifyHeading(children)}>
      {children}
    </h6>
  ),
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-headings:font-semibold prose-h1:text-2xl prose-h1:sm:text-3xl prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2 prose-h2:dark:border-slate-800 prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline prose-a:dark:text-sky-400 prose-pre:overflow-x-auto prose-pre:bg-slate-900 prose-pre:text-sm prose-pre:dark:bg-slate-950 prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal prose-code:text-sky-600 prose-code:dark:bg-slate-800 prose-code:dark:text-sky-400 prose-table:block prose-table:overflow-x-auto prose-table:rounded-lg prose-table:border prose-table:border-slate-200 prose-table:dark:border-slate-800 prose-th:whitespace-nowrap prose-th:bg-slate-50 prose-th:dark:bg-slate-800/50 prose-td:border-t prose-td:border-slate-200 prose-td:dark:border-slate-800 prose-blockquote:border-sky-500 prose-blockquote:bg-sky-50/50 prose-blockquote:py-1 prose-blockquote:dark:bg-sky-950/20 prose-img:rounded-xl prose-img:shadow-md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
