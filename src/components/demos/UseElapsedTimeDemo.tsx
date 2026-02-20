"use client";

import { useState } from "react";
import { useElapsedTime } from "agent-native";

export function ElapsedTimeBasicDemo() {
  const [startedAt, setStartedAt] = useState<number | undefined>(undefined);
  const [completedAt, setCompletedAt] = useState<number | undefined>(undefined);
  const elapsed = useElapsedTime(startedAt, completedAt);

  const isRunning = startedAt !== undefined && completedAt === undefined;
  const isStopped = completedAt !== undefined;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-4xl font-mono font-bold tabular-nums text-foreground">
          {elapsed}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {!startedAt ? "Not started" : isStopped ? "Stopped" : "Running..."}
        </div>
      </div>
      <div className="flex justify-center gap-3">
        {!isRunning && !isStopped && (
          <button
            onClick={() => setStartedAt(Date.now())}
            className="text-sm px-4 py-2 rounded-md bg-foreground text-background hover:bg-foreground/80 transition-colors"
          >
            Start
          </button>
        )}
        {isRunning && (
          <button
            onClick={() => setCompletedAt(Date.now())}
            className="text-sm px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-500/80 transition-colors"
          >
            Stop
          </button>
        )}
        {(isRunning || isStopped) && (
          <button
            onClick={() => {
              setStartedAt(undefined);
              setCompletedAt(undefined);
            }}
            className="text-sm px-4 py-2 rounded-md border border-border text-muted hover:text-foreground transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export function ElapsedTimeMultipleDemo() {
  const now = Date.now();
  const elapsed1 = useElapsedTime(now - 5000, now - 2000);
  const elapsed2 = useElapsedTime(now - 45000, now - 3000);
  const elapsed3 = useElapsedTime(now - 120000);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-3 rounded-lg bg-surface-2">
        <span className="text-sm text-muted">Quick task (completed)</span>
        <span className="font-mono text-sm text-green-400">{elapsed1}</span>
      </div>
      <div className="flex items-center justify-between p-3 rounded-lg bg-surface-2">
        <span className="text-sm text-muted">Medium task (completed)</span>
        <span className="font-mono text-sm text-green-400">{elapsed2}</span>
      </div>
      <div className="flex items-center justify-between p-3 rounded-lg bg-surface-2">
        <span className="text-sm text-muted">Long task (still running)</span>
        <span className="font-mono text-sm text-blue-400">{elapsed3}</span>
      </div>
    </div>
  );
}
