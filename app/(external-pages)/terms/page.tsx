import { TermsHero } from "@/components/sections/terms/hero";
import { TermsContent } from "@/components/sections/terms/content";
import { TermsCTA } from "@/components/sections/terms/cta";

export default function TermsPage() {
  return (
    <main className="relative pt-20">
      <TermsHero />
      <TermsContent />
      <TermsCTA />
    </main>
  );
}