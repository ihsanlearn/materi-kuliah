import Link from "next/link";
import { FolderOpen, FileText, ArrowRight } from "lucide-react";
import type { CourseInfo } from "@/lib/types";

interface CourseCardProps {
  course: CourseInfo;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/materi/${course.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-sky-800 dark:hover:shadow-sky-950/50"
    >
      {/* Gradient accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-sky-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition-transform duration-300 group-hover:scale-110 dark:bg-sky-950/50 dark:text-sky-400">
          <FolderOpen className="h-6 w-6" />
        </div>
        <ArrowRight className="h-5 w-5 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-sky-500 dark:text-slate-600 dark:group-hover:text-sky-400" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-slate-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
        {course.name}
      </h3>

      {course.description && (
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {course.description}
        </p>
      )}

      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500">
        <FileText className="h-3.5 w-3.5" />
        <span>
          {course.materiCount} materi
        </span>
      </div>
    </Link>
  );
}
