"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, ArrowRight } from "lucide-react";
import Fuse from "fuse.js";

interface SearchEntry {
  title: string;
  description: string;
  headings: string[];
  href: string;
  section: string;
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const fuseRef = useRef<Fuse<SearchEntry> | null>(null);
  const indexRef = useRef<SearchEntry[] | null>(null);
  const router = useRouter();

  // Load search index on first open
  const ensureIndex = useCallback(async () => {
    if (indexRef.current) return;
    try {
      const res = await fetch("/search-index.json");
      const data: SearchEntry[] = await res.json();
      indexRef.current = data;
      fuseRef.current = new Fuse(data, {
        keys: [
          { name: "title", weight: 3 },
          { name: "headings", weight: 2 },
          { name: "description", weight: 1 },
        ],
        threshold: 0.35,
        includeScore: true,
      });
    } catch {
      // index not available yet
    }
  }, []);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      ensureIndex();
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
      setResults([]);
      setActiveIndex(0);
    }
  }, [open, ensureIndex]);

  // Search
  useEffect(() => {
    if (!query.trim()) {
      setResults(indexRef.current ?? []);
      setActiveIndex(0);
      return;
    }
    if (!fuseRef.current) return;
    const hits = fuseRef.current.search(query, { limit: 12 });
    setResults(hits.map((h) => h.item));
    setActiveIndex(0);
  }, [query]);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      e.preventDefault();
      navigate(results[activeIndex].href);
    }
  };

  if (!open) return null;

  // Group results by section
  const grouped = new Map<string, SearchEntry[]>();
  for (const r of results) {
    const list = grouped.get(r.section) ?? [];
    list.push(r);
    grouped.set(r.section, list);
  }

  let flatIndex = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg mx-4 rounded-xl border border-border bg-background shadow-2xl overflow-hidden">
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="h-4 w-4 text-muted shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search docs..."
            className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground font-mono">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {results.length === 0 && query.trim() && (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}
          {Array.from(grouped.entries()).map(([section, items]) => (
            <div key={section}>
              <div className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {section}
              </div>
              {items.map((item) => {
                const idx = flatIndex++;
                return (
                  <button
                    key={item.href}
                    onClick={() => navigate(item.href)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-left transition-colors ${
                      idx === activeIndex
                        ? "bg-surface-2 text-foreground"
                        : "text-muted hover:bg-surface"
                    }`}
                  >
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <span className="block truncate font-medium">
                        {item.title}
                      </span>
                      {item.description && (
                        <span className="block truncate text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
