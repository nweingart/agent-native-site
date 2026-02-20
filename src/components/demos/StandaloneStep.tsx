"use client";

import { useState } from "react";
import { TimelineStep } from "agent-native";
import type { AgentStep } from "agent-native";

const steps: AgentStep[] = [
  {
    id: "pending",
    label: "Waiting to start",
    status: "pending",
  },
  {
    id: "running",
    label: "Processing data",
    status: "running",
    description: "Analyzing 847 files...",
    startedAt: Date.now() - 5000,
  },
  {
    id: "complete",
    label: "Scan complete",
    status: "complete",
    description: "Found 23 source files",
    startedAt: Date.now() - 12000,
    completedAt: Date.now() - 10000,
  },
  {
    id: "error",
    label: "Build failed",
    status: "error",
    error: "TypeScript compilation error in src/index.ts:42",
    startedAt: Date.now() - 8000,
    completedAt: Date.now() - 6000,
  },
];

export function StandaloneStepDemo() {
  return (
    <div className="space-y-2">
      {steps.map((step) => (
        <TimelineStep key={step.id} step={step} />
      ))}
    </div>
  );
}

export function ClickableStepDemo() {
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div>
      <div className="space-y-2">
        {steps.map((step) => (
          <TimelineStep
            key={step.id}
            step={step}
            isActive={clicked === step.id}
            onClick={(s) => setClicked(s.id)}
          />
        ))}
      </div>
      {clicked && (
        <p className="mt-3 text-sm text-muted">
          Clicked: <code className="text-accent-foreground">{clicked}</code>
        </p>
      )}
    </div>
  );
}

export function ElapsedStepDemo() {
  const step: AgentStep = {
    id: "elapsed",
    label: "Building search index",
    status: "running",
    description: "Processing records...",
    startedAt: Date.now() - 15000,
  };

  return <TimelineStep step={step} showElapsedTime />;
}

export function CustomRendererStepDemo() {
  const step: AgentStep = {
    id: "custom",
    label: "Deploying to production",
    status: "running",
    description: "us-east-1",
    startedAt: Date.now() - 3000,
  };

  return (
    <TimelineStep
      step={step}
      renderIndicator={(s) => (
        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs">
          {s.status === "running" ? "~" : s.status === "complete" ? "+" : "-"}
        </div>
      )}
      renderContent={(s) => (
        <div className="ml-3">
          <div className="font-semibold text-sm">{s.label}</div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Region: {s.description}
          </div>
        </div>
      )}
    />
  );
}
