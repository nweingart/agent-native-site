import { HeroTabbedDemo } from "./HeroTabbedDemo";
import { CopyButton } from "@/components/ui/CopyButton";
import { LIBRARY_VERSION } from "@/lib/version";
import Link from "next/link";

const installCmd = "npm install agent-native";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white/[0.04] rounded-full blur-[120px]" />

      <div className="relative w-full max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted mb-6">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            v{LIBRARY_VERSION} on npm
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            React components for{" "}
            <span className="text-accent">AI agents.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-muted max-w-2xl mb-8 leading-relaxed">
            Show users what your agent is doing. Timelines, diffs, terminals,
            task trees, approvals, and more. 19 components, 7 hooks.
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
              className="inline-flex items-center justify-center rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-foreground/90 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/docs/components/agent-timeline"
              className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-surface transition-colors"
            >
              Browse Components
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
