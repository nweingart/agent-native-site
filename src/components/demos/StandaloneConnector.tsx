"use client";

import { useState, useEffect } from "react";
import { TimelineConnector, TimelineStep } from "agent-native";
import type { AgentStep } from "agent-native";

export function ConnectorFillDemo() {
  const steps: AgentStep[] = [
    { id: "1", label: "Completed step", status: "complete", startedAt: Date.now() - 5000, completedAt: Date.now() - 3000 },
    { id: "2", label: "Running step", status: "running", startedAt: Date.now() - 2000 },
    { id: "3", label: "Pending step", status: "pending" },
  ];

  return (
    <div>
      <TimelineStep step={steps[0]} />
      <TimelineConnector fillPercent={100} />
      <TimelineStep step={steps[1]} />
      <TimelineConnector fillPercent={50} />
      <TimelineStep step={steps[2]} />
      <TimelineConnector fillPercent={0} />
    </div>
  );
}

export function AnimatedConnectorDemo() {
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFill((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-6">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm text-muted-foreground">0%</span>
          <div className="relative h-24 w-0.5 mx-auto">
            <TimelineConnector fillPercent={0} />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm text-muted-foreground">50%</span>
          <div className="relative h-24 w-0.5 mx-auto">
            <TimelineConnector fillPercent={50} />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm text-muted-foreground">100%</span>
          <div className="relative h-24 w-0.5 mx-auto">
            <TimelineConnector fillPercent={100} />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm text-muted-foreground font-mono">{fill}%</span>
          <div className="relative h-24 w-0.5 mx-auto">
            <TimelineConnector fillPercent={fill} />
          </div>
        </div>
      </div>
    </div>
  );
}
