"use client";

import { AgentTimeline } from "agent-native";
import { tierSteps, tierGroups } from "./demo-data";

export function TimelineWithTiers() {
  return <AgentTimeline steps={tierSteps} tiers={tierGroups} />;
}
