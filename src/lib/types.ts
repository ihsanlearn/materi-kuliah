export interface MateriMeta {
  title: string;
  description: string;
  order: number;
  date: string;
}

export interface MateriItem {
  meta: MateriMeta;
  slug: string;
  course: string;
}

export interface MateriContent extends MateriItem {
  content: string;
}

export interface CourseInfo {
  name: string;
  slug: string;
  materiCount: number;
  description?: string;
}

export interface SearchItem {
  title: string;
  path: string;
  course: string;
  excerpt: string;
}
