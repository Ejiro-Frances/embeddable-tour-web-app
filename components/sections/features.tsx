"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Zap,
  BarChart3,
  Users,
  Globe,
  Lock,
  Smartphone,
} from "lucide-react";
import { GlowingCard } from "@/components/ui/glowing-card";
import { AnimatedGradientText } from "../ui/animated-gradient-text";

const features = [
  {
    icon: <Code2 className="h-10 w-10" />,
    title: "No-Code Builder",
    description:
      "Drag-and-drop interface to create tours without writing a single line of code.",
    size: "large", // spans 2 cols + taller
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "Customizable Themes",
    description:
      "Match your brand with complete control over colors, fonts, and animations.",
    size: "medium",
  },
  {
    icon: <Zap className="h-9 w-9" />,
    title: "Lightning Fast",
    description:
      "Optimized widget loads in under 50ms without affecting your site performance.",
    size: "medium",
  },
  {
    icon: <BarChart3 className="h-9 w-9" />,
    title: "Advanced Analytics",
    description:
      "Track user engagement, drop-off points, and tour completion rates.",
    size: "large",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Team Collaboration",
    description:
      "Work together with your team to create and manage onboarding experiences.",
    size: "small",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Multi-language",
    description:
      "Support for 50+ languages with automatic translation capabilities.",
    size: "small",
  },
  {
    icon: <Lock className="h-9 w-9" />,
    title: "Enterprise Security",
    description: "SOC2 compliant with end-to-end encryption and GDPR ready.",
    size: "medium",
  },
  {
    icon: <Smartphone className="h-10 w-10" />,
    title: "Mobile First",
    description:
      "Perfect experience on all devices with responsive tour design.",
    size: "large",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-10 relative overflow-hidden bg-black">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full accent-bg/10 border border-amber-300/20 mb-4">
            <span className="text-sm font-medium accent-text">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-white to-amber-200">
            Everything You Need For <br />
                        <AnimatedGradientText text="Perfect Onboarding" />
            
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mt-6">
            Packed with powerful features to create, manage, and optimize your
            user onboarding experience.
          </p>
        </motion.div>

        {/* Bento Grid - Fully Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-6 auto-rows-[minmax(180px,auto)]">
          {/* Card 1 - Large (No-Code) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-4 lg:col-span-6 row-span-2"
          >
            <GlowingCard className="h-full p-8 flex flex-col justify-between">
              <div>
                <div className="p-5 rounded-2xl bg-linear-to-br from-amber-300/20 to-orange-600/10 w-fit mb-6 border border-amber-300/20">
                  {features[0].icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {features[0].title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {features[0].description}
                </p>
              </div>
            </GlowingCard>
          </motion.div>

          {/* Card 2 - Medium */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-2 lg:col-span-3"
          >
            <GlowingCard className="h-full p-6 flex flex-col justify-center">
              <div className="p-4 rounded-2xl accent-bg/10 w-fit mb-5">
                {features[1].icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {features[1].title}
              </h3>
              <p className="text-gray-400">{features[1].description}</p>
            </GlowingCard>
          </motion.div>

          {/* Card 3 - Medium */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-2 lg:col-span-3"
          >
            <GlowingCard className="h-full p-6 flex flex-col justify-center">
              <div className="p-4 rounded-2xl accent-bg/10 w-fit mb-5">
                {features[2].icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {features[2].title}
              </h3>
              <p className="text-gray-400">{features[2].description}</p>
            </GlowingCard>
          </motion.div>

          {/* Card 4 - Analytics (Large vertical) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-4 lg:col-span-6 row-span-2"
          >
            <GlowingCard className="h-full p-8 flex flex-col justify-between">
              <div>
                <div className="p-5 rounded-2xl bg-linear-to-br from-emerald-500/20 to-teal-600/10 w-fit mb-6 border border-emerald-500/20">
                  {features[3].icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {features[3].title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {features[3].description}
                </p>
              </div>
            </GlowingCard>
          </motion.div>

          {/* Card 5 & 6 - Small ones stacked */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-2 lg:col-span-3"
          >
            <GlowingCard className="h-full p-6 flex flex-col justify-center">
              <div className="p-4 rounded-2xl accent-bg/10 w-fit mb-5">
                {features[4].icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {features[4].title}
              </h3>
              <p className="text-gray-400 text-sm">{features[4].description}</p>
            </GlowingCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-2 lg:col-span-3"
          >
            <GlowingCard className="h-full p-6 flex flex-col justify-center">
              <div className="p-4 rounded-2xl accent-bg/10 w-fit mb-5">
                {features[5].icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {features[5].title}
              </h3>
              <p className="text-gray-400 text-sm">{features[5].description}</p>
            </GlowingCard>
          </motion.div>

          {/* Card 7 - Security */}
          {/* <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-4 lg:col-span-6"
          >
            <GlowingCard className="h-full p-8">
              <div className="flex items-center gap-6">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-600/10 border border-purple-500/20">
                  {features[6].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{features[6].title}</h3>
                  <p className="text-gray-300 max-w-md">{features[6].description}</p>
                </div>
              </div>
            </GlowingCard>
          </motion.div> */}

          {/* Card 8 - Mobile First (Full width on large screens) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-4 lg:col-span-12"
          >
            <GlowingCard className="h-full p-10 border border-amber-300/20">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center lg:text-left">
                  <div className="p-5 rounded-2xl bg-linear-to-br from-amber-300/20 to-orange-600/10 w-fit mb-6 border border-amber-300/20">
                    {features[7].icon}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
                    {features[7].title}
                  </h3>
                  <p className="text-md text-gray-300 max-w-2xl">
                    {features[7].description}
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-amber-300/20 rounded-3xl p-8 shadow-2xl">
                    <Smartphone className="h-32 w-32 text-accent mx-auto" />
                  </div>
                </div>
              </div>
            </GlowingCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
