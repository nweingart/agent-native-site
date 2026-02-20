import {
  Paintbrush,
  Moon,
  Accessibility,
  Package,
  FileCode2,
  Settings2,
} from "lucide-react";

const features = [
  {
    icon: Paintbrush,
    title: "Tailwind Compatible",
    description:
      "Override every element with classNames. Works alongside your existing Tailwind setup.",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description:
      'Automatic dark mode via .dark class or .an-dark. Respects your app\'s theme.',
  },
  {
    icon: Accessibility,
    title: "Accessible",
    description:
      "ARIA roles, keyboard navigation, screen reader labels, reduced motion support.",
  },
  {
    icon: Package,
    title: "Zero Dependencies",
    description:
      "Only peer-depends on React. No runtime bloat. Tree-shakeable ESM.",
  },
  {
    icon: FileCode2,
    title: "Fully Typed",
    description:
      "Complete TypeScript types for every prop, hook, and data structure.",
  },
  {
    icon: Settings2,
    title: "CSS Variables",
    description:
      "40+ design tokens you can override. All prefixed with --an- to avoid collisions.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-24 px-6 bg-surface/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Built right.
          </h2>
          <p className="text-lg text-muted">
            The details you&apos;d want if you were building it yourself.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-background p-6 hover:border-muted-foreground/40 transition-colors"
            >
              <feature.icon className="h-8 w-8 text-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
