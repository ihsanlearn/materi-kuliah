# 📚 Materi Kuliah

Website dokumentasi materi kuliah — dibangun dengan **Next.js 15**, **TypeScript**, dan **Tailwind CSS**.

Semua konten berupa file Markdown yang disimpan di repo. Cukup tambahkan file `.md` baru, commit, dan deploy — route otomatis terbuat.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Generate search index (opsional untuk dev)
npm run generate-search

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## 📝 Cara Menambah Materi Baru

### 1. Tambah materi ke course yang sudah ada

Buat file `.md` baru di folder course yang sesuai:

```
materi/
  jaringan-komputer/
    materi-baru.md    ← tambahkan di sini
```

### 2. Tambah mata kuliah baru

Buat folder baru di dalam `materi/`:

```
materi/
  sistem-operasi/     ← folder baru
    materi1.md
```

### 3. Format frontmatter

Setiap file markdown **harus** memiliki frontmatter YAML di bagian atas:

```yaml
---
title: "Judul Materi"
description: "Deskripsi singkat materi"
order: 1
date: 2026-06-22
---

# Konten Markdown

Tulis konten di sini...
```

| Field | Wajib | Keterangan |
|-------|-------|------------|
| `title` | ✅ | Judul yang ditampilkan di navigasi dan halaman |
| `description` | ❌ | Deskripsi singkat, tampil di daftar materi |
| `order` | ❌ | Urutan tampil (ascending). Default: 999 |
| `date` | ❌ | Tanggal materi (format: YYYY-MM-DD) |

### 4. Deploy

Setelah commit & push, materi baru otomatis tersedia di route:

```
domain.com/materi/[nama-folder]/[nama-file-tanpa-.md]
```

Contoh: `materi/jaringan-komputer/materi1.md` → `domain.com/materi/jaringan-komputer/materi1`

## 🏗️ Struktur Project

```
/materi                          ← Konten markdown
  /jaringan-komputer
    materi1.md
    materi2.md
  /ai
    materi1.md

/src
  /app
    page.tsx                     ← Homepage
    /materi
      page.tsx                   ← Daftar semua mata kuliah
      /[...slug]
        page.tsx                 ← Render materi / daftar materi per course
  /components
    Navbar.tsx                   ← Navigasi atas + search
    Sidebar.tsx                  ← Sidebar navigasi materi
    Breadcrumb.tsx               ← Breadcrumb navigasi
    SearchBar.tsx                ← Pencarian client-side (Fuse.js)
    CourseCard.tsx                ← Card mata kuliah
    MateriCard.tsx               ← Card materi
    MarkdownRenderer.tsx         ← Render markdown → HTML
    ThemeProvider.tsx             ← Dark mode provider
    MateriDetailView.tsx         ← Wrapper halaman detail materi
  /lib
    markdown.ts                  ← Helper baca & parse file markdown
    types.ts                     ← TypeScript interfaces
    utils.ts                     ← Utility functions

/scripts
  generate-search-index.ts       ← Generate search index saat build
```

## 🛠️ Tech Stack

- **Next.js 15** — App Router, Static Site Generation
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Styling + Typography plugin
- **react-markdown** — Render markdown
- **remark-gfm** — GitHub Flavored Markdown (tabel, dll)
- **rehype-highlight** — Syntax highlighting code block
- **gray-matter** — Parse frontmatter YAML
- **Fuse.js** — Fuzzy search client-side
- **Lucide React** — Icons

## 📦 Build & Deploy

```bash
# Build production
npm run build

# Jalankan production server
npm start
```

Deploy ke **Vercel** dengan push ke repository — otomatis build & deploy.
