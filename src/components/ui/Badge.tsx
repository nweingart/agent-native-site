import { clsx } from "clsx";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-surface-2 text-muted",
        variant === "accent" && "bg-accent/15 text-accent-foreground",
        variant === "success" && "bg-green-500/15 text-green-400",
        className
      )}
    >
      {children}
    </span>
  );
}
