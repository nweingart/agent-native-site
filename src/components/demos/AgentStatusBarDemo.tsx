"use client";

import { useState } from "react";
import { AgentStatusBar } from "agent-native";
import type { AgentStatus } from "agent-native";

const allStatuses: AgentStatus[] = [
  "idle",
  "thinking",
  "acting",
  "waiting",
  "error",
  "complete",
];

export function AgentStatusBarBasicDemo() {
  const [status, setStatus] = useState<AgentStatus>("thinking");

  return (
    <div className="space-y-4">
      <AgentStatusBar
        status={status}
        tokenUsage={{ inputTokens: 1234, outputTokens: 567 }}
        elapsed={95}
        cost={0.0023}
        model="claude-sonnet-4-20250514"
      />
      <div className="flex gap-2 flex-wrap">
        {allStatuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
              status === s
                ? "border-foreground bg-foreground/10 text-foreground"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AgentStatusBarMinimalDemo() {
  return (
    <div className="space-y-3">
      <AgentStatusBar status="idle" />
      <AgentStatusBar status="thinking" elapsed="12s" />
      <AgentStatusBar status="complete" tokenUsage={{ inputTokens: 5432, outputTokens: 1289 }} cost={0.0156} />
    </div>
  );
}

export function AgentStatusBarClickableDemo() {
  const [lastClick, setLastClick] = useState<string>("");

  return (
    <div className="space-y-3">
      <AgentStatusBar
        status="acting"
        elapsed={30}
        onStatusClick={(s) => setLastClick(s)}
      />
      {lastClick && (
        <p className="text-xs text-muted-foreground">
          Last clicked: <span className="font-mono text-foreground">{lastClick}</span>
        </p>
      )}
    </div>
  );
}
