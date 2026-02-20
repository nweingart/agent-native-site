export function Manifesto() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
          Agents act. Your UI should show it.
        </h2>

        <div className="space-y-6 text-lg text-muted leading-relaxed">
          <p>
            Most agent frameworks give you a chat window. Streaming tokens.
            That works for conversations, not for workflows.
          </p>
          <p>
            When your agent scans files, runs tests, calls APIs, waits for
            approval, and deploys code, users should see each step happening.
          </p>
          <p>
            <span className="text-foreground font-semibold">agent-native</span>{" "}
            is a timeline component. Steps with statuses. Parallel execution
            tiers. Approval gates. Elapsed timers. Accessible, themeable,
            headless.
          </p>
        </div>
      </div>
    </section>
  );
}
