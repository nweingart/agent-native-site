"use client";

import { useState, useEffect, useCallback } from "react";
import { AgentTimeline } from "agent-native";
import type { AgentStep } from "agent-native";

const initialSteps: AgentStep[] = [
  { id: "1", label: "Scanning repository", description: "Found 23 source files", status: "complete", startedAt: Date.now() - 8000, completedAt: Date.now() - 6000 },
  { id: "2", label: "Analyzing dependencies", description: "Resolved 128 packages", status: "complete", startedAt: Date.now() - 6000, completedAt: Date.now() - 3000 },
  { id: "3", label: "Applying changes", description: "12 files updated", status: "running", startedAt: Date.now() - 3000 },
  { id: "4", label: "Running verification", status: "pending" },
];

export function ConnectorFillDemo() {
  return (
    <AgentTimeline steps={initialSteps} showElapsedTime />
  );
}

export function ConnectorProgressDemo() {
  const [steps, setSteps] = useState<AgentStep[]>(() =>
    initialSteps.map((s) => ({ ...s, status: "pending" as const, startedAt: undefined, completedAt: undefined, description: s.description }))
  );

  const update = useCallback(
    (id: string, updates: Partial<AgentStep>) => {
      setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;
    const timeoutRef: { current?: ReturnType<typeof setTimeout> } = {};

    const delay = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        timeoutRef.current = setTimeout(() => {
          if (cancelled) reject(new Error("cancelled"));
          else resolve();
        }, ms);
      });

    const run = async () => {
      try {
        while (!cancelled) {
          // Reset
          setSteps(initialSteps.map((s) => ({ ...s, status: "pending" as const, startedAt: undefined, completedAt: undefined })));
          await delay(800);

          // Step 1
          update("1", { status: "running", startedAt: Date.now() });
          await delay(1000);
          update("1", { status: "complete", completedAt: Date.now() });
          await delay(300);

          // Step 2
          update("2", { status: "running", startedAt: Date.now() });
          await delay(1000);
          update("2", { status: "complete", completedAt: Date.now() });
          await delay(300);

          // Step 3
          update("3", { status: "running", startedAt: Date.now() });
          await delay(1200);
          update("3", { status: "complete", completedAt: Date.now() });
          await delay(300);

          // Step 4
          update("4", { status: "running", startedAt: Date.now() });
          await delay(1000);
          update("4", { status: "complete", completedAt: Date.now() });

          await delay(2000);
        }
      } catch {
        // cancelled
      }
    };

    run();

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [update]);

  return (
    <AgentTimeline steps={steps} showElapsedTime />
  );
}

export function ConnectorDisabledDemo() {
  return (
    <AgentTimeline steps={initialSteps} showConnectors={false} showElapsedTime />
  );
}
