import Link from "next/link";
import { FileText, Calendar, ArrowRight } from "lucide-react";
import type { MateriItem } from "@/lib/types";

interface MateriCardProps {
  item: MateriItem;
  index: number;
}

export default function MateriCard({ item, index }: MateriCardProps) {
  const formattedDate = item.meta.date
    ? new Date(item.meta.date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <Link
      href={`/materi/${item.course}/${item.slug}`}
      className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/30 sm:gap-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-sky-800 dark:hover:shadow-sky-950/30"
    >
      {/* Order number */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-500 transition-all duration-300 group-hover:bg-sky-100 group-hover:text-sky-600 sm:h-10 sm:w-10 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-sky-950/50 dark:group-hover:text-sky-400">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 text-[15px] font-semibold leading-snug text-slate-900 transition-colors group-hover:text-sky-600 sm:text-base dark:text-white dark:group-hover:text-sky-400">
          {item.meta.title}
        </h3>
        {item.meta.description && (
          <p className="mb-2 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {item.meta.description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 sm:gap-3 dark:text-slate-500">
          {formattedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
          )}
          <span className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {item.slug}.md
          </span>
        </div>
      </div>

      {/* Arrow — hidden on mobile to save space */}
      <ArrowRight className="mt-1 hidden h-5 w-5 shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-sky-500 sm:block dark:text-slate-600 dark:group-hover:text-sky-400" />
    </Link>
  );
}
