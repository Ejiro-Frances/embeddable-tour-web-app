"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  FileText,
  Download,
  Github,
  Globe,
  Users,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const resources = [
  {
    category: "Guides",
    icon: <BookOpen className="h-5 w-5" />,
    color: "#eabe7b",
    items: [
      {
        title: "Getting Started Guide",
        description: "Complete step-by-step guide to implement Tourify",
        link: "#",
        type: "Guide",
        length: "15 min read",
      },
      {
        title: "Best Practices for Onboarding",
        description: "Learn how top companies onboard users effectively",
        link: "#",
        type: "Article",
        length: "8 min read",
      },
      {
        title: "A/B Testing Your Tours",
        description: "How to test and optimize tour performance",
        link: "#",
        type: "Tutorial",
        length: "12 min read",
      },
    ],
  },
  {
    category: "Templates",
    icon: <FileText className="h-5 w-5" />,
    color: "oklch(0.85 0.18 75)",
    items: [
      {
        title: "SaaS Product Tour Template",
        description: "Complete template for onboarding SaaS users",
        link: "#",
        type: "Template",
        downloads: "2.4k",
      },
      {
        title: "E-commerce Store Tour",
        description: "Guide customers through your online store",
        link: "#",
        type: "Template",
        downloads: "1.8k",
      },
      {
        title: "Mobile App Walkthrough",
        description: "Optimized for mobile web applications",
        link: "#",
        type: "Template",
        downloads: "1.2k",
      },
    ],
  },
  {
    category: "Community",
    icon: <Users className="h-5 w-5" />,
    color: "oklch(0.9 0.18 80)",
    items: [
      {
        title: "Community Forum",
        description: "Ask questions and share experiences",
        link: "#",
        type: "Community",
        members: "5.2k",
      },
      {
        title: "Case Studies",
        description: "Real success stories from our customers",
        link: "#",
        type: "Case Study",
        companies: "24",
      },
      {
        title: "Monthly Webinars",
        description: "Live sessions with onboarding experts",
        link: "#",
        type: "Event",
        upcoming: "3",
      },
    ],
  },
  {
    category: "Tools",
    icon: <Download className="h-5 w-5" />,
    color: "oklch(0.8 0.15 85)",
    items: [
      {
        title: "Figma UI Kit",
        description: "Design system and components for Figma",
        link: "#",
        type: "Design Kit",
        version: "2.0",
      },
      {
        title: "CLI Tool",
        description: "Command line interface for developers",
        link: "#",
        type: "Tool",
        stars: "⭐ 324",
      },
      {
        title: "Chrome Extension",
        description: "Quick tour builder for any website",
        link: "#",
        type: "Extension",
        users: "1.5k",
      },
    ],
  },
];

export function ResourcesSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-sm font-medium"
            style={{
              background: "oklch(0.8 0.2 70 / 0.1)",
              borderColor: "oklch(0.8 0.2 70 / 0.2)",
              color: "#eabe7b",
            }}
          >
            <Globe className="h-3 w-3 mr-2" />
            Resources & Tools
          </Badge>
          <h2 className="text-4xl md:text-4xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            Templates, guides, and tools to help you build amazing onboarding
            experiences
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto" id="resources">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {resources.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm hover:from-white/10 hover:to-white/5 transition-all duration-300">
                  <CardContent className="p-0">
                    {/* Category Header */}
                    <div className="p-6 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2 rounded-lg"
                          style={{ background: `${category.color}20` }}
                        >
                          <div style={{ color: category.color }}>
                            {category.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">
                            {category.category}
                          </h3>
                          <p className="text-sm opacity-60">
                            {category.items.length} resources available
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Resource Items */}
                    <div className="p-6 space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <motion.a
                          key={item.title}
                          href={item.link}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: itemIndex * 0.05,
                          }}
                          viewport={{ once: true }}
                          whileHover={{ x: 5 }}
                          className="block p-4 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold group-hover:text-amber-400 transition-colors">
                                  {item.title}
                                </h4>
                                <Badge
                                  variant="secondary"
                                  className="text-xs font-normal"
                                  style={{
                                    background: `${category.color}15`,
                                    color: category.color,
                                  }}
                                >
                                  {item.type}
                                </Badge>
                              </div>
                              <p className="text-sm opacity-70 mb-3">
                                {item.description}
                              </p>

                              {/* Stats */}
                              <div className="flex items-center gap-4 text-xs opacity-60">
                                {"length" in item && (
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="h-3 w-3" />
                                    {item.length}
                                  </span>
                                )}
                                {"downloads" in item && (
                                  <span className="flex items-center gap-1">
                                    <Download className="h-3 w-3" />
                                    {item.downloads} downloads
                                  </span>
                                )}
                                {"members" in item && (
                                  <span className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {item.members} members
                                  </span>
                                )}
                                {"stars" in item && (
                                  <span className="flex items-center gap-1">
                                    <Github className="h-3 w-3" />
                                    {item.stars}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Arrow indicator */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <div
                                className="w-6 h-6 rounded-full flex items-center justify-center"
                                style={{ background: `${category.color}20` }}
                              >
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  style={{ color: category.color }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div
              className="glass-effect p-8 rounded-2xl text-center"
              style={{ borderColor: "oklch(0.8 0.2 70 / 0.2)" }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Github className="h-8 w-8" style={{ color: "#eabe7b" }} />
                <h3 className="text-2xl font-bold">
                  Open Source Contributions
                </h3>
              </div>
              <p className="opacity-80 mb-6 max-w-2xl mx-auto">
                Tourify is built with open source technologies. Contribute to
                our projects or use our open source tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(to right, #eabe7b, oklch(0.85 0.18 75))",
                    color: "oklch(0 0 0)",
                  }}
                >
                  <Link
                    href="https://github.com/leothatguy/embeddable-tour-web-app"
                    className="flex gap-2 items-center"
                  >
                    <Github className="h-5 w-5" />
                    View GitHub
                  </Link>
                </button>
                <button
                  className="px-6 py-3 rounded-lg font-medium border flex items-center justify-center gap-2 transition-all hover:bg-white/5"
                  style={{
                    borderColor: "oklch(0.8 0.2 70 / 0.3)",
                    color: "#eabe7b",
                  }}
                >
                  <Link href="/contact" className="flex gap-2 items-center">
                    <TrendingUp className="h-5 w-5" />
                    Contact Us
                  </Link>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
