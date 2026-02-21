import { Smartphone } from "lucide-react";

export function ReactNativeTeaser() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl border border-border bg-surface mb-6">
          <Smartphone className="h-7 w-7 text-foreground" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          React Native.{" "}
          <span className="text-muted">Coming soon.</span>
        </h2>

        <p className="text-lg text-muted max-w-xl mx-auto leading-relaxed">
          The same components and API, built natively for iOS and Android.
          Same data, same hooks, native performance.
        </p>
      </div>
    </section>
  );
}
