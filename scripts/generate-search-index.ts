import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface SearchItem {
  title: string;
  path: string;
  course: string;
  excerpt: string;
}

function formatCourseName(slug: string): string {
  return slug
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function generateSearchIndex(): void {
  const materiDir = path.join(process.cwd(), "materi");
  const outputPath = path.join(process.cwd(), "public", "search-index.json");

  if (!fs.existsSync(materiDir)) {
    console.log("No materi/ directory found. Creating empty search index.");
    fs.writeFileSync(outputPath, "[]");
    return;
  }

  const items: SearchItem[] = [];
  const courses = fs
    .readdirSync(materiDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory());

  for (const course of courses) {
    const coursePath = path.join(materiDir, course.name);
    const files = fs.readdirSync(coursePath).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const filePath = path.join(coursePath, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      const plainText = content
        .replace(/```[\s\S]*?```/g, "")
        .replace(/#{1,6}\s/g, "")
        .replace(/[*_~`]/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/\|.*\|/g, "")
        .replace(/[-]+/g, "")
        .replace(/\n{2,}/g, " ")
        .trim();

      items.push({
        title: data.title || formatCourseName(file.replace(".md", "")),
        path: `/materi/${course.name}/${file.replace(".md", "")}`,
        course: formatCourseName(course.name),
        excerpt:
          plainText.slice(0, 150) + (plainText.length > 150 ? "..." : ""),
      });
    }
  }

  // Ensure public/ exists
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(items, null, 2));
  console.log(
    `✓ Search index generated: ${items.length} items → public/search-index.json`
  );
}

generateSearchIndex();
