"use client";

import { Tabs } from "@/components/ui/Tabs";
import { BasicTimeline } from "@/components/demos/BasicTimeline";
import { TimelineWithTiers } from "@/components/demos/TimelineWithTiers";
import { TimelineWithApproval } from "@/components/demos/TimelineWithApproval";

const tabs = [
  { label: "Basic", value: "basic" },
  { label: "Parallel Tiers", value: "tiers" },
  { label: "Approval Gate", value: "approval" },
];

export function ComponentShowcase() {
  return (
    <section className="py-24 px-6 bg-surface/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            One component. Every pattern.
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Sequential steps, parallel execution, human-in-the-loop approval —
            all from a single <code className="text-accent-foreground bg-surface px-1.5 py-0.5 rounded text-sm">{"<AgentTimeline>"}</code> component.
          </p>
        </div>

        <Tabs tabs={tabs} defaultValue="basic">
          {(active) => (
            <div className="rounded-xl border border-border bg-surface p-8">
              {active === "basic" && <BasicTimeline />}
              {active === "tiers" && <TimelineWithTiers />}
              {active === "approval" && <TimelineWithApproval />}
            </div>
          )}
        </Tabs>
      </div>
    </section>
  );
}
