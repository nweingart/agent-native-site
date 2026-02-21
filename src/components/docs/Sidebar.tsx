"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { docsNav } from "@/lib/docs-nav";
import { SearchTrigger } from "@/components/SearchTrigger";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col h-full py-6 px-4">
      <Link
        href="/"
        className="block text-sm font-semibold text-foreground mb-6 hover:text-muted transition-colors"
      >
        agent-native
      </Link>
      <SearchTrigger />
      <div className="flex-1 space-y-6 overflow-y-auto">
        {docsNav.map((section) => (
          <div key={section.title}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-2">
              {section.title}
            </h4>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    {item.disabled ? (
                      <span className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground/50 cursor-not-allowed">
                        {item.title}
                        <span className="text-[10px] bg-surface-2 rounded px-1.5 py-0.5">
                          Soon
                        </span>
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={clsx(
                          "block rounded-md px-2 py-1.5 text-sm transition-colors",
                          isActive
                            ? "bg-surface-2 text-foreground font-medium"
                            : "text-muted hover:text-foreground hover:bg-surface-2"
                        )}
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-border mt-4">
        <ThemeToggle />
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 lg:hidden rounded-md border border-border bg-surface p-2 text-foreground"
        aria-label="Toggle navigation"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-40 h-screen w-60 border-r border-border bg-background overflow-y-auto",
          "lg:sticky lg:top-0 lg:block",
          open ? "block" : "hidden lg:block"
        )}
      >
        {nav}
      </aside>
    </>
  );
}
