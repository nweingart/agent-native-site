"use client";

import { useState, useEffect, useCallback, useRef, useLayoutEffect } from "react";
import { AgentTimeline } from "agent-native";
import type { AgentStep, StepTier, ApprovalRequest } from "agent-native";

const BASE_STEPS: AgentStep[] = [
  { id: "scan", label: "Scanning repository", status: "pending" },
  { id: "analyze", label: "Analyzing 847 files", status: "pending" },
  { id: "lint", label: "ESLint", status: "pending" },
  { id: "typecheck", label: "TypeScript", status: "pending" },
  { id: "test", label: "Running tests", status: "pending" },
  { id: "review", label: "Code review", status: "pending" },
  { id: "deploy", label: "Deploying to staging", status: "pending" },
];

const TIERS: StepTier[] = [
  { id: "checks", label: "Quality Checks", stepIds: ["lint", "typecheck", "test"] },
];

type Phase =
  | { type: "sequential"; index: number }
  | { type: "parallel-start" }
  | { type: "parallel-complete" }
  | { type: "approval-show" }
  | { type: "approval-approve" }
  | { type: "final-run" }
  | { type: "final-complete" }
  | { type: "pause" };

export function HeroDemoTimeline() {
  const [steps, setSteps] = useState<AgentStep[]>(BASE_STEPS);
  const [approval, setApproval] = useState<ApprovalRequest | undefined>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const updateStep = useCallback(
    (id: string, updates: Partial<AgentStep>) => {
      setSteps((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );
    },
    []
  );

  useEffect(() => {
    let cancelled = false;

    const delay = (ms: number) =>
      new Promise<void>((resolve) => {
        timeoutRef.current = setTimeout(() => {
          if (!cancelled) resolve();
        }, ms);
      });

    const run = async () => {
      while (!cancelled) {
        // Reset
        setSteps(BASE_STEPS);
        setApproval(undefined);
        await delay(800);

        // Step 1: scan (sequential)
        updateStep("scan", { status: "running", startedAt: Date.now() });
        await delay(1000);
        updateStep("scan", {
          status: "complete",
          completedAt: Date.now(),
          description: "Found 23 source files",
        });
        await delay(300);

        // Step 2: analyze (sequential)
        updateStep("analyze", { status: "running", startedAt: Date.now() });
        await delay(1200);
        updateStep("analyze", {
          status: "complete",
          completedAt: Date.now(),
          description: "Resolved 128 packages",
        });
        await delay(300);

        // Steps 3-5: parallel tier (start all at once)
        const tierStart = Date.now();
        updateStep("lint", { status: "running", startedAt: tierStart });
        updateStep("typecheck", { status: "running", startedAt: tierStart });
        updateStep("test", { status: "running", startedAt: tierStart });
        await delay(800);

        updateStep("lint", {
          status: "complete",
          completedAt: Date.now(),
          description: "0 errors",
        });
        await delay(400);
        updateStep("typecheck", {
          status: "complete",
          completedAt: Date.now(),
          description: "No type errors",
        });
        await delay(600);
        updateStep("test", {
          status: "complete",
          completedAt: Date.now(),
          description: "52/52 passing",
        });
        await delay(400);

        // Step 6: approval gate
        updateStep("review", {
          status: "waiting_approval",
          startedAt: Date.now(),
        });
        setApproval({
          id: "gate-1",
          stepId: "review",
          title: "Deploy to staging?",
          description: "All checks passed. Ready to deploy.",
          createdAt: Date.now(),
        });
        await delay(1800);

        // Auto-approve
        setApproval(undefined);
        updateStep("review", { status: "complete", completedAt: Date.now() });
        await delay(300);

        // Step 7: deploy
        updateStep("deploy", { status: "running", startedAt: Date.now() });
        await delay(1200);
        updateStep("deploy", {
          status: "complete",
          completedAt: Date.now(),
          description: "Live at staging.example.com",
        });

        // Pause before restart
        await delay(3000);
      }
    };

    run();

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [updateStep]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest active element (running step or approval gate)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Find the running/waiting step, or the approval gate
    const target =
      container.querySelector<HTMLElement>('[data-status="waiting_approval"]') ??
      container.querySelector<HTMLElement>('[data-status="running"]') ??
      container.querySelector<HTMLElement>('[data-approval-id]');

    if (target) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const offset = targetRect.top - containerRect.top + container.scrollTop;
      // Center the target in the viewport
      const scrollTo = offset - container.clientHeight / 2 + targetRect.height / 2;
      container.scrollTo({ top: Math.max(0, scrollTo), behavior: "smooth" });
    }
  }, [steps, approval]);

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto px-6 pb-6"
      style={{ scrollbarWidth: "none" }}
    >
      <AgentTimeline
        steps={steps}
        tiers={TIERS}
        approvalRequest={approval}
        showElapsedTime
      />
    </div>
  );
}
