"use client";

import { useState } from "react";
import { PanelLeftOpen } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Breadcrumb from "@/components/Breadcrumb";
import type { MateriItem } from "@/lib/types";
import type { HeadingNode } from "@/lib/headings";
import { formatCourseName } from "@/lib/utils";

interface MateriDetailProps {
  course: string;
  title: string;
  description: string;
  date: string;
  content: string;
  materiList: MateriItem[];
  headings: HeadingNode[];
}

export default function MateriDetail({
  course,
  title,
  description,
  date,
  content,
  materiList,
  headings,
}: MateriDetailProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const formattedDate = date
    ? new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="flex">
      <Sidebar
        course={course}
        materiList={materiList}
        headings={headings}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-w-0 flex-1">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mb-4 sm:mb-6">
            <Breadcrumb
              items={[
                { label: "Materi", href: "/materi" },
                { label: formatCourseName(course), href: `/materi/${course}` },
                { label: title },
              ]}
            />
          </div>

          <header className="mb-6 border-b border-slate-200 pb-6 sm:mb-8 sm:pb-8 dark:border-slate-800">
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 sm:mb-3 sm:text-3xl lg:text-4xl dark:text-white">
              {title}
            </h1>
            {description && (
              <p className="mb-3 text-base leading-relaxed text-slate-500 sm:mb-4 sm:text-lg dark:text-slate-400">
                {description}
              </p>
            )}
            {formattedDate && (
              <time className="text-sm text-slate-400 dark:text-slate-500">
                {formattedDate}
              </time>
            )}
          </header>

          <MarkdownRenderer content={content} />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        aria-label="Buka navigasi materi"
        className="fixed right-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-30 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-900/20 transition hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 active:scale-95 lg:hidden"
      >
        <PanelLeftOpen className="h-4 w-4" />
        Navigasi
      </button>
    </div>
  );
}
