import { PrivacyHero } from "@/components/sections/privacy/hero";
import { PrivacyContent } from "@/components/sections/privacy/content";
import { PrivacyCTA } from "@/components/sections/privacy/cta";

export default function PrivacyPage() {
  return (
    <main className="relative pt-20">
      <PrivacyHero />
      <PrivacyContent />
      <PrivacyCTA />
    </main>
  );
}