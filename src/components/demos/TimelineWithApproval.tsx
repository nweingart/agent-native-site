"use client";

import { useState, useCallback } from "react";
import { AgentTimeline } from "agent-native";
import type { AgentStep, ApprovalRequest } from "agent-native";
import {
  approvalSteps as initialSteps,
  approvalRequest as initialRequest,
} from "./demo-data";

export function TimelineWithApproval() {
  const [steps, setSteps] = useState<AgentStep[]>(initialSteps);
  const [request, setRequest] = useState<ApprovalRequest | undefined>(
    initialRequest
  );

  const handleApprove = useCallback(() => {
    setRequest(undefined);
    setSteps((prev) =>
      prev.map((s) =>
        s.id === "execute"
          ? { ...s, status: "running" as const, startedAt: Date.now() }
          : s
      )
    );
    setTimeout(() => {
      setSteps((prev) =>
        prev.map((s) =>
          s.id === "execute"
            ? {
                ...s,
                status: "complete" as const,
                completedAt: Date.now(),
                description: "8 components updated successfully",
              }
            : s
        )
      );
    }, 2000);
  }, []);

  const handleReject = useCallback(() => {
    setRequest(undefined);
    setSteps((prev) =>
      prev.map((s) =>
        s.id === "execute"
          ? { ...s, status: "cancelled" as const, description: "Rejected by user" }
          : s
      )
    );
  }, []);

  const handleReset = useCallback(() => {
    setSteps(initialSteps);
    setRequest(initialRequest);
  }, []);

  const isDone = !request && steps.some((s) => s.id === "execute" && s.status !== "pending");

  return (
    <div>
      <AgentTimeline
        steps={steps}
        approvalRequest={request}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      {isDone && (
        <button
          onClick={handleReset}
          className="mt-4 text-sm text-accent hover:text-accent-foreground transition-colors"
        >
          Reset demo
        </button>
      )}
    </div>
  );
}
