import { CodeBlock } from "@/components/mdx/CodeBlock";

const basicCode = `import { AgentTimeline } from 'agent-native';
import 'agent-native/styles';

function AgentWorkflow({ steps }) {
  return <AgentTimeline steps={steps} />;
}`;

const tailwindCode = `<AgentTimeline
  steps={steps}
  classNames={{
    root: "rounded-xl border border-zinc-700 bg-zinc-900 p-4",
    step: "rounded-lg px-3 py-2 hover:bg-zinc-800/50",
    indicator: "ring-2 ring-zinc-600",
    stepBody: "ml-3",
  }}
/>`;

export async function CodeExample() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Explanation */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              10 seconds to a working agent UI.
            </h2>
            <p className="text-lg text-muted mb-6 leading-relaxed">
              Import the component. Pass your steps. That&apos;s it. No context
              providers, no state machines, no configuration objects. Just data in,
              UI out.
            </p>
            <p className="text-muted leading-relaxed">
              Need full control? The <code className="text-accent-foreground bg-surface px-1.5 py-0.5 rounded text-sm">classNames</code> prop
              lets you override every element with Tailwind classes. Or use CSS
              variables. Or replace entire renderers. Your call.
            </p>
          </div>

          {/* Right: Code */}
          <div className="space-y-4">
            <CodeBlock code={basicCode} lang="tsx" filename="AgentWorkflow.tsx" />
          </div>
        </div>

        {/* Second example */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">
              Full Tailwind override in one prop
            </h3>
            <p className="text-muted">
              Every internal element is targetable. No <code className="text-accent-foreground bg-surface px-1.5 py-0.5 rounded text-sm">!important</code>, no
              specificity wars.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <CodeBlock code={tailwindCode} lang="tsx" />
          </div>
        </div>
      </div>
    </section>
  );
}
