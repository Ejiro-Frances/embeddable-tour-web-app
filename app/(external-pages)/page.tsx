import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { DemoSection } from "@/components/sections/demo";
import { DocumentationSection } from "@/components/sections/documentation";
import { PricingSection } from "@/components/sections/pricing";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoSection />
      <DocumentationSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
