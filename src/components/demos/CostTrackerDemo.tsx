"use client";

import { useState } from "react";
import { CostTracker } from "agent-native";
import type { CostEntry } from "agent-native";

const sampleEntries: CostEntry[] = [
  { id: "1", model: "claude-sonnet-4", cost: 0.0032, inputTokens: 1200, outputTokens: 450, timestamp: Date.now() - 120000, label: "Plan implementation" },
  { id: "2", model: "claude-sonnet-4", cost: 0.0058, inputTokens: 2100, outputTokens: 820, timestamp: Date.now() - 90000, label: "Edit auth.ts" },
  { id: "3", model: "claude-haiku-4", cost: 0.0004, inputTokens: 800, outputTokens: 150, timestamp: Date.now() - 60000, label: "Run lint" },
  { id: "4", model: "claude-sonnet-4", cost: 0.0045, inputTokens: 1800, outputTokens: 600, timestamp: Date.now() - 30000, label: "Write tests" },
  { id: "5", model: "claude-haiku-4", cost: 0.0003, inputTokens: 500, outputTokens: 100, timestamp: Date.now() - 10000, label: "Format check" },
  { id: "6", model: "claude-opus-4", cost: 0.0210, inputTokens: 3500, outputTokens: 1200, timestamp: Date.now(), label: "Code review" },
];

export function CostTrackerBasicDemo() {
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <CostTracker
        entries={sampleEntries}
        onEntryClick={(entry) => setClicked(entry.label ?? entry.id)}
        maxHeight={300}
      />
      {clicked && (
        <p className="text-sm text-muted">
          Clicked: <strong>{clicked}</strong>
        </p>
      )}
    </div>
  );
}

export function CostTrackerUngroupedDemo() {
  return <CostTracker entries={sampleEntries} groupBy="none" />;
}

export function CostTrackerSummaryOnlyDemo() {
  return <CostTracker entries={sampleEntries} showTable={false} />;
}
