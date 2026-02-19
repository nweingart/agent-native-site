import { Hero } from "@/components/landing/Hero";
import { Manifesto } from "@/components/landing/Manifesto";
import { ComponentShowcase } from "@/components/landing/ComponentShowcase";
import { CodeExample } from "@/components/landing/CodeExample";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <ComponentShowcase />
      <CodeExample />
      <FeaturesGrid />
      <Footer />
    </main>
  );
}
