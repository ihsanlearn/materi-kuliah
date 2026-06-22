import type { Metadata } from "next";
import { Library } from "lucide-react";
import { getAllCourses } from "@/lib/markdown";
import CourseCard from "@/components/CourseCard";

export const metadata: Metadata = {
  title: "Semua Materi",
  description: "Daftar semua mata kuliah dan materi yang tersedia.",
};

export default function MateriIndexPage() {
  const courses = getAllCourses();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 shadow-md shadow-sky-500/20">
            <Library className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Semua Mata Kuliah
          </h1>
        </div>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Pilih mata kuliah untuk melihat daftar materi yang tersedia.
        </p>
      </div>

      {/* Course grid */}
      {courses.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
          <Library className="mx-auto mb-4 h-12 w-12 text-slate-300 dark:text-slate-600" />
          <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
            Belum Ada Materi
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Tambahkan file markdown ke folder{" "}
            <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs dark:bg-slate-800">
              materi/
            </code>{" "}
            untuk memulai.
          </p>
        </div>
      )}
    </div>
  );
}
