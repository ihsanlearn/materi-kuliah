import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  MateriMeta,
  MateriItem,
  MateriContent,
  CourseInfo,
  SearchItem,
} from "./types";

const MATERI_DIR = path.join(process.cwd(), "materi");

/**
 * Convert a folder/file slug to a human-readable display name.
 * e.g., "jaringan-komputer" → "Jaringan Komputer"
 */
export function formatCourseName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * List all course folders inside the `materi/` directory.
 */
export function getAllCourses(): CourseInfo[] {
  if (!fs.existsSync(MATERI_DIR)) return [];

  const entries = fs.readdirSync(MATERI_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const coursePath = path.join(MATERI_DIR, entry.name);
      const mdFiles = fs
        .readdirSync(coursePath)
        .filter((f) => f.endsWith(".md"));

      // Try to get a description from the first file's frontmatter
      let description: string | undefined;
      if (mdFiles.length > 0) {
        const firstFile = fs.readFileSync(
          path.join(coursePath, mdFiles[0]),
          "utf-8"
        );
        const { data } = matter(firstFile);
        description = data.description;
      }

      return {
        name: formatCourseName(entry.name),
        slug: entry.name,
        materiCount: mdFiles.length,
        description,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * List all markdown files in a course folder, with parsed frontmatter.
 * Sorted by `order` field, then by filename.
 */
export function getMateriList(course: string): MateriItem[] {
  const coursePath = path.join(MATERI_DIR, course);

  if (!fs.existsSync(coursePath)) return [];

  const files = fs.readdirSync(coursePath).filter((f) => f.endsWith(".md"));

  const items: MateriItem[] = files.map((file) => {
    const filePath = path.join(coursePath, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    const meta: MateriMeta = {
      title: data.title || formatCourseName(file.replace(".md", "")),
      description: data.description || "",
      order: data.order ?? 999,
      date: data.date ? String(data.date) : "",
    };

    return {
      meta,
      slug: file.replace(".md", ""),
      course,
    };
  });

  return items.sort((a, b) => {
    if (a.meta.order !== b.meta.order) return a.meta.order - b.meta.order;
    return a.slug.localeCompare(b.slug);
  });
}

/**
 * Read a single markdown file and return its content + frontmatter.
 */
export function getMateriContent(
  course: string,
  slug: string
): MateriContent | null {
  const filePath = path.join(MATERI_DIR, course, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const meta: MateriMeta = {
    title: data.title || formatCourseName(slug),
    description: data.description || "",
    order: data.order ?? 999,
    date: data.date ? String(data.date) : "",
  };

  return {
    meta,
    slug,
    course,
    content,
  };
}

/**
 * Recursively scan all markdown files to generate static params for routing.
 * Returns an array of slug arrays, e.g.:
 *   [["jaringan-komputer"], ["jaringan-komputer", "materi1"], ...]
 */
export function getAllMateriPaths(): string[][] {
  if (!fs.existsSync(MATERI_DIR)) return [];

  const paths: string[][] = [];
  const courses = fs
    .readdirSync(MATERI_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory());

  for (const course of courses) {
    // Add course-level path
    paths.push([course.name]);

    // Add individual materi paths
    const coursePath = path.join(MATERI_DIR, course.name);
    const files = fs.readdirSync(coursePath).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      paths.push([course.name, file.replace(".md", "")]);
    }
  }

  return paths;
}

/**
 * Build a search index for client-side fuzzy search.
 * Extracts title, path, course, and first ~150 chars as excerpt.
 */
export function getSearchIndex(): SearchItem[] {
  if (!fs.existsSync(MATERI_DIR)) return [];

  const items: SearchItem[] = [];
  const courses = fs
    .readdirSync(MATERI_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory());

  for (const course of courses) {
    const coursePath = path.join(MATERI_DIR, course.name);
    const files = fs.readdirSync(coursePath).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const filePath = path.join(coursePath, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      // Strip markdown syntax for a clean excerpt
      const plainText = content
        .replace(/```[\s\S]*?```/g, "") // Remove code blocks
        .replace(/#{1,6}\s/g, "") // Remove headings
        .replace(/[*_~`]/g, "") // Remove formatting
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Links to text
        .replace(/\|.*\|/g, "") // Remove tables
        .replace(/[-]+/g, "") // Remove hr
        .replace(/\n{2,}/g, " ") // Collapse newlines
        .trim();

      items.push({
        title: data.title || formatCourseName(file.replace(".md", "")),
        path: `/materi/${course.name}/${file.replace(".md", "")}`,
        course: formatCourseName(course.name),
        excerpt: plainText.slice(0, 150) + (plainText.length > 150 ? "..." : ""),
      });
    }
  }

  return items;
}
