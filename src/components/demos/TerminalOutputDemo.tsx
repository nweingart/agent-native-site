"use client";

import { useState, useEffect, useCallback } from "react";
import { TerminalOutput } from "agent-native";

const npmInstallLines = [
  "\x1b[90mnpm\x1b[0m \x1b[32minfo\x1b[0m using npm@10.2.0",
  "\x1b[90mnpm\x1b[0m \x1b[32minfo\x1b[0m using node@v20.10.0",
  "",
  "added 847 packages in 12s",
  "",
  "\x1b[32m142\x1b[0m packages are looking for funding",
  "  run `\x1b[36mnpm fund\x1b[0m` for details",
  "",
  "\x1b[1m\x1b[33m3\x1b[0m \x1b[33mmoderate severity\x1b[0m vulnerabilities",
  "",
  "To address all issues, run:",
  "  npm audit fix",
  "",
  "\x1b[32m+ agent-native@0.3.0\x1b[0m",
  "\x1b[32m+ react@19.2.4\x1b[0m",
  "\x1b[32m+ react-dom@19.2.4\x1b[0m",
  "\x1b[32m+ typescript@5.9.3\x1b[0m",
];

const buildOutput = [
  "$ \x1b[1mtsup src/index.ts\x1b[0m",
  "\x1b[36mCLI\x1b[0m Building entry: src/index.ts",
  "\x1b[36mCLI\x1b[0m Using tsconfig: tsconfig.json",
  "\x1b[36mESM\x1b[0m Build start",
  "\x1b[36mESM\x1b[0m \x1b[32mdist/index.js\x1b[0m \x1b[90m55.01 KB\x1b[0m",
  "\x1b[36mESM\x1b[0m \x1b[32m\u26a1\ufe0f Build success in 66ms\x1b[0m",
  "\x1b[36mCJS\x1b[0m Build start",
  "\x1b[36mCJS\x1b[0m \x1b[32mdist/index.cjs\x1b[0m \x1b[90m64.46 KB\x1b[0m",
  "\x1b[36mCJS\x1b[0m \x1b[32m\u26a1\ufe0f Build success in 67ms\x1b[0m",
  "\x1b[32mCSS bundled to dist/styles.css\x1b[0m",
];

export function TerminalOutputBasicDemo() {
  const [lines, setLines] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const startStream = useCallback(() => {
    setLines([]);
    setIsStreaming(true);
  }, []);

  useEffect(() => {
    if (!isStreaming) return;

    if (lines.length >= npmInstallLines.length) {
      setIsStreaming(false);
      return;
    }

    const timer = setTimeout(() => {
      setLines((prev) => [...prev, npmInstallLines[prev.length]]);
    }, 100 + Math.random() * 200);

    return () => clearTimeout(timer);
  }, [isStreaming, lines.length]);

  return (
    <div className="space-y-4">
      <TerminalOutput
        lines={lines}
        isStreaming={isStreaming}
        title="npm install"
        exitCode={isStreaming ? undefined : lines.length > 0 ? 0 : undefined}
        maxHeight={300}
      />
      <button
        onClick={startStream}
        disabled={isStreaming}
        className="text-sm px-4 py-2 rounded-md bg-foreground text-background hover:bg-foreground/80 transition-colors disabled:opacity-50"
      >
        {isStreaming ? "Installing..." : lines.length > 0 ? "Run again" : "Run npm install"}
      </button>
    </div>
  );
}

export function TerminalOutputBuildDemo() {
  return (
    <TerminalOutput
      lines={buildOutput}
      title="npm run build"
      exitCode={0}
      maxHeight={250}
    />
  );
}

export function TerminalOutputCollapsibleDemo() {
  return (
    <TerminalOutput
      lines={npmInstallLines}
      title="npm install"
      exitCode={0}
      collapsible
      defaultExpanded={false}
    />
  );
}
