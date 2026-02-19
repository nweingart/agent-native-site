"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import { clsx } from "clsx";

export function CopyButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={clsx(
        "inline-flex items-center justify-center rounded-md p-1.5 text-muted transition-colors hover:text-foreground hover:bg-surface-2",
        className
      )}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}
