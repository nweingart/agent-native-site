"use client";

import { AgentTimeline, TimelineToolCall, TimelineToolCallList } from "agent-native";
import type { ToolCall } from "agent-native";
import { toolCallSteps } from "./demo-data";

export function TimelineWithToolCalls() {
  return <AgentTimeline steps={toolCallSteps} showToolCalls showElapsedTime />;
}

const sampleToolCalls: ToolCall[] = [
  {
    id: "tc-a",
    name: "read_file",
    input: { path: "src/index.ts" },
    output: "File contents (42 lines)",
    status: "complete",
    startedAt: Date.now() - 5000,
    completedAt: Date.now() - 3000,
  },
  {
    id: "tc-b",
    name: "edit_file",
    input: { path: "src/index.ts", changes: "Add export" },
    status: "running",
    startedAt: Date.now() - 2000,
  },
  {
    id: "tc-c",
    name: "run_tests",
    input: { suite: "integration" },
    status: "pending",
  },
  {
    id: "tc-d",
    name: "compile",
    input: { target: "es2022" },
    status: "error",
    error: "Type error in src/index.ts:12",
    startedAt: Date.now() - 6000,
    completedAt: Date.now() - 5500,
  },
];

export function StandaloneToolCallDemo() {
  return (
    <div className="space-y-2">
      {sampleToolCalls.map((tc) => (
        <TimelineToolCall key={tc.id} toolCall={tc} />
      ))}
    </div>
  );
}

export function StandaloneToolCallListDemo() {
  return (
    <TimelineToolCallList
      toolCalls={sampleToolCalls.slice(0, 3)}
      defaultExpanded
    />
  );
}
