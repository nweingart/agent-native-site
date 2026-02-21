"use client";

import { AgentTimeline } from "agent-native";
import { basicSteps } from "./demo-data";

export function TimelineTailwind() {
  return (
    <AgentTimeline
      steps={basicSteps}
      classNames={{
        root: "rounded-xl border border-zinc-700 bg-zinc-900 p-4",
        step: "rounded-lg px-3 py-2 hover:bg-zinc-800/50 transition-colors",
        indicator: "ring-2 ring-zinc-600",
        stepBody: "ml-3",
      }}
    />
  );
}
