"use client";

import { Tabs } from "@/components/ui/Tabs";
import { CopyButton } from "@/components/ui/CopyButton";

const managers = [
  { label: "npm", value: "npm", prefix: "npm install" },
  { label: "yarn", value: "yarn", prefix: "yarn add" },
  { label: "pnpm", value: "pnpm", prefix: "pnpm add" },
  { label: "bun", value: "bun", prefix: "bun add" },
];

export function PackageInstall({ pkg }: { pkg: string }) {
  return (
    <Tabs tabs={managers} defaultValue="npm">
      {(active) => {
        const cmd = `${managers.find((m) => m.value === active)!.prefix} ${pkg}`;
        return (
          <div className="group relative flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 font-mono text-sm">
            <span className="text-muted-foreground select-none">$</span>
            <code className="flex-1 text-foreground">{cmd}</code>
            <CopyButton text={cmd} />
          </div>
        );
      }}
    </Tabs>
  );
}
