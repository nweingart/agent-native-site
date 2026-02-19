"use client";

import { AgentTimeline } from "agent-native";
import { elapsedSteps } from "./demo-data";

export function TimelineWithElapsed() {
  return <AgentTimeline steps={elapsedSteps} showElapsedTime />;
}
