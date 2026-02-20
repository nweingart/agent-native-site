"use client";

import { useState } from "react";
import { useVisualMemory } from "agent-native";
import type { StepStatus } from "agent-native";

const statuses: StepStatus[] = ["pending", "running", "complete", "error"];
const statusColors: Record<string, string> = {
  pending: "bg-zinc-500",
  running: "bg-blue-500",
  complete: "bg-green-500",
  error: "bg-red-500",
};

export function VisualMemoryBasicDemo() {
  const [status, setStatus] = useState<StepStatus>("pending");
  const memory = useVisualMemory(status);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-surface-2">
          <div className="text-xs text-muted-foreground mb-1">Current</div>
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${statusColors[memory.current] ?? "bg-zinc-500"}`} />
            <span className="font-mono text-sm">{memory.current}</span>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-surface-2">
          <div className="text-xs text-muted-foreground mb-1">Previous</div>
          <div className="flex items-center gap-2">
            {memory.previous ? (
              <>
                <div className={`h-3 w-3 rounded-full ${statusColors[memory.previous] ?? "bg-zinc-500"}`} />
                <span className="font-mono text-sm">{memory.previous}</span>
              </>
            ) : (
              <span className="font-mono text-sm text-muted-foreground">null</span>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="text-xs text-muted-foreground mb-2">Transition Progress</div>
        <div className="h-3 rounded-full bg-surface-3 overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-75"
            style={{ width: `${memory.progress * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs font-mono text-muted-foreground">0</span>
          <span className="text-xs font-mono text-muted">{memory.progress.toFixed(2)}</span>
          <span className="text-xs font-mono text-muted-foreground">1</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">isTransitioning:</span>
        <span className={`text-xs font-mono ${memory.isTransitioning ? "text-accent" : "text-muted-foreground"}`}>
          {String(memory.isTransitioning)}
        </span>
      </div>

      <div className="flex gap-2 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
              status === s
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export function VisualMemoryEasingDemo() {
  const [value, setValue] = useState(0);
  const linear = useVisualMemory(value, { easing: "linear", duration: 1000 });
  const easeOut = useVisualMemory(value, { easing: "ease-out", duration: 1000 });
  const spring = useVisualMemory(value, { easing: "spring", duration: 1000 });

  return (
    <div className="space-y-4">
      {[
        { label: "linear", state: linear },
        { label: "ease-out", state: easeOut },
        { label: "spring", state: spring },
      ].map(({ label, state }) => (
        <div key={label}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono text-muted-foreground">{label}</span>
            <span className="text-xs font-mono text-muted">{state.progress.toFixed(2)}</span>
          </div>
          <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-none"
              style={{ width: `${state.progress * 100}%` }}
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => setValue((v) => v + 1)}
        className="text-sm px-4 py-2 rounded-md bg-accent text-white hover:bg-accent/80 transition-colors"
      >
        Trigger transition
      </button>
    </div>
  );
}
