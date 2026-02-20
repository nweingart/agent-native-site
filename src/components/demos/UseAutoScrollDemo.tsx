"use client";

import { useState, useCallback } from "react";
import { useAutoScroll } from "agent-native";

export function AutoScrollBasicDemo() {
  const [items, setItems] = useState<string[]>([
    "Step 1: Initialized",
    "Step 2: Scanning files",
    "Step 3: Analyzing dependencies",
  ]);
  const scrollRef = useAutoScroll<HTMLDivElement>(items.length);

  const addItem = useCallback(() => {
    setItems((prev) => [
      ...prev,
      `Step ${prev.length + 1}: ${
        [
          "Processing records",
          "Building index",
          "Running tests",
          "Generating report",
          "Compiling output",
          "Validating schema",
          "Optimizing bundle",
          "Deploying to staging",
        ][prev.length % 8]
      }`,
    ]);
  }, []);

  const addBatch = useCallback(() => {
    setItems((prev) => {
      const batch = Array.from({ length: 5 }, (_, i) => {
        const idx = prev.length + i;
        return `Step ${idx + 1}: Task ${idx + 1}`;
      });
      return [...prev, ...batch];
    });
  }, []);

  return (
    <div className="space-y-3">
      <div
        ref={scrollRef}
        className="h-48 overflow-y-auto rounded-lg border border-border bg-surface-2 p-3 space-y-1.5"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="text-sm text-muted font-mono py-1 px-2 rounded bg-surface"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button
          onClick={addItem}
          className="text-sm px-4 py-2 rounded-md bg-foreground text-background hover:bg-foreground/80 transition-colors"
        >
          Add item
        </button>
        <button
          onClick={addBatch}
          className="text-sm px-4 py-2 rounded-md border border-border text-muted hover:text-foreground transition-colors"
        >
          Add 5 items
        </button>
      </div>
      <p className="text-xs text-muted-foreground">
        Scroll up to disengage auto-scroll. Scroll back to the bottom to re-engage.
      </p>
    </div>
  );
}
