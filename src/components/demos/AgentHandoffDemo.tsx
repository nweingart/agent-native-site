"use client";

import { useState, useEffect } from "react";
import { AgentHandoff } from "agent-native";
import type { SubAgent, HandoffEvent } from "agent-native";

const agents: SubAgent[] = [
  { id: "planner", name: "Planner", status: "complete", task: "Decompose task into subtasks" },
  { id: "coder", name: "Coder", status: "running", task: "Implement auth middleware changes",
    steps: [
      { id: "s1", label: "Read middleware.ts", status: "complete" },
      { id: "s2", label: "Edit token validation", status: "complete" },
      { id: "s3", label: "Add rate limiting", status: "running" },
      { id: "s4", label: "Write tests", status: "pending" },
    ],
  },
  { id: "reviewer", name: "Reviewer", status: "idle", task: "Review code changes" },
];

const handoffs: HandoffEvent[] = [
  { id: "h1", fromAgentId: "planner", toAgentId: "coder", task: "implement auth changes", timestamp: Date.now() - 60000 },
  { id: "h2", fromAgentId: "coder", toAgentId: "reviewer", task: "review PR #42", timestamp: Date.now() },
];

export function AgentHandoffBasicDemo() {
  const [activeId, setActiveId] = useState("coder");

  return (
    <div className="space-y-4">
      <AgentHandoff
        agents={agents}
        activeAgentId={activeId}
        handoffs={handoffs}
        onAgentClick={(agent) => setActiveId(agent.id)}
      />
      <p className="text-xs text-muted-foreground">
        Click an agent card to set it as active
      </p>
    </div>
  );
}

export function AgentHandoffHorizontalDemo() {
  return (
    <AgentHandoff
      agents={agents}
      activeAgentId="coder"
      handoffs={handoffs}
      layout="horizontal"
    />
  );
}

export function AgentHandoffWithStepsDemo() {
  const [currentAgents, setCurrentAgents] = useState(agents);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentAgents((prev) =>
        prev.map((a) =>
          a.id === "coder"
            ? {
                ...a,
                status: "complete" as const,
                steps: a.steps?.map((s) => ({ ...s, status: "complete" as const })),
              }
            : a.id === "reviewer"
              ? { ...a, status: "running" as const }
              : a
        )
      );
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AgentHandoff
      agents={currentAgents}
      activeAgentId={currentAgents.find((a) => a.status === "running")?.id}
      handoffs={handoffs}
      showSteps
    />
  );
}
