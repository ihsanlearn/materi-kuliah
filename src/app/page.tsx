import Link from "next/link";
import { BookOpen, ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { getAllCourses } from "@/lib/markdown";

export default function HomePage() {
  const courses = getAllCourses();

  return (
    <div className="relative">
      {/* Hero section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl sm:h-96 sm:w-96 sm:-right-40 sm:-top-40 dark:bg-sky-500/5" />
          <div className="absolute -left-20 top-10 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl sm:h-80 sm:w-80 sm:-left-40 sm:top-20 dark:bg-blue-500/5" />
          <div className="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl sm:h-64 sm:w-64 dark:bg-cyan-500/5" />
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24 lg:px-8 lg:pt-32">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-300">
            <Sparkles className="h-3.5 w-3.5" />
            Open Source & Selalu Diperbarui
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:mb-6 sm:text-5xl lg:text-6xl dark:text-white">
            Materi Kuliah{" "}
            <span className="text-sky-600 dark:text-sky-400">
              Digital
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-600 sm:mb-10 sm:text-lg dark:text-slate-400">
            Akses materi kuliah kapan saja, di mana saja. Diorganisir per mata kuliah
            dengan pencarian cepat dan tampilan yang nyaman dibaca.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/materi"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-xl hover:shadow-sky-500/30 dark:shadow-sky-500/10 dark:hover:shadow-sky-500/20"
            >
              <BookOpen className="h-4 w-4" />
              Lihat Semua Materi
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      {courses.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50/50 py-10 sm:py-16 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Mata Kuliah Tersedia
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Pilih mata kuliah untuk mulai belajar
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/materi/${course.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-sky-800 dark:hover:shadow-sky-950/50"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-950/50">
                    <GraduationCap className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
                      {course.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {course.materiCount} materi
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
