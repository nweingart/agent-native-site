interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export function PropsTable({ props }: { props: Prop[] }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="py-3 pr-4 font-semibold text-foreground">Prop</th>
            <th className="py-3 pr-4 font-semibold text-foreground">Type</th>
            <th className="py-3 pr-4 font-semibold text-foreground">Default</th>
            <th className="py-3 font-semibold text-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-border/50">
              <td className="py-3 pr-4 font-mono text-accent-foreground whitespace-nowrap">
                {prop.name}
              </td>
              <td className="py-3 pr-4 font-mono text-muted whitespace-nowrap">
                {prop.type}
              </td>
              <td className="py-3 pr-4 font-mono text-muted-foreground">
                {prop.default ?? "—"}
              </td>
              <td className="py-3 text-muted">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
