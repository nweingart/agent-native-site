"use client";

import { Search } from "lucide-react";

export function SearchTrigger() {
  return (
    <button
      onClick={() =>
        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "k",
            metaKey: true,
            bubbles: true,
          })
        )
      }
      className="flex items-center gap-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-muted-foreground hover:bg-surface-2 transition-colors mb-4"
    >
      <Search className="h-3.5 w-3.5" />
      <span className="flex-1 text-left">Search docs...</span>
      <kbd className="hidden sm:inline text-[10px] font-mono border border-border rounded px-1 py-0.5">
        ⌘K
      </kbd>
    </button>
  );
}
