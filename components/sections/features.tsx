"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code2, 
  Palette, 
  Zap, 
  BarChart3, 
  Users, 
  Globe,
  Lock,
  Smartphone
} from "lucide-react";
import { GlowingCard } from "@/components/ui/glowing-card";

const features = [
  {
    icon: <Code2 className="h-8 w-8" />,
    title: "No-Code Builder",
    description: "Drag-and-drop interface to create tours without writing a single line of code.",
    gradient: "from-amber-500 to-amber-600",
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "Customizable Themes",
    description: "Match your brand with complete control over colors, fonts, and animations.",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Lightning Fast",
    description: "Optimized widget loads in under 50ms without affecting your site performance.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Advanced Analytics",
    description: "Track user engagement, drop-off points, and tour completion rates.",
    gradient: "from-amber-500 to-red-500",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Team Collaboration",
    description: "Work together with your team to create and manage onboarding experiences.",
    gradient: "from-amber-500 to-pink-500",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Multi-language",
    description: "Support for 50+ languages with automatic translation capabilities.",
    gradient: "from-amber-500 to-purple-500",
  },
  {
    icon: <Lock className="h-8 w-8" />,
    title: "Enterprise Security",
    description: "SOC2 compliant with end-to-end encryption and GDPR ready.",
    gradient: "from-amber-500 to-blue-500",
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile First",
    description: "Perfect experience on all devices with responsive tour design.",
    gradient: "from-amber-500 to-green-500",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <span className="text-sm font-medium text-amber-500">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need For{" "}
            <span className="gradient-text">Perfect Onboarding</span>
          </h2>
          <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
            Packed with powerful features to create, manage, and optimize your
            user onboarding experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlowingCard delay={index * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-ivory">
                    {feature.title}
                  </h3>
                  <p className="text-ivory/70">{feature.description}</p>
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}