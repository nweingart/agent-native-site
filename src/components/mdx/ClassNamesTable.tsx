interface ClassNameKey {
  key: string;
  target: string;
}

export function ClassNamesTable({ keys }: { keys: ClassNameKey[] }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="py-3 pr-4 font-semibold text-foreground">Key</th>
            <th className="py-3 font-semibold text-foreground">Target Element</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((item) => (
            <tr key={item.key} className="border-b border-border/50">
              <td className="py-3 pr-4 font-mono text-accent-foreground whitespace-nowrap">
                {item.key}
              </td>
              <td className="py-3 text-muted">{item.target}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
