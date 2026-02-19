export function Manifesto() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
          Agent interfaces have a UI problem.
        </h2>

        <div className="space-y-6 text-lg text-muted leading-relaxed">
          <p>
            Every AI agent framework ships with the same chat interface.
            Streaming text. Token-by-token. Like watching someone type.
          </p>
          <p>
            But agents don&apos;t just talk — they <em className="text-foreground">act</em>.
            They scan files, run tests, call APIs, wait for approval, deploy code.
            These are workflows, not conversations.
          </p>
          <p>
            <span className="text-foreground font-semibold">agent-native</span> gives
            you a real timeline. Steps with statuses. Parallel execution tiers.
            Approval gates. Elapsed timers. All accessible, all themeable, all
            headless enough to make your own.
          </p>
          <p className="text-foreground font-medium">
            Stop streaming text. Start showing progress.
          </p>
        </div>
      </div>
    </section>
  );
}
