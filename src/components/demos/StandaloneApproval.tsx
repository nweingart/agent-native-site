"use client";

import { useState, useCallback } from "react";
import { TimelineApprovalGate } from "agent-native";
import type { ApprovalRequest } from "agent-native";

const baseRequest: ApprovalRequest = {
  id: "gate-1",
  stepId: "deploy",
  title: "Deploy to production?",
  description:
    "This will deploy version 2.4.1 to all production servers. 12 files changed, all tests passing.",
  createdAt: Date.now(),
};

export function StandaloneApprovalDemo() {
  const [result, setResult] = useState<"pending" | "approved" | "rejected">(
    "pending"
  );

  const handleReset = useCallback(() => setResult("pending"), []);

  if (result !== "pending") {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-muted mb-2">
          Result:{" "}
          <span
            className={
              result === "approved" ? "text-green-400" : "text-red-400"
            }
          >
            {result}
          </span>
        </p>
        <button
          onClick={handleReset}
          className="text-sm text-accent hover:text-accent-foreground transition-colors"
        >
          Reset demo
        </button>
      </div>
    );
  }

  return (
    <TimelineApprovalGate
      request={baseRequest}
      onApprove={() => setResult("approved")}
      onReject={() => setResult("rejected")}
    />
  );
}

export function MinimalApprovalDemo() {
  return (
    <TimelineApprovalGate
      request={{
        id: "gate-2",
        stepId: "action",
        title: "Continue with file deletion?",
        createdAt: Date.now(),
      }}
    />
  );
}

export function StyledApprovalDemo() {
  const [result, setResult] = useState<"pending" | "approved" | "rejected">(
    "pending"
  );

  if (result !== "pending") {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-muted mb-2">
          Result:{" "}
          <span
            className={
              result === "approved" ? "text-green-400" : "text-red-400"
            }
          >
            {result}
          </span>
        </p>
        <button
          onClick={() => setResult("pending")}
          className="text-sm text-accent hover:text-accent-foreground transition-colors"
        >
          Reset demo
        </button>
      </div>
    );
  }

  return (
    <TimelineApprovalGate
      request={baseRequest}
      onApprove={() => setResult("approved")}
      onReject={() => setResult("rejected")}
      className="rounded-xl border-accent/30 bg-accent/5"
      approveButtonClassName="bg-accent hover:bg-accent/80 rounded-lg px-6"
      rejectButtonClassName="bg-zinc-700 hover:bg-zinc-600 rounded-lg px-6"
    />
  );
}
