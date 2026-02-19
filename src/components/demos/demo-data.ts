import type { AgentStep, StepTier, ApprovalRequest } from "agent-native";

const now = Date.now();

export const basicSteps: AgentStep[] = [
  {
    id: "scan",
    label: "Scanning repository",
    status: "complete",
    description: "Found 847 files across 42 directories",
    startedAt: now - 12000,
    completedAt: now - 10000,
  },
  {
    id: "analyze",
    label: "Analyzing dependencies",
    status: "complete",
    description: "Resolved 128 packages",
    startedAt: now - 10000,
    completedAt: now - 7000,
  },
  {
    id: "generate",
    label: "Generating migration plan",
    status: "complete",
    description: "12 files need updates",
    startedAt: now - 7000,
    completedAt: now - 4000,
  },
  {
    id: "apply",
    label: "Applying changes",
    status: "running",
    description: "Updating import paths...",
    startedAt: now - 4000,
  },
  {
    id: "verify",
    label: "Running verification",
    status: "pending",
  },
];

export const tierSteps: AgentStep[] = [
  {
    id: "install",
    label: "Installing dependencies",
    status: "complete",
    startedAt: now - 15000,
    completedAt: now - 12000,
  },
  {
    id: "lint",
    label: "ESLint",
    status: "complete",
    description: "0 errors, 2 warnings",
    startedAt: now - 12000,
    completedAt: now - 9000,
  },
  {
    id: "typecheck",
    label: "TypeScript",
    status: "complete",
    description: "No type errors",
    startedAt: now - 12000,
    completedAt: now - 8500,
  },
  {
    id: "test",
    label: "Vitest",
    status: "running",
    description: "47/52 tests passing",
    startedAt: now - 12000,
  },
  {
    id: "build",
    label: "Building for production",
    status: "pending",
  },
  {
    id: "deploy",
    label: "Deploying to staging",
    status: "pending",
  },
];

export const tierGroups: StepTier[] = [
  {
    id: "checks",
    label: "Quality Checks",
    stepIds: ["lint", "typecheck", "test"],
    startedAt: now - 12000,
  },
];

export const approvalSteps: AgentStep[] = [
  {
    id: "plan",
    label: "Generating refactor plan",
    status: "complete",
    description: "Identified 8 components to update",
    startedAt: now - 8000,
    completedAt: now - 5000,
  },
  {
    id: "preview",
    label: "Preparing preview",
    status: "complete",
    description: "3 files modified, 247 lines changed",
    startedAt: now - 5000,
    completedAt: now - 3000,
  },
  {
    id: "execute",
    label: "Executing refactor",
    status: "pending",
  },
];

export const approvalRequest: ApprovalRequest = {
  id: "gate-1",
  stepId: "preview",
  title: "Apply refactoring changes?",
  description:
    "This will modify 3 files across the components directory. The changes include renaming props and updating type signatures.",
  createdAt: now - 3000,
};

export const elapsedSteps: AgentStep[] = [
  {
    id: "fetch",
    label: "Fetching remote data",
    status: "complete",
    startedAt: now - 25000,
    completedAt: now - 20000,
  },
  {
    id: "process",
    label: "Processing 2,847 records",
    status: "complete",
    startedAt: now - 20000,
    completedAt: now - 8000,
  },
  {
    id: "index",
    label: "Building search index",
    status: "running",
    startedAt: now - 8000,
  },
  {
    id: "cache",
    label: "Warming cache",
    status: "pending",
  },
];
