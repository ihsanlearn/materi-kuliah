"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import type Fuse from "fuse.js";
import type { SearchItem } from "@/lib/types";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchIndex, setSearchIndex] = useState<SearchItem[]>([]);
  const [fuseInstance, setFuseInstance] = useState<Fuse<SearchItem> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load search index and Fuse.js
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/search-index.json");
        const data: SearchItem[] = await res.json();
        setSearchIndex(data);

        const Fuse = (await import("fuse.js")).default;
        const fuse = new Fuse(data, {
          keys: ["title", "excerpt", "course"],
          threshold: 0.4,
          includeScore: true,
        });
        setFuseInstance(fuse);
      } catch {
        // Search index may not exist in dev mode before first build
        console.warn("Search index not found. Run build to generate it.");
      }
    }
    load();
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch(value: string) {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    if (fuseInstance) {
      const searchResults = fuseInstance.search(value).slice(0, 8);
      setResults(searchResults.map((r) => r.item));
    } else {
      // Fallback: simple filter
      const filtered = searchIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered.slice(0, 8));
    }
    setIsOpen(true);
  }

  return (
    <div ref={containerRef} className="relative w-full md:w-72 lg:w-80">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Cari materi..."
          className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder-slate-500 dark:focus:border-sky-500 dark:focus:bg-slate-800"
        />
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900/50">
          {results.map((item, i) => (
            <Link
              key={i}
              href={item.path}
              onClick={() => {
                setIsOpen(false);
                setQuery("");
              }}
              className="block border-b border-slate-100 px-4 py-3 transition-colors last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
            >
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {item.title}
              </p>
              <p className="mt-0.5 text-xs text-sky-600 dark:text-sky-400">
                {item.course}
              </p>
              <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                {item.excerpt}
              </p>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-slate-200 bg-white p-4 text-center text-sm text-slate-500 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          Tidak ada hasil untuk &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}

