"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Terminal, Package, Settings, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const steps = [
  {
    title: "Installation",
    description: "Add Tourify to your project",
    icon: <Package className="h-6 w-6" />,
    code: `npm install @tourify/react
# or
yarn add @tourify/react
# or
pnpm add @tourify/react`,
    language: "bash",
  },
  {
    title: "Configuration",
    description: "Set up your tour configuration",
    icon: <Settings className="h-6 w-6" />,
    code: `import { TourProvider } from '@tourify/react';

function App() {
  return (
    <TourProvider
      apiKey="your-api-key"
      theme="dark"
      showProgress={true}
    >
      {/* Your app */}
    </TourProvider>
  );
}`,
    language: "jsx",
  },
  {
    title: "Add Steps",
    description: "Define your tour steps",
    icon: <Play className="h-6 w-6" />,
    code: `import { TourStep } from '@tourify/react';

function App() {
  return (
    <>
      <TourStep
        stepId="welcome"
        title="Welcome!"
        content="Let's explore the app together"
        target="#get-started"
      >
        <button id="get-started">
          Get Started
        </button>
      </TourStep>
      
      {/* More steps */}
    </>
  );
}`,
    language: "jsx",
  },
];

export function QuickStartSection() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedStep(index);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <section id="quick-start" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4"
            style={{
              background: "oklch(0.8 0.2 70 / 0.1)",
              borderColor: "oklch(0.8 0.2 70 / 0.2)",
            }}
          >
            <Terminal className="h-4 w-4" style={{ color: "#eabe7b" }} />
            <span className="text-sm font-medium" style={{ color: "#eabe7b" }}>
              Quick Start
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Started in <span className="gradient-text">3 Minutes</span>
          </h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            Follow these simple steps to integrate Tourify into your application
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step number */}
                <div
                  className="absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: "#eabe7b",
                    color: "oklch(0 0 0)",
                  }}
                >
                  {index + 1}
                </div>

                <div className="glass-effect p-6 rounded-2xl h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ background: "oklch(0.8 0.2 70 / 0.1)" }}
                    >
                      <div style={{ color: "#eabe7b" }}>{step.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-sm opacity-70">{step.description}</p>
                    </div>
                  </div>

                  {/* Code block */}
                  <div className="relative mt-4">
                    <div className="absolute -top-4 right-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(step.code, index)}
                        className="hover:bg-accent/20"
                        style={{ color: "#eabe7b" }}
                      >
                        {copiedStep === index ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    <SyntaxHighlighter
                      language={step.language}
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        background: "transparent",
                        fontSize: "0.875rem",
                      }}
                      showLineNumbers
                    >
                      {step.code}
                    </SyntaxHighlighter>
                    {/* <pre
                      className="p-4 rounded-lg overflow-auto text-sm"
                      style={{
                        background: "oklch(0.05 0 0 / 0.5)",
                        color:
                          step.language === "bash"
                            ? "oklch(0.85 0.18 75)"
                            : "oklch(0.9 0.15 95)",
                      }}
                    >
                      <code>{step.code}</code>
                    </pre> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div
              className="glass-effect p-8 rounded-2xl max-w-2xl mx-auto"
              style={{ borderColor: "oklch(0.8 0.2 70 / 0.2)" }}
            >
              <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
              <p className="opacity-80 mb-6">
                Our team is here to help you get started. Join our community or
                contact support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  style={{
                    background:
                      "linear-gradient(to right, #eabe7b, oklch(0.85 0.18 75))",
                  }}
                >
                  Join Discord Community
                </Button>
                <Button
                  variant="outline"
                  className="hover:bg-accent/10"
                  style={{
                    borderColor: "oklch(0.8 0.2 70 / 0.3)",
                    color: "#eabe7b",
                  }}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
