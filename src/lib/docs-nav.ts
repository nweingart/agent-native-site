export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const docsNav: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Installation", href: "/docs/getting-started/installation" },
      { title: "Quick Start", href: "/docs/getting-started/quick-start" },
      { title: "Theming", href: "/docs/getting-started/theming" },
      { title: "Tailwind", href: "/docs/getting-started/tailwind" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "AgentTimeline", href: "/docs/components/agent-timeline" },
      { title: "TimelineStep", href: "/docs/components/timeline-step" },
      { title: "TimelineTier", href: "/docs/components/timeline-tier" },
      { title: "TimelineApprovalGate", href: "/docs/components/timeline-approval-gate" },
      { title: "TimelineConnector", href: "/docs/components/timeline-connector" },
      { title: "TimelineSummary", href: "/docs/components/timeline-summary" },
      { title: "TimelineToolCall", href: "/docs/components/timeline-tool-call" },
      { title: "TimelineToolCallList", href: "/docs/components/timeline-tool-call-list" },
      { title: "TimelineArtifact", href: "/docs/components/timeline-artifact" },
      { title: "StreamingText", href: "/docs/components/streaming-text" },
      { title: "ThinkingIndicator", href: "/docs/components/thinking-indicator" },
      { title: "AgentStatusBar", href: "/docs/components/agent-status-bar" },
      { title: "DiffViewer", href: "/docs/components/diff-viewer" },
      { title: "TerminalOutput", href: "/docs/components/terminal-output" },
      { title: "TaskTree", href: "/docs/components/task-tree" },
      { title: "AgentHandoff", href: "/docs/components/agent-handoff" },
      { title: "ContextBudget", href: "/docs/components/context-budget" },
      { title: "CostTracker", href: "/docs/components/cost-tracker" },
      { title: "PermissionBadges", href: "/docs/components/permission-badges" },
    ],
  },
  {
    title: "Hooks",
    items: [
      { title: "useVisualMemory", href: "/docs/hooks/use-visual-memory" },
      { title: "useAutoScroll", href: "/docs/hooks/use-auto-scroll" },
      { title: "useElapsedTime", href: "/docs/hooks/use-elapsed-time" },
      { title: "useReducedMotion", href: "/docs/hooks/use-reduced-motion" },
      { title: "useAgentSteps", href: "/docs/hooks/use-agent-steps" },
      { title: "useAgentStream", href: "/docs/hooks/use-agent-stream" },
      { title: "useStreamingText", href: "/docs/hooks/use-streaming-text" },
    ],
  },
  {
    title: "Types",
    items: [
      { title: "Reference", href: "/docs/types/reference" },
    ],
  },
  {
    title: "Customization",
    items: [
      { title: "CSS Variables", href: "/docs/customization/css-variables" },
      { title: "classNames", href: "/docs/customization/class-names" },
      { title: "Render Slots", href: "/docs/customization/render-slots" },
      { title: "Data Attributes", href: "/docs/customization/data-attributes" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Changelog", href: "/docs/changelog" },
      { title: "FAQ", href: "/docs/faq" },
    ],
  },
];
