import { Hero } from "@/components/landing/Hero";
import { Manifesto } from "@/components/landing/Manifesto";
import { ComponentLibrary } from "@/components/landing/ComponentLibrary";
import { CodeExample } from "@/components/landing/CodeExample";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { ReactNativeTeaser } from "@/components/landing/ReactNativeTeaser";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <ComponentLibrary />
      <CodeExample />
      <FeaturesGrid />
      <ReactNativeTeaser />
      <Footer />
    </main>
  );
}
