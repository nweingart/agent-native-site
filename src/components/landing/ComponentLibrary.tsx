import Link from "next/link";

interface ComponentCard {
  name: string;
  description: string;
  href: string;
}

const components: ComponentCard[] = [
  {
    name: "AgentTimeline",
    description: "The root timeline container. Steps, tiers, approval gates, auto-scroll.",
    href: "/docs/components/agent-timeline",
  },
  {
    name: "TimelineStep",
    description: "Individual step with status indicator, label, description, and elapsed time.",
    href: "/docs/components/timeline-step",
  },
  {
    name: "TimelineTier",
    description: "Groups steps into a parallel execution block with a shared header.",
    href: "/docs/components/timeline-tier",
  },
  {
    name: "TimelineApprovalGate",
    description: "Inline approval prompt with approve/reject actions.",
    href: "/docs/components/timeline-approval-gate",
  },
  {
    name: "TimelineToolCall",
    description: "Displays a tool invocation with status, name, elapsed time, and I/O.",
    href: "/docs/components/timeline-tool-call",
  },
  {
    name: "TimelineToolCallList",
    description: "Collapsible list of tool calls nested within a step.",
    href: "/docs/components/timeline-tool-call-list",
  },
  {
    name: "TimelineArtifact",
    description: "Renders a file, image, or output artifact attached to a step.",
    href: "/docs/components/timeline-artifact",
  },
  {
    name: "TimelineConnector",
    description: "Standalone connector line with animated fill. For custom layouts.",
    href: "/docs/components/timeline-connector",
  },
  {
    name: "TimelineSummary",
    description: "Aggregate summary bar showing step counts by status.",
    href: "/docs/components/timeline-summary",
  },
  {
    name: "StreamingText",
    description: "Token-by-token text renderer with blinking cursor and optional typing animation.",
    href: "/docs/components/streaming-text",
  },
  {
    name: "ThinkingIndicator",
    description: "Visual reasoning indicator with shimmer, dots, or pulse animations.",
    href: "/docs/components/thinking-indicator",
  },
  {
    name: "AgentStatusBar",
    description: "Compact metrics bar with status, tokens, elapsed time, cost, and model.",
    href: "/docs/components/agent-status-bar",
  },
  {
    name: "DiffViewer",
    description: "Unified or side-by-side code diff renderer with ANSI colors and line numbers.",
    href: "/docs/components/diff-viewer",
  },
  {
    name: "TerminalOutput",
    description: "Streaming terminal output with ANSI color support, auto-scroll, and exit codes.",
    href: "/docs/components/terminal-output",
  },
  {
    name: "TaskTree",
    description: "Nested tree of tasks with status indicators, expand/collapse, and connectors.",
    href: "/docs/components/task-tree",
  },
  {
    name: "AgentHandoff",
    description: "Visualize multi-agent delegation chains with handoff arrows and status.",
    href: "/docs/components/agent-handoff",
  },
  {
    name: "ContextBudget",
    description: "Token budget meter showing context window usage with bar or ring layouts.",
    href: "/docs/components/context-budget",
  },
  {
    name: "CostTracker",
    description: "Running tally of API costs per model and per call with summary and table.",
    href: "/docs/components/cost-tracker",
  },
  {
    name: "PermissionBadges",
    description: "Show granted and denied tool permissions as colored badge pills or cards.",
    href: "/docs/components/permission-badges",
  },
];

const hooks: ComponentCard[] = [
  {
    name: "useAgentSteps",
    description: "Manages step state with add, update, and reset actions.",
    href: "/docs/hooks/use-agent-steps",
  },
  {
    name: "useAgentStream",
    description: "Connects to an SSE or WebSocket stream and drives step updates.",
    href: "/docs/hooks/use-agent-stream",
  },
  {
    name: "useVisualMemory",
    description: "Prevents visual regressions by remembering the highest-priority status.",
    href: "/docs/hooks/use-visual-memory",
  },
  {
    name: "useAutoScroll",
    description: "Keeps the latest step visible, pauses when user scrolls up.",
    href: "/docs/hooks/use-auto-scroll",
  },
  {
    name: "useElapsedTime",
    description: "Live-updating elapsed time string from start/end timestamps.",
    href: "/docs/hooks/use-elapsed-time",
  },
  {
    name: "useReducedMotion",
    description: "Reads prefers-reduced-motion and returns a boolean.",
    href: "/docs/hooks/use-reduced-motion",
  },
  {
    name: "useStreamingText",
    description: "Manages displayed text with optional rAF typing animation.",
    href: "/docs/hooks/use-streaming-text",
  },
];

function CardGrid({ items }: { items: ComponentCard[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="group rounded-xl border border-border bg-background p-5 hover:border-muted-foreground/40 transition-colors"
        >
          <code className="text-sm font-semibold text-accent-foreground group-hover:text-foreground transition-colors">
            {item.name}
          </code>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            {item.description}
          </p>
        </Link>
      ))}
    </div>
  );
}

export function ComponentLibrary() {
  return (
    <section className="py-24 px-6 bg-surface/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            19 components. 7 hooks.
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Everything you need to build agent UIs. Each component is independently importable, fully typed, and documented.
          </p>
        </div>

        {/* Components */}
        <div className="mb-12">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 px-1">
            Components
          </h3>
          <CardGrid items={components} />
        </div>

        {/* Hooks */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 px-1">
            Hooks
          </h3>
          <CardGrid items={hooks} />
        </div>
      </div>
    </section>
  );
}
