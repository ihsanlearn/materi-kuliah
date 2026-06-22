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
