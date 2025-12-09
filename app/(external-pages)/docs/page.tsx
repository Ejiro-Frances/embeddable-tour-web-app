import { DocsHero } from "@/components/sections/docs/hero";
import { QuickStartSection } from "@/components/sections/docs/quick-start";
import { APISection } from "@/components/sections/docs/api";
import { ExamplesSection } from "@/components/sections/docs/examples";
import { FAQSection } from "@/components/sections/docs/faq";
import { ResourcesSection } from "@/components/sections/docs/resources";

export default function DocsPage() {
  return (
    <main className="relative pt-20">
      <DocsHero />
      <QuickStartSection />
      <APISection />
      <ExamplesSection />
      <FAQSection />
      <ResourcesSection />
    </main>
  );
}