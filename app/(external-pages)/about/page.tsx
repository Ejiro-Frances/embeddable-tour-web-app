import { TeamSection } from "@/components/sections/about/team";
import { MissionSection } from "@/components/sections/about/mission";
import { TimelineSection } from "@/components/sections/about/timeline";
import { ValuesSection } from "@/components/sections/about/values";
import { CTA } from "@/components/sections/about/cta";
import { HeroSection } from "@/components/sections/about/hero";

export default function AboutPage() {
  return (
    <main className="relative pt-20">
      <HeroSection />
      <MissionSection />
      <TimelineSection />
      <ValuesSection />
      <TeamSection />
      <CTA />
    </main>
  );
}