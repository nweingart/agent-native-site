import { Info, AlertTriangle, Lightbulb } from "lucide-react";
import { clsx } from "clsx";

const variants = {
  info: {
    icon: Info,
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    iconColor: "text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/5",
    iconColor: "text-yellow-400",
  },
  tip: {
    icon: Lightbulb,
    border: "border-green-500/30",
    bg: "bg-green-500/5",
    iconColor: "text-green-400",
  },
};

export function Callout({
  variant = "info",
  children,
}: {
  variant?: keyof typeof variants;
  children: React.ReactNode;
}) {
  const v = variants[variant];
  const Icon = v.icon;

  return (
    <div
      className={clsx(
        "flex gap-3 rounded-lg border p-4 my-4",
        v.border,
        v.bg
      )}
    >
      <Icon className={clsx("h-5 w-5 shrink-0 mt-0.5", v.iconColor)} />
      <div className="text-sm text-muted [&>p]:m-0">{children}</div>
    </div>
  );
}
