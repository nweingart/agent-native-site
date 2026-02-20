"use client";

import { useState } from "react";
import { TimelineSummary } from "agent-native";
import type { AgentStep } from "agent-native";

const mixedSteps: AgentStep[] = [
  { id: "1", label: "Step 1", status: "complete" },
  { id: "2", label: "Step 2", status: "complete" },
  { id: "3", label: "Step 3", status: "complete" },
  { id: "4", label: "Step 4", status: "running" },
  { id: "5", label: "Step 5", status: "error" },
  { id: "6", label: "Step 6", status: "pending" },
  { id: "7", label: "Step 7", status: "pending" },
];

export function SummaryMixedDemo() {
  return <TimelineSummary steps={mixedSteps} />;
}

const allCompleteSteps: AgentStep[] = [
  { id: "1", label: "Step 1", status: "complete" },
  { id: "2", label: "Step 2", status: "complete" },
  { id: "3", label: "Step 3", status: "complete" },
  { id: "4", label: "Step 4", status: "complete" },
  { id: "5", label: "Step 5", status: "complete" },
];

export function SummaryCompleteDemo() {
  return <TimelineSummary steps={allCompleteSteps} />;
}

export function SummaryInteractiveDemo() {
  const [steps, setSteps] = useState<AgentStep[]>([
    { id: "1", label: "Scan", status: "complete" },
    { id: "2", label: "Analyze", status: "complete" },
    { id: "3", label: "Build", status: "running" },
    { id: "4", label: "Test", status: "pending" },
    { id: "5", label: "Deploy", status: "pending" },
  ]);

  const advance = () => {
    setSteps((prev) => {
      const runningIdx = prev.findIndex((s) => s.status === "running");
      if (runningIdx === -1) return prev;
      return prev.map((s, i) => {
        if (i === runningIdx) return { ...s, status: "complete" as const };
        if (i === runningIdx + 1) return { ...s, status: "running" as const };
        return s;
      });
    });
  };

  const reset = () => {
    setSteps([
      { id: "1", label: "Scan", status: "complete" },
      { id: "2", label: "Analyze", status: "complete" },
      { id: "3", label: "Build", status: "running" },
      { id: "4", label: "Test", status: "pending" },
      { id: "5", label: "Deploy", status: "pending" },
    ]);
  };

  const allDone = steps.every((s) => s.status === "complete");

  return (
    <div>
      <TimelineSummary steps={steps} />
      <div className="mt-4 flex gap-3">
        <button
          onClick={advance}
          disabled={allDone}
          className="text-sm px-3 py-1.5 rounded-md bg-accent text-white hover:bg-accent/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Advance step
        </button>
        <button
          onClick={reset}
          className="text-sm px-3 py-1.5 rounded-md border border-border text-muted hover:text-foreground transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
