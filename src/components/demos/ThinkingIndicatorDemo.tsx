"use client";

import { useState } from "react";
import { ThinkingIndicator } from "agent-native";

export function ThinkingIndicatorBasicDemo() {
  const [isThinking, setIsThinking] = useState(true);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-surface-2 min-h-[48px] flex items-center">
        <ThinkingIndicator isThinking={isThinking} />
      </div>
      <button
        onClick={() => setIsThinking((v) => !v)}
        className="text-sm px-4 py-2 rounded-md bg-foreground text-background hover:bg-foreground/80 transition-colors"
      >
        {isThinking ? "Stop thinking" : "Start thinking"}
      </button>
    </div>
  );
}

export function ThinkingIndicatorVariantsDemo() {
  return (
    <div className="space-y-4">
      {(["shimmer", "dots", "pulse"] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="text-xs font-mono text-muted-foreground w-20">{variant}</span>
          <div className="p-3 rounded-lg bg-surface-2 flex-1">
            <ThinkingIndicator isThinking variant={variant} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ThinkingIndicatorLabelDemo() {
  return (
    <div className="space-y-3">
      <div className="p-3 rounded-lg bg-surface-2">
        <ThinkingIndicator isThinking label="Thinking..." />
      </div>
      <div className="p-3 rounded-lg bg-surface-2">
        <ThinkingIndicator isThinking label="Reasoning about your code" variant="dots" />
      </div>
      <div className="p-3 rounded-lg bg-surface-2">
        <ThinkingIndicator isThinking label="Planning next steps" variant="pulse" />
      </div>
    </div>
  );
}
