"use client";

import { motion } from "framer-motion";
import { Search, BookOpen, Zap, Code } from "lucide-react";
import { Input } from "@/components/ui/input";
import { HeroSection } from "../shared/hero-section";

export function DocsHero() {
  return (
    <div>
      <HeroSection
        title={
          <>
            Build With <span className="gradient-text">Confidence</span>
          </>
        }
        subtitle="Everything you need to integrate Tourify seamlessly into your application"
        badgeText="Documentation"
        badgeIcon={<BookOpen className="h-4 w-4" />}
      >
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              placeholder="Search documentation..."
              className="pl-12 py-6 text-lg rounded-full bg-white/5 border-white/10"
            />
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {[
            {
              icon: <Zap className="h-6 w-6" />,
              title: "Quick Start",
              description: "Get up and running in 5 minutes",
            },
            {
              icon: <Code className="h-6 w-6" />,
              title: "API Reference",
              description: "Complete API documentation",
            },
            {
              icon: <BookOpen className="h-6 w-6" />,
              title: "Guides",
              description: "Step-by-step tutorials",
            },
          ].map((link, index) => (
            <motion.a
              key={link.title}
              href={`#${link.title.toLowerCase().replace(" ", "-")}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl text-left group bg-white/5 border border-white/10 hover:border-amber-300/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg accent-bg/10 group-hover:accent-bg/20 transition-colors">
                  <div className="accent-text">{link.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {link.title}
                  </h3>
                  <p className="text-gray-400">{link.description}</p>
                </div>
              </div>
              <div className="h-0.5 rounded-full mt-4 bg-gradient-to-r from-transparent via-amber-500 to-transparent w-0 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </motion.div>
      </HeroSection>
    </div>
  );
}
