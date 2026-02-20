"use client";

import { TimelineTier } from "agent-native";
import type { AgentStep, StepTier } from "agent-native";

const now = Date.now();

const ciSteps: AgentStep[] = [
  { id: "lint", label: "ESLint", status: "complete", description: "0 errors, 2 warnings", startedAt: now - 10000, completedAt: now - 7000 },
  { id: "typecheck", label: "TypeScript", status: "complete", description: "No type errors", startedAt: now - 10000, completedAt: now - 6500 },
  { id: "test", label: "Vitest", status: "running", description: "47/52 tests passing", startedAt: now - 10000 },
];

const ciTier: StepTier = {
  id: "ci",
  label: "CI Checks",
  stepIds: ["lint", "typecheck", "test"],
  startedAt: now - 10000,
};

export function StandaloneTierDemo() {
  return <TimelineTier tier={ciTier} steps={ciSteps} />;
}

const deploySteps: AgentStep[] = [
  { id: "us-east", label: "us-east-1", status: "complete", startedAt: now - 8000, completedAt: now - 5000 },
  { id: "eu-west", label: "eu-west-1", status: "running", startedAt: now - 8000 },
  { id: "ap-south", label: "ap-south-1", status: "running", startedAt: now - 8000 },
];

const deployTier: StepTier = {
  id: "regions",
  label: "Multi-Region Deploy",
  stepIds: ["us-east", "eu-west", "ap-south"],
  startedAt: now - 8000,
};

export function MultiRegionTierDemo() {
  return <TimelineTier tier={deployTier} steps={deploySteps} showElapsedTime />;
}

export function CustomHeaderTierDemo() {
  return (
    <TimelineTier
      tier={ciTier}
      steps={ciSteps}
      renderTierHeader={(tier) => (
        <div className="flex items-center gap-2 mb-2 px-1">
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-medium text-accent-foreground">
            {tier.label}
          </span>
          <span className="text-xs text-muted-foreground">
            — {tier.stepIds.length} tasks
          </span>
        </div>
      )}
    />
  );
}
