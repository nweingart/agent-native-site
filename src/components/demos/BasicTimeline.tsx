"use client";

import { AgentTimeline } from "agent-native";
import { basicSteps } from "./demo-data";

export function BasicTimeline() {
  return <AgentTimeline steps={basicSteps} />;
}
