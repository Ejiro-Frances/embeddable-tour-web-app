"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sections } from "@/lib/terms-data";

export function TermsContent() {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "agreement",
  ]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <section id="terms-pdf-content" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Terms of Service <span className="gradient-text">Details</span>
          </h2>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            Comprehensive legal agreement for using Tourify&#39;s services
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Important Notice */}
          <div className="mb-12">
            <div
              className="glass-effect p-6 rounded-2xl"
              style={{
                background: "oklch(0.8 0.2 70 / 0.05)",
                borderColor: "oklch(0.8 0.2 70 / 0.2)",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg mt-0.5"
                  style={{
                    background: "oklch(0.8 0.2 70 / 0.1)",
                  }}
                >
                  <svg
                    className="h-5 w-5"
                    style={{ color: "#eabe7b" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.698-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Important Legal Notice
                  </h3>
                  <p className="opacity-80">
                    This is a legally binding agreement. These Terms govern your
                    use of Tourify&#39;s services. By using our Service, you
                    agree to these terms. We recommend consulting with legal
                    counsel if you have questions about these Terms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div
                  className="glass-effect rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-amber-300/30"
                  style={{ borderColor: "oklch(0.8 0.2 70 / 0.1)" }}
                  onClick={() => toggleSection(section.id)}
                >
                  {/* Section Header */}
                  <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
                        style={{
                          background: "oklch(0.8 0.2 70 / 0.1)",
                          color: "#eabe7b",
                        }}
                      >
                        {section.title.split(".")[0]}
                      </div>
                      <h3 className="text-xl font-semibold">{section.title}</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      style={{ color: "#eabe7b" }}
                    >
                      {expandedSections.includes(section.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Section Content */}
                  {expandedSections.includes(section.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 pt-4"
                    >
                      <div
                        className="prose prose-invert max-w-none"
                        
                      >
                        <div className="whitespace-pre-line text-opacity-90">
                          {section.content.split("\n").map((paragraph, i) => {
                            if (paragraph.startsWith("### ")) {
                              return (
                                <h4
                                  key={i}
                                  className="text-lg font-semibold mt-6 mb-3 text-accent-text"
                                >
                                  {paragraph.substring(4)}
                                </h4>
                              );
                            } else if (paragraph.startsWith("- **")) {
                              const match =
                                paragraph.match(/\*\*(.*?)\*\*: (.*)/);
                              if (match) {
                                return (
                                  <div key={i} className="flex gap-2 mt-2">
                                    <div
                                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                                      style={{
                                        background: "#eabe7b",
                                      }}
                                    />
                                    <div>
                                      <strong>{match[1]}</strong>: {match[2]}
                                    </div>
                                  </div>
                                );
                              }
                            } else if (paragraph.startsWith("**")) {
                              const text = paragraph.replace(/\*\*/g, "");
                              return (
                                <div
                                  key={i}
                                  className="my-3 p-4 rounded-lg"
                                  style={{
                                    background: "oklch(0.1 0 0)",
                                    borderLeft: "4px solid #eabe7b",
                                  }}
                                >
                                  <strong className="block mb-1">{text}</strong>
                                </div>
                              );
                            }
                            return (
                              <p key={i} className="mt-3 leading-relaxed">
                                {paragraph}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Acceptance Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div
              className="glass-effect p-8 rounded-2xl text-center"
              style={{ borderColor: "oklch(0.8 0.2 70 / 0.2)" }}
            >
              <h3 className="text-xl font-bold mb-4">Acceptance of Terms</h3>
              <p className="opacity-80 mb-6">
                By using Tourify&#39;s services, you acknowledge that you have
                read, understood, and agree to be bound by these Terms of
                Service.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm opacity-70">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Last updated: December 8, 2025
                </span>
                <span>•</span>
                <span>Version: 3.1</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
