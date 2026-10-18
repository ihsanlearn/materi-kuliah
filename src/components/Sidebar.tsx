"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, ChevronDown, ChevronRight, X } from "lucide-react";
import type { MateriItem } from "@/lib/types";
import type { HeadingNode } from "@/lib/headings";
import { formatCourseName } from "@/lib/utils";

interface SidebarProps {
  course: string;
  materiList: MateriItem[];
  headings: HeadingNode[];
  isOpen: boolean;
  onClose: () => void;
}

function collectIds(nodes: HeadingNode[]): string[] {
  return nodes.flatMap((node) => [node.id, ...collectIds(node.children)]);
}

function findAncestors(nodes: HeadingNode[], targetId: string, parents: string[] = []): string[] | null {
  for (const node of nodes) {
    if (node.id === targetId) return parents;
    const found = findAncestors(node.children, targetId, [...parents, node.id]);
    if (found) return found;
  }
  return null;
}

export default function Sidebar({ course, materiList, headings, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);
  const headingRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const allHeadingIds = useMemo(() => collectIds(headings), [headings]);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(allHeadingIds));
  const [activeHeading, setActiveHeading] = useState("");

  useEffect(() => {
    setExpanded(new Set(allHeadingIds));
  }, [allHeadingIds]);

  const expandAncestors = useCallback((id: string) => {
    const ancestors = findAncestors(headings, id);
    if (!ancestors) return;
    setExpanded((current) => {
      const next = new Set(current);
      ancestors.forEach((ancestor) => next.add(ancestor));
      return next;
    });
  }, [headings]);

  const scrollToHeading = useCallback((id: string, updateHash = true) => {
    const target = document.getElementById(id);
    if (!target) return;

    setActiveHeading(id);
    expandAncestors(id);
    if (updateHash) window.history.pushState(null, "", `#${encodeURIComponent(id)}`);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    onClose();
  }, [expandAncestors, onClose]);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash && document.getElementById(hash)) {
      setActiveHeading(hash);
      expandAncestors(hash);
      document.getElementById(hash)?.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, [expandAncestors]);

  useEffect(() => {
    if (!allHeadingIds.length) return;
    const targets = allHeadingIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]?.target instanceof HTMLElement) {
        setActiveHeading(visible[0].target.id);
      }
    }, {
      rootMargin: "-80px 0px -65% 0px",
      threshold: 0,
    });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [allHeadingIds]);

  useEffect(() => {
    if (!activeHeading) return;
    expandAncestors(activeHeading);

    const activeLink = headingRefs.current[activeHeading];
    const sidebar = sidebarRef.current;
    if (!activeLink || !sidebar) return;

    const linkRect = activeLink.getBoundingClientRect();
    const sidebarRect = sidebar.getBoundingClientRect();
    if (linkRect.top < sidebarRect.top) {
      sidebar.scrollTo({ top: sidebar.scrollTop + linkRect.top - sidebarRect.top - 8, behavior: "smooth" });
    } else if (linkRect.bottom > sidebarRect.bottom) {
      sidebar.scrollTo({ top: sidebar.scrollTop + linkRect.bottom - sidebarRect.bottom + 8, behavior: "smooth" });
    }
  }, [activeHeading, expandAncestors]);

  const renderHeading = (node: HeadingNode): React.ReactNode => {
    const isExpanded = expanded.has(node.id);
    const isActive = activeHeading === node.id;
    const hasChildren = node.children.length > 0;

    return (
      <li key={node.id} className="min-w-0">
        <div className={`flex min-w-0 items-stretch rounded-md transition-colors ${isActive ? "bg-sky-50 dark:bg-sky-950/40" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}>
          <a
            ref={(element) => { headingRefs.current[node.id] = element; }}
            href={`#${node.id}`}
            onClick={(event) => {
              event.preventDefault();
              scrollToHeading(node.id);
            }}
            aria-current={isActive ? "location" : undefined}
            title={node.text}
            className={`min-w-0 flex-1 py-1.5 pl-2 pr-1 text-xs leading-snug transition-colors line-clamp-2 ${isActive ? "font-semibold text-sky-700 dark:text-sky-300" : "text-slate-600 dark:text-slate-400"}`}
          >
            {node.text}
          </a>
          {hasChildren && (
            <button
              type="button"
              aria-label={`${isExpanded ? "Ciutkan" : "Buka"} bagian ${node.text}`}
              aria-expanded={isExpanded}
              onClick={() => setExpanded((current) => {
                const next = new Set(current);
                if (next.has(node.id)) next.delete(node.id);
                else next.add(node.id);
                return next;
              })}
              className="flex w-7 shrink-0 items-center justify-center rounded-r-md text-slate-400 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-sky-500 dark:hover:text-slate-200"
            >
              {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            </button>
          )}
        </div>
        {hasChildren && isExpanded && (
          <ul className="ml-2 mt-0.5 space-y-0.5 border-l border-slate-200 pl-2 dark:border-slate-700">
            {node.children.map(renderHeading)}
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        ref={sidebarRef}
        className={`
          fixed left-0 top-0 z-50 h-full w-72 transform overflow-y-auto border-r border-slate-200 bg-white/95 pt-16 backdrop-blur-xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950/95
          lg:sticky lg:top-16 lg:z-0 lg:h-[calc(100vh-4rem)] lg:translate-x-0 lg:pt-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800 lg:hidden">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Navigasi</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup navigasi"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4">
          <Link
            href={`/materi/${course}`}
            className="mb-4 flex items-center gap-2 rounded-lg bg-sky-50 px-3 py-2.5 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-100 dark:bg-sky-950/50 dark:text-sky-300 dark:hover:bg-sky-950/70"
          >
            <ChevronRight className="h-3.5 w-3.5" />
            {formatCourseName(course)}
          </Link>

          <nav aria-label="Daftar materi" className="space-y-0.5">
            {materiList.map((item) => {
              const href = `/materi/${course}/${item.slug}`;
              const isActive = pathname === href;

              return (
                <div key={item.slug}>
                  <Link
                    href={href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={`group flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-all ${
                      isActive
                        ? "bg-sky-50 font-medium text-sky-700 shadow-sm dark:bg-sky-950/40 dark:text-sky-300"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
                    }`}
                  >
                    <FileText className={`mt-0.5 h-4 w-4 shrink-0 ${
                      isActive
                        ? "text-sky-500 dark:text-sky-400"
                        : "text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400"
                    }`} />
                    <span className="min-w-0 line-clamp-2 leading-snug">{item.meta.title}</span>
                  </Link>

                  {isActive && headings.length > 0 && (
                    <ul className="mt-1 space-y-0.5 border-l border-slate-200 pl-2 dark:border-slate-700">
                      {headings.map(renderHeading)}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
