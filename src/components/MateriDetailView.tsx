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
          <button
            onClick={() => setSidebarOpen(true)}
            className="mb-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
          >
            <PanelLeftOpen className="h-4 w-4" />
            Navigasi
          </button>

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
    </div>
  );
}
