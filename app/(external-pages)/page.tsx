import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { DocumentationSection } from "@/components/sections/documentation";
import { FAQSection } from "@/components/sections/faq";
import { ImageSlider } from "@/components/ui/image-slider";
import type { Metadata } from "next";
// import { DemoSection } from "@/components/sections/demo";
// import { PricingSection } from "@/components/sections/pricing";
// import { ContactSection } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Tourify - Build Better Feature Tours",
  description:
    "The easiest way to build functional, beautiful onboarding tours for your web application. Get started for free.",
};

const demoImages = [
  "/images/demo1.png",
  "/images/demo2.png",
  "/images/demo3.png",
];

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />

      {/* Image Slider Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ImageSlider images={demoImages} />
          </div>
        </div>
      </section>

      <FeaturesSection />
      <HowItWorksSection />
      {/* <DemoSection /> */}
      <DocumentationSection />
            <FAQSection />
      
      {/* <PricingSection /> */}
      {/* <ContactSection /> */}
    </main>
  );
}
