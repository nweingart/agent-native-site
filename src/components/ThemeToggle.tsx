"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const cycle = { light: "dark", dark: "system", system: "light" } as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  const label =
    theme === "dark" ? "Dark" : theme === "light" ? "Light" : "System";

  return (
    <button
      onClick={() => setTheme(cycle[theme])}
      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted hover:text-foreground hover:bg-surface-2 transition-colors w-full"
      aria-label={`Theme: ${label}. Click to switch.`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
