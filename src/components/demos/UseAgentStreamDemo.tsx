"use client";

import { useState } from "react";

const statusColors: Record<string, string> = {
  connecting: "bg-yellow-500",
  open: "bg-green-500",
  closed: "bg-zinc-500",
  error: "bg-red-500",
};

const statusLabels: Record<string, string> = {
  connecting: "Connecting...",
  open: "Connected",
  closed: "Disconnected",
  error: "Error",
};

type DemoStatus = "connecting" | "open" | "closed" | "error";

export function AgentStreamDemo() {
  const [status, setStatus] = useState<DemoStatus>("closed");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["connecting", "open", "closed", "error"] as DemoStatus[]).map(
          (s) => (
            <button
              key={s}
              className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                status === s
                  ? "bg-zinc-600 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
              onClick={() => setStatus(s)}
            >
              {s}
            </button>
          )
        )}
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3">
        <div
          className={`h-2.5 w-2.5 rounded-full ${statusColors[status]} ${
            status === "connecting" ? "animate-pulse" : ""
          }`}
        />
        <span className="text-sm text-zinc-300">{statusLabels[status]}</span>
        {status === "error" && (
          <span className="ml-auto text-xs text-red-400">
            Connection refused
          </span>
        )}
        {status === "open" && (
          <span className="ml-auto font-mono text-xs text-zinc-500">
            reconnects: 0
          </span>
        )}
      </div>
    </div>
  );
}
