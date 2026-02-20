import type { AgentStep, StepTier, ApprovalRequest, ToolCall, Artifact } from "agent-native";

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

export const toolCallSteps: AgentStep[] = [
  {
    id: "analyze",
    label: "Analyzing codebase",
    status: "complete",
    description: "Identified 3 files to modify",
    startedAt: now - 18000,
    completedAt: now - 12000,
    toolCalls: [
      {
        id: "tc-1",
        name: "read_file",
        input: { path: "src/utils/parser.ts" },
        output: "File contents (247 lines)",
        status: "complete",
        startedAt: now - 17000,
        completedAt: now - 15000,
      },
      {
        id: "tc-2",
        name: "search_files",
        input: { pattern: "parseConfig", directory: "src/" },
        output: "Found 4 matches across 3 files",
        status: "complete",
        startedAt: now - 15000,
        completedAt: now - 13000,
      },
    ],
    artifacts: [
      {
        id: "art-1",
        kind: "code",
        title: "parser.ts",
        content: "export function parseConfig(raw: string): Config {\n  return JSON.parse(raw);\n}",
        language: "typescript",
      },
    ],
  },
  {
    id: "modify",
    label: "Applying modifications",
    status: "running",
    description: "Editing source files...",
    startedAt: now - 12000,
    toolCalls: [
      {
        id: "tc-3",
        name: "read_file",
        input: { path: "src/config.ts" },
        output: "File contents (89 lines)",
        status: "complete",
        startedAt: now - 11000,
        completedAt: now - 10000,
      },
      {
        id: "tc-4",
        name: "edit_file",
        input: { path: "src/config.ts", changes: "Update parseConfig call" },
        status: "running",
        startedAt: now - 9000,
      },
      {
        id: "tc-5",
        name: "run_tests",
        input: { suite: "unit" },
        status: "pending",
      },
    ],
  },
  {
    id: "validate",
    label: "Running validation",
    status: "pending",
  },
];

export const artifactExamples: Artifact[] = [
  {
    id: "art-code",
    kind: "code",
    title: "utils.ts",
    content: "export const sum = (a: number, b: number) => a + b;",
    language: "typescript",
  },
  {
    id: "art-diff",
    kind: "diff",
    title: "config.ts",
    content: "- const port = 3000;\n+ const port = process.env.PORT || 3000;",
  },
  {
    id: "art-text",
    kind: "text",
    title: "Summary",
    content: "Refactored 3 functions to use async/await pattern.",
  },
  {
    id: "art-json",
    kind: "json",
    title: "package.json",
    content: '{\n  "name": "my-app",\n  "version": "2.0.0"\n}',
  },
];

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
