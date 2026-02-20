"use client";

import { useReducedMotion } from "agent-native";

export function ReducedMotionDemo() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-2">
        <div
          className={`h-10 w-10 rounded-full ${
            prefersReduced ? "bg-yellow-500" : "bg-zinc-400"
          } flex items-center justify-center`}
        >
          {prefersReduced ? (
            <span className="text-lg">⏸</span>
          ) : (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
        </div>
        <div>
          <div className="font-medium text-sm">
            prefers-reduced-motion:{" "}
            <span className={prefersReduced ? "text-yellow-400" : "text-green-400"}>
              {prefersReduced ? "reduce" : "no-preference"}
            </span>
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {prefersReduced
              ? "Animations are disabled. Using subtle alternatives."
              : "Animations are enabled. Full motion effects active."}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-surface-2 text-center">
          <div className="text-xs text-muted-foreground mb-2">With motion</div>
          <div className="h-8 w-8 mx-auto rounded-full bg-blue-500 border-2 border-blue-300 border-t-transparent animate-spin" />
        </div>
        <div className="p-4 rounded-lg bg-surface-2 text-center">
          <div className="text-xs text-muted-foreground mb-2">Reduced motion</div>
          <div className="h-8 w-8 mx-auto rounded-full bg-blue-500 animate-pulse" />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Toggle &ldquo;Reduce motion&rdquo; in your OS accessibility settings to see this update in real time.
      </p>
    </div>
  );
}
