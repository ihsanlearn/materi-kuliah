import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FolderOpen } from "lucide-react";
import {
  getAllMateriPaths,
  getMateriList,
  getMateriContent,
  getAllCourses,
  formatCourseName,
} from "@/lib/markdown";
import MateriCard from "@/components/MateriCard";
import Breadcrumb from "@/components/Breadcrumb";
import MateriDetailView from "@/components/MateriDetailView";
import { extractHeadings } from "@/lib/headings";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const paths = getAllMateriPaths();
  return paths.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = slug[0];
  const materiSlug = slug[1];

  if (!materiSlug) {
    return {
      title: formatCourseName(course),
      description: `Daftar materi untuk mata kuliah ${formatCourseName(course)}.`,
    };
  }

  const materi = getMateriContent(course, materiSlug);
  if (!materi) return { title: "Not Found" };

  return {
    title: materi.meta.title,
    description: materi.meta.description,
  };
}

export default async function MateriPage({ params }: PageProps) {
  const { slug } = await params;
  const course = slug[0];
  const materiSlug = slug[1];

  // Verify course exists
  const courses = getAllCourses();
  const courseExists = courses.some((c) => c.slug === course);
  if (!courseExists) notFound();

  // If too many segments, 404
  if (slug.length > 2) notFound();

  // Case 1: Course detail page — list all materi in the course
  if (!materiSlug) {
    const materiList = getMateriList(course);

    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Materi", href: "/materi" },
              { label: formatCourseName(course) },
            ]}
          />
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 shadow-md shadow-sky-500/20">
              <FolderOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {formatCourseName(course)}
              </h1>
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400">
            {materiList.length} materi tersedia — diurutkan berdasarkan urutan modul.
          </p>
        </div>

        {/* Materi list */}
        {materiList.length > 0 ? (
          <div className="space-y-3">
            {materiList.map((item, index) => (
              <MateriCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
            <p className="text-slate-500 dark:text-slate-400">
              Belum ada materi di folder ini.
            </p>
          </div>
        )}
      </div>
    );
  }

  // Case 2: Individual materi detail page
  const materi = getMateriContent(course, materiSlug);
  if (!materi) notFound();

  const materiList = getMateriList(course);
  const headings = extractHeadings(materi.content);

  return (
    <MateriDetailView
      course={course}
      title={materi.meta.title}
      description={materi.meta.description}
      date={materi.meta.date}
      content={materi.content}
      materiList={materiList}
      headings={headings}
    />
  );
}
