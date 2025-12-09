import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { DemoSection } from "@/components/sections/demo";
import { DocumentationSection } from "@/components/sections/documentation";
import { PricingSection } from "@/components/sections/pricing";
import { ContactSection } from "@/components/sections/contact";
import { ImageSlider } from "@/components/ui/image-slider";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tourify - Build Better Feature Tours",
  description: "The easiest way to build functional, beautiful onboarding tours for your web application. Get started for free.",
};

const demoImages = [
  "/images/demo1.png",
  "/images/demo2.png",
  "/images/demo3.png",
  "/images/demo4.png",
];

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      
      {/* Image Slider Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                See Tourify in Action
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Watch how top companies use Tourify to transform their user onboarding experience
              </p>
            </div> */}
            <ImageSlider images={demoImages} />
          </div>
        </div>
      </section>

      <FeaturesSection />
      <HowItWorksSection />
      <DemoSection />
      <DocumentationSection />
      <PricingSection />
      <ContactSection />
    </main>
  );
}