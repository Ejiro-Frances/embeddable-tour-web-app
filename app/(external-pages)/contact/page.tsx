import { ContactHero } from "@/components/sections/contact/hero";
import { ContactForm } from "@/components/sections/contact/form";
import { LocationsSection } from "@/components/sections/contact/locations";

export default function ContactPage() {
  return (
    <main className="relative pt-20">
      <ContactHero />
      <ContactForm />
      {/* <LocationsSection /> */}
    </main>
  );
}