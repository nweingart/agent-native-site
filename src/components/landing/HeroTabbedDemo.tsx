"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AgentTimeline } from "agent-native";
import type { AgentStep, StepTier, ApprovalRequest } from "agent-native";
import { clsx } from "clsx";

// ---------------------------------------------------------------------------
// Tab definitions
// ---------------------------------------------------------------------------

type TabId = "basic" | "tiers" | "approval";

const TABS: { id: TabId; label: string }[] = [
  { id: "basic", label: "Basic" },
  { id: "tiers", label: "Parallel Tiers" },
  { id: "approval", label: "Approval Gate" },
];

// ---------------------------------------------------------------------------
// Per-tab initial data
// ---------------------------------------------------------------------------

const BASIC_STEPS: AgentStep[] = [
  { id: "scan", label: "Scanning repository", status: "pending" },
  { id: "analyze", label: "Analyzing 847 files", status: "pending" },
  { id: "apply", label: "Applying changes", status: "pending" },
];

const TIER_STEPS: AgentStep[] = [
  { id: "install", label: "Installing dependencies", status: "pending" },
  { id: "lint", label: "ESLint", status: "pending" },
  { id: "typecheck", label: "TypeScript", status: "pending" },
  { id: "test", label: "Running tests", status: "pending" },
  { id: "deploy", label: "Deploying to staging", status: "pending" },
];

const TIER_GROUPS: StepTier[] = [
  { id: "checks", label: "Quality Checks", stepIds: ["lint", "typecheck", "test"] },
];

const APPROVAL_STEPS: AgentStep[] = [
  { id: "plan", label: "Generating refactor plan", status: "pending" },
  { id: "preview", label: "Preparing preview", status: "pending" },
  { id: "execute", label: "Executing refactor", status: "pending" },
];

// ---------------------------------------------------------------------------
// Animation loops
// ---------------------------------------------------------------------------

type UpdateFn = (id: string, updates: Partial<AgentStep>) => void;
type DelayFn = (ms: number) => Promise<void>;

async function runBasicLoop(
  setSteps: React.Dispatch<React.SetStateAction<AgentStep[]>>,
  update: UpdateFn,
  delay: DelayFn,
) {
  // Reset
  setSteps(BASIC_STEPS.map((s) => ({ ...s })));
  await delay(600);

  // Scan
  update("scan", { status: "running", startedAt: Date.now() });
  await delay(900);
  update("scan", { status: "complete", completedAt: Date.now(), description: "Found 23 source files" });
  await delay(300);

  // Analyze
  update("analyze", { status: "running", startedAt: Date.now() });
  await delay(1000);
  update("analyze", { status: "complete", completedAt: Date.now(), description: "Resolved 128 packages" });
  await delay(300);

  // Apply
  update("apply", { status: "running", startedAt: Date.now() });
  await delay(1100);
  update("apply", { status: "complete", completedAt: Date.now(), description: "12 files updated" });

  await delay(2500);
}

async function runTierLoop(
  setSteps: React.Dispatch<React.SetStateAction<AgentStep[]>>,
  update: UpdateFn,
  delay: DelayFn,
) {
  // Reset
  setSteps(TIER_STEPS.map((s) => ({ ...s })));
  await delay(600);

  // Install (sequential)
  update("install", { status: "running", startedAt: Date.now() });
  await delay(900);
  update("install", { status: "complete", completedAt: Date.now(), description: "47 packages" });
  await delay(300);

  // Parallel tier — start all 3 at once
  const tierStart = Date.now();
  update("lint", { status: "running", startedAt: tierStart });
  update("typecheck", { status: "running", startedAt: tierStart });
  update("test", { status: "running", startedAt: tierStart });
  await delay(800);

  // Staggered completion
  update("lint", { status: "complete", completedAt: Date.now(), description: "0 errors" });
  await delay(400);
  update("typecheck", { status: "complete", completedAt: Date.now(), description: "No type errors" });
  await delay(500);
  update("test", { status: "complete", completedAt: Date.now(), description: "52/52 passing" });
  await delay(300);

  // Deploy (sequential)
  update("deploy", { status: "running", startedAt: Date.now() });
  await delay(1000);
  update("deploy", { status: "complete", completedAt: Date.now(), description: "Live at staging.example.com" });

  await delay(2500);
}

async function runApprovalLoop(
  setSteps: React.Dispatch<React.SetStateAction<AgentStep[]>>,
  setApproval: React.Dispatch<React.SetStateAction<ApprovalRequest | undefined>>,
  update: UpdateFn,
  delay: DelayFn,
) {
  // Reset
  setSteps(APPROVAL_STEPS.map((s) => ({ ...s })));
  setApproval(undefined);
  await delay(600);

  // Plan
  update("plan", { status: "running", startedAt: Date.now() });
  await delay(900);
  update("plan", { status: "complete", completedAt: Date.now(), description: "8 components identified" });
  await delay(300);

  // Preview
  update("preview", { status: "running", startedAt: Date.now() });
  await delay(1000);
  update("preview", { status: "complete", completedAt: Date.now(), description: "3 files, 247 lines changed" });
  await delay(300);

  // Show approval gate (stepId points to the last completed step — gate renders after it)
  setApproval({
    id: "gate-1",
    stepId: "preview",
    title: "Apply refactoring changes?",
    description: "All checks passed. Ready to apply.",
    createdAt: Date.now(),
  });
  await delay(2000);

  // Auto-approve
  setApproval(undefined);
  update("execute", { status: "running", startedAt: Date.now() });
  await delay(1000);
  update("execute", { status: "complete", completedAt: Date.now(), description: "8 components updated" });

  await delay(2500);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function HeroTabbedDemo() {
  const [activeTab, setActiveTab] = useState<TabId>("basic");
  const [steps, setSteps] = useState<AgentStep[]>(BASIC_STEPS);
  const [approval, setApproval] = useState<ApprovalRequest | undefined>();
  const cancelRef = useRef<(() => void) | undefined>(undefined);

  const updateStep = useCallback(
    (id: string, updates: Partial<AgentStep>) => {
      setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    },
    [],
  );

  // Start / restart animation whenever tab changes
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

    cancelRef.current = () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const run = async () => {
      try {
        while (!cancelled) {
          if (activeTab === "basic") {
            await runBasicLoop(setSteps, updateStep, delay);
          } else if (activeTab === "tiers") {
            await runTierLoop(setSteps, updateStep, delay);
          } else {
            await runApprovalLoop(setSteps, setApproval, updateStep, delay);
          }
        }
      } catch {
        // cancelled — expected when tab switches
      }
    };

    // Set initial state immediately before animation starts
    if (activeTab === "basic") setSteps(BASIC_STEPS.map((s) => ({ ...s })));
    else if (activeTab === "tiers") setSteps(TIER_STEPS.map((s) => ({ ...s })));
    else setSteps(APPROVAL_STEPS.map((s) => ({ ...s })));
    setApproval(undefined);

    run();

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeTab, updateStep]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-1 mb-4 justify-center">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              activeTab === tab.id
                ? "bg-surface-2 text-foreground"
                : "text-muted hover:text-foreground hover:bg-surface",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Demo container */}
      <div className="rounded-xl border border-border bg-surface shadow-2xl shadow-accent/5 overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
          <div className="h-3 w-3 rounded-full bg-red-500/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <div className="h-3 w-3 rounded-full bg-green-500/60" />
          <span className="ml-2 text-xs text-muted-foreground font-mono">
            agent-workflow.tsx
          </span>
        </div>

        {/* Timeline */}
        <div className="px-6 py-6">
          <AgentTimeline
            steps={steps}
            tiers={activeTab === "tiers" ? TIER_GROUPS : undefined}
            approvalRequest={approval}
            showElapsedTime
          />
        </div>
      </div>
    </div>
  );
}
