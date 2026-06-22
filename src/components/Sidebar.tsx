"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, ChevronRight, X } from "lucide-react";
import type { MateriItem } from "@/lib/types";
import { formatCourseName } from "@/lib/utils";

interface SidebarProps {
  course: string;
  materiList: MateriItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ course, materiList, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-full w-72 transform overflow-y-auto border-r border-slate-200 bg-white/95 pt-16 backdrop-blur-xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950/95
          lg:sticky lg:top-16 lg:z-0 lg:h-[calc(100vh-4rem)] lg:translate-x-0 lg:pt-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800 lg:hidden">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            Navigasi
          </span>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4">
          {/* Course heading */}
          <Link
            href={`/materi/${course}`}
            className="mb-4 flex items-center gap-2 rounded-lg bg-sky-50 px-3 py-2.5 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-100 dark:bg-sky-950/50 dark:text-sky-300 dark:hover:bg-sky-950/70"
          >
            <ChevronRight className="h-3.5 w-3.5" />
            {formatCourseName(course)}
          </Link>

          {/* Materi list */}
          <nav className="space-y-0.5">
            {materiList.map((item) => {
              const href = `/materi/${course}/${item.slug}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={item.slug}
                  href={href}
                  onClick={onClose}
                  className={`
                    group flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-all
                    ${
                      isActive
                        ? "bg-sky-50 font-medium text-sky-700 shadow-sm dark:bg-sky-950/40 dark:text-sky-300"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
                    }
                  `}
                >
                  <FileText
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      isActive
                        ? "text-sky-500 dark:text-sky-400"
                        : "text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400"
                    }`}
                  />
                  <div className="min-w-0">
                    <span className="line-clamp-2 leading-snug">
                      {item.meta.title}
                    </span>
                    {isActive && (
                      <div className="mt-0.5 h-0.5 w-8 rounded-full bg-sky-500 dark:bg-sky-400" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
