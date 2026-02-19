"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";

export function LiveDemo({
  children,
  code,
  title,
}: {
  children: React.ReactNode;
  code?: React.ReactNode;
  title?: string;
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="rounded-lg border border-border overflow-hidden my-6">
      {title && (
        <div className="px-4 py-2 border-b border-border bg-surface-2 text-sm font-medium text-muted">
          {title}
        </div>
      )}
      <div className="p-6 bg-surface">{children}</div>
      {code && (
        <>
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 w-full px-4 py-2.5 border-t border-border bg-surface-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ChevronDown
              className={clsx(
                "h-4 w-4 transition-transform",
                showCode && "rotate-180"
              )}
            />
            {showCode ? "Hide Code" : "View Code"}
          </button>
          {showCode && <div>{code}</div>}
        </>
      )}
    </div>
  );
}
