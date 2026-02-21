import Link from "next/link";
import { LIBRARY_VERSION } from "@/lib/version";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-lg">agent-native</span>
          <span className="text-xs text-muted bg-surface-2 px-2 py-0.5 rounded-full">
            v{LIBRARY_VERSION}
          </span>
        </div>

        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link
            href="/docs/getting-started/installation"
            className="hover:text-foreground transition-colors"
          >
            Docs
          </Link>
          <a
            href="https://github.com/nedweingart/agent-native"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/agent-native"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            npm
          </a>
        </nav>
      </div>
    </footer>
  );
}
