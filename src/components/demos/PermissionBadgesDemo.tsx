"use client";

import { useState } from "react";
import { PermissionBadges } from "agent-native";
import type { Permission } from "agent-native";

const samplePermissions: Permission[] = [
  { id: "read", name: "File Read", granted: true, category: "file", description: "Read files from the filesystem" },
  { id: "write", name: "File Write", granted: true, category: "file", description: "Write and create files" },
  { id: "edit", name: "File Edit", granted: true, category: "file", description: "Edit existing files in-place" },
  { id: "shell", name: "Shell", granted: false, category: "shell", description: "Execute shell commands" },
  { id: "shell-bg", name: "Background Shell", granted: false, category: "shell", description: "Run background processes" },
  { id: "http", name: "HTTP Requests", granted: true, category: "network", description: "Make HTTP/HTTPS requests" },
  { id: "ws", name: "WebSocket", granted: false, category: "network", description: "Open WebSocket connections" },
  { id: "browser", name: "Browser", granted: true, category: "network", description: "Launch headless browser" },
];

export function PermissionBadgesBasicDemo() {
  const [layout, setLayout] = useState<"inline" | "grid">("inline");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["inline", "grid"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLayout(l)}
            className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
              layout === l
                ? "border-foreground bg-foreground/10 text-foreground"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      <PermissionBadges permissions={samplePermissions} layout={layout} />
    </div>
  );
}

export function PermissionBadgesGroupedDemo() {
  return <PermissionBadges permissions={samplePermissions} groupByCategory layout="inline" />;
}

export function PermissionBadgesGrantedOnlyDemo() {
  return <PermissionBadges permissions={samplePermissions} showDenied={false} />;
}

export function PermissionBadgesGridDemo() {
  return <PermissionBadges permissions={samplePermissions} layout="grid" />;
}
