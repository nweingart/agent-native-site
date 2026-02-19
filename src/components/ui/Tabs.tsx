"use client";

import { useState } from "react";
import { clsx } from "clsx";

interface Tab {
  label: string;
  value: string;
}

export function Tabs({
  tabs,
  defaultValue,
  onChange,
  children,
  className,
}: {
  tabs: Tab[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: (activeValue: string) => React.ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]?.value ?? "");

  const handleChange = (value: string) => {
    setActive(value);
    onChange?.(value);
  };

  return (
    <div className={className}>
      <div className="flex gap-1 border-b border-border mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleChange(tab.value)}
            className={clsx(
              "px-3 py-2 text-sm font-medium transition-colors -mb-px",
              active === tab.value
                ? "text-accent border-b-2 border-accent"
                : "text-muted hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {children(active)}
    </div>
  );
}
