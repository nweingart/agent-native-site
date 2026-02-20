import { HeroTabbedDemo } from "./HeroTabbedDemo";
import { CopyButton } from "@/components/ui/CopyButton";
import Link from "next/link";

const installCmd = "npm install agent-native";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/8 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted mb-6">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            v0.1.0 — Now on npm
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            One component.{" "}
            <span className="text-accent">Every pattern.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-muted max-w-2xl mb-8 leading-relaxed">
            Sequential steps, parallel execution, human-in-the-loop approval
            — all from a single{" "}
            <code className="text-sm bg-surface border border-border rounded px-1.5 py-0.5 font-mono">
              &lt;AgentTimeline&gt;
            </code>{" "}
            component.
          </p>

          {/* Install command */}
          <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 font-mono text-sm max-w-md mb-8">
            <span className="text-muted-foreground select-none">$</span>
            <code className="flex-1 text-foreground">{installCmd}</code>
            <CopyButton text={installCmd} />
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4 mb-16">
            <Link
              href="/docs/getting-started/installation"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent/90 transition-colors"
            >
              Get Started
            </Link>
            <a
              href="https://github.com/nedweingart/agent-native"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-surface transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Tabbed live demos */}
          <HeroTabbedDemo />
        </div>
      </div>
    </section>
  );
}
