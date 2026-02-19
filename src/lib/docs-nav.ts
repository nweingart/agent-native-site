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
    ],
  },
  {
    title: "Hooks",
    items: [
      { title: "useVisualMemory", href: "/docs/hooks/use-visual-memory", disabled: true },
      { title: "useAutoScroll", href: "/docs/hooks/use-auto-scroll", disabled: true },
      { title: "useElapsedTime", href: "/docs/hooks/use-elapsed-time", disabled: true },
      { title: "useReducedMotion", href: "/docs/hooks/use-reduced-motion", disabled: true },
    ],
  },
  {
    title: "Types",
    items: [
      { title: "Reference", href: "/docs/types/reference", disabled: true },
    ],
  },
  {
    title: "Customization",
    items: [
      { title: "CSS Variables", href: "/docs/customization/css-variables", disabled: true },
      { title: "classNames", href: "/docs/customization/class-names", disabled: true },
      { title: "Render Slots", href: "/docs/customization/render-slots", disabled: true },
      { title: "Data Attributes", href: "/docs/customization/data-attributes", disabled: true },
    ],
  },
];
