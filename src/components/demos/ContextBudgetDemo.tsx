"use client";

import { useState } from "react";
import { ContextBudget } from "agent-native";
import type { ContextBudgetData } from "agent-native";

const sampleBudget: ContextBudgetData = {
  maxTokens: 200000,
  inputTokens: 52000,
  outputTokens: 31000,
  systemTokens: 12000,
  cacheReadTokens: 8000,
  cacheWriteTokens: 4000,
};

const highUsageBudget: ContextBudgetData = {
  maxTokens: 200000,
  inputTokens: 120000,
  outputTokens: 45000,
  systemTokens: 12000,
  cacheReadTokens: 8000,
  cacheWriteTokens: 4000,
};

const criticalBudget: ContextBudgetData = {
  maxTokens: 200000,
  inputTokens: 140000,
  outputTokens: 42000,
  systemTokens: 12000,
  cacheReadTokens: 4000,
  cacheWriteTokens: 2000,
};

export function ContextBudgetBasicDemo() {
  const [layout, setLayout] = useState<"bar" | "ring">("bar");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["bar", "ring"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLayout(l)}
            className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
              layout === l
                ? "border-foreground bg-foreground/10 text-foreground"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      <ContextBudget budget={sampleBudget} layout={layout} />
    </div>
  );
}

export function ContextBudgetWarningDemo() {
  return <ContextBudget budget={highUsageBudget} />;
}

export function ContextBudgetDangerDemo() {
  return <ContextBudget budget={criticalBudget} />;
}

export function ContextBudgetRingDemo() {
  return <ContextBudget budget={sampleBudget} layout="ring" />;
}
