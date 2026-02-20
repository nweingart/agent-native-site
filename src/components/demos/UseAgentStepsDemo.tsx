"use client";

import { useAgentSteps, AgentTimeline } from "agent-native";

export function AgentStepsDemo() {
  const { props, dispatch, reset } = useAgentSteps({
    showElapsedTime: true,
    showToolCalls: true,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          className="rounded bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition-colors"
          onClick={() =>
            dispatch({
              type: "step.started",
              step: { id: "scan", label: "Scanning repository" },
            })
          }
        >
          Start Step
        </button>
        <button
          className="rounded bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition-colors"
          onClick={() =>
            dispatch({
              type: "tool.started",
              stepId: "scan",
              toolCall: {
                id: "tc-1",
                name: "read_file",
                input: { path: "src/app.ts" },
              },
            })
          }
        >
          Start Tool Call
        </button>
        <button
          className="rounded bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition-colors"
          onClick={() =>
            dispatch({
              type: "tool.completed",
              stepId: "scan",
              toolCallId: "tc-1",
              output: "File read successfully",
            })
          }
        >
          Complete Tool Call
        </button>
        <button
          className="rounded bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition-colors"
          onClick={() =>
            dispatch({
              type: "step.completed",
              stepId: "scan",
            })
          }
        >
          Complete Step
        </button>
        <button
          className="rounded bg-zinc-800 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-zinc-700 transition-colors"
          onClick={reset}
        >
          Reset
        </button>
      </div>
      <AgentTimeline {...props} />
    </div>
  );
}
