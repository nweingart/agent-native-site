import { HeroDemoTimeline } from "./HeroDemoTimeline";
import { CopyButton } from "@/components/ui/CopyButton";
import Link from "next/link";

const installCmd = "npm install agent-native";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/8 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted mb-6">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              v0.1.0 — Now on npm
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Agent UIs deserve better than{" "}
              <span className="text-accent">chat bubbles.</span>
            </h1>

            <p className="text-lg text-muted max-w-lg mb-8 leading-relaxed">
              A headless, accessible timeline component for AI agent interfaces.
              Show users what your agent is doing — step by step, in real time.
              Ships with dark mode, Tailwind support, and zero dependencies.
            </p>

            {/* Install command */}
            <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 font-mono text-sm max-w-md mb-8">
              <span className="text-muted-foreground select-none">$</span>
              <code className="flex-1 text-foreground">{installCmd}</code>
              <CopyButton text={installCmd} />
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4">
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
          </div>

          {/* Right: Live demo */}
          <div className="relative">
            <div className="rounded-xl border border-border bg-surface p-6 shadow-2xl shadow-accent/5">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">
                  agent-workflow.tsx
                </span>
              </div>
              <HeroDemoTimeline />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
