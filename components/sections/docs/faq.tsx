"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Zap, Shield, CreditCard, Code, Users } from "lucide-react";

const faqCategories = [
  {
    id: "general",
    title: "General",
    icon: <HelpCircle className="h-5 w-5" />,
    color: "#eabe7b",
    questions: [
      {
        question: "What is Tourify?",
        answer:
          "Tourify is a modern user onboarding platform that helps SaaS companies create beautiful, interactive product tours without writing code. It increases user engagement by up to 300% with seamless integration and powerful analytics.",
      },
      {
        question: "How does Tourify work?",
        answer:
          "You create tours using our visual builder, embed a single line of JavaScript on your site, and Tourify automatically guides users through your product. We provide analytics to track engagement and optimize your tours.",
      },
      {
        question: "Is Tourify suitable for non-technical users?",
        answer:
          "Absolutely! Our visual builder requires no coding skills. Technical users can also use our API and SDKs for advanced customizations.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical",
    icon: <Code className="h-5 w-5" />,
    color: "oklch(0.85 0.18 75)",
    questions: [
      {
        question: "What's the performance impact?",
        answer:
          "Tourify loads in under 50ms and is only 15KB gzipped. We use code splitting, lazy loading, and efficient animations to ensure zero impact on your site performance.",
      },
      {
        question: "Does it work with React/Vue/Angular?",
        answer:
          "Yes! We provide official SDKs for React, Vue, Angular, and vanilla JavaScript. All packages are tree-shakeable and SSR compatible.",
      },
      {
        question: "Can I customize the design?",
        answer:
          "Complete control over colors, fonts, animations, and positioning. You can match your brand exactly or use our pre-built themes.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & Plans",
    icon: <CreditCard className="h-5 w-5" />,
    color: "oklch(0.9 0.18 80)",
    questions: [
      {
        question: "Is there a free trial?",
        answer:
          "Yes! 14-day free trial with all features included. No credit card required.",
      },
      {
        question: "What happens after the trial?",
        answer:
          "Choose from our Starter, Pro, or Enterprise plans. You can downgrade, upgrade, or cancel anytime.",
      },
      {
        question: "Do you offer discounts for startups?",
        answer:
          "Yes, we offer special pricing for early-stage startups. Contact our sales team for details.",
      },
    ],
  },
  {
    id: "security",
    title: "Security & Compliance",
    icon: <Shield className="h-5 w-5" />,
    color: "oklch(0.8 0.15 85)",
    questions: [
      {
        question: "Is Tourify GDPR compliant?",
        answer:
          "Yes, we're fully GDPR compliant with data processing agreements available. We never sell your data.",
      },
      {
        question: "Where is my data stored?",
        answer:
          "Data is stored in SOC2 compliant data centers with encryption at rest and in transit.",
      },
      {
        question: "Do you perform security audits?",
        answer:
          "Regular third-party security audits and penetration testing. We also have a bug bounty program.",
      },
    ],
  },
];

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("general");

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black" />

      <div className="container mx-auto px-4 relative z-10">
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
            <HelpCircle className="h-3 w-3 mr-2" />
            Frequently Asked Questions
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find Answers <span className="gradient-text">Quickly</span>
          </h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            Everything you need to know about Tourify. Cant find an answer?
            Contact our team.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {faqCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all ${
                  activeCategory === category.id
                    ? "text-black"
                    : "opacity-70 hover:opacity-100"
                }`}
                style={
                  activeCategory === category.id
                    ? { background: category.color }
                    : {
                        background: "oklch(0.1 0 0)",
                        border: "1px solid oklch(1 0 0 / 0.1)",
                      }
                }
              >
                {category.icon}
                <span className="font-medium">{category.title}</span>
              </motion.button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqCategories
                  .find((cat) => cat.id === activeCategory)
                  ?.questions.map((item, index) => (
                    <motion.div
                      key={item.question}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <AccordionItem
                        value={`item-${index}`}
                        className="glass-effect rounded-xl border-0 overflow-hidden"
                        style={{ borderColor: "oklch(0.8 0.2 70 / 0.1)" }}
                      >
                        <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-white/5 transition-colors">
                          <div className="flex items-start gap-4 text-left">
                            <div
                              className="p-2 rounded-lg shrink-0 mt-0.5"
                              style={{
                                background:
                                  faqCategories.find(
                                    (cat) => cat.id === activeCategory
                                  )?.color + "20",
                              }}
                            >
                              <div
                                style={{
                                  color: faqCategories.find(
                                    (cat) => cat.id === activeCategory
                                  )?.color,
                                }}
                              >
                                <Zap className="h-4 w-4" />
                              </div>
                            </div>
                            <span className="text-lg font-semibold">
                              {item.question}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-5 pt-2">
                          <div className="pl-12">
                            <div
                              className="h-px w-8 mb-4"
                              style={{
                                background: faqCategories.find(
                                  (cat) => cat.id === activeCategory
                                )?.color,
                              }}
                            />
                            <p className="opacity-80 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
              </Accordion>
            </motion.div>
          </AnimatePresence>

          {/* Still have questions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div
              className="glass-effect p-8 rounded-2xl max-w-2xl mx-auto"
              style={{ borderColor: "oklch(0.8 0.2 70 / 0.2)" }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="h-6 w-6" style={{ color: "#eabe7b" }} />
                <h3 className="text-2xl font-bold">Still have questions?</h3>
              </div>
              <p className="opacity-80 mb-6">
                Our support team is here to help you get started and answer any
                questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(to right, #eabe7b, oklch(0.85 0.18 75))",
                    color: "oklch(0 0 0)",
                  }}
                >
                  Contact Support
                </button>
                <button
                  className="px-6 py-3 rounded-lg font-medium border transition-all hover:bg-white/5"
                  style={{
                    borderColor: "oklch(0.8 0.2 70 / 0.3)",
                    color: "#eabe7b",
                  }}
                >
                  Join Community
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
