import { Check } from "lucide-react";

export function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="grid gap-2 my-4 list-none p-0">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2 text-sm text-muted">
          <Check className="h-4 w-4 mt-0.5 shrink-0 text-green-400" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
