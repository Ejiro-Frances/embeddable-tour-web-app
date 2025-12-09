"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Copy,
  Check,
  Terminal,
  Code2,
  FileCode,
  Settings,
  Zap,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const codeSnippets = [
  {
    title: "Quick Installation",
    description: "Add Tourify to your website with a single script tag.",
    language: "html",
    code: `<!-- Add this to your HTML head -->
<script src="https://cdn.tourify.com/v1/tourify.min.js"></script>

<!-- Initialize with your tour ID -->
<script>
  Tourify.init({
    tourId: 'YOUR_TOUR_ID',
    apiKey: 'YOUR_API_KEY',
    theme: 'dark',
    autoStart: true
  });
</script>`,
  },
  {
    title: "Advanced Configuration",
    description: "Full configuration options for custom behavior.",
    language: "javascript",
    code: `const tour = new Tourify({
  tourId: 'welcome-tour',
  apiKey: 'your-api-key-here',
  
  // Customization
  theme: {
    primaryColor: '#f59e0b',
    backgroundColor: '#0a0a0a',
    textColor: '#ffffff'
  },
  
  // Behavior
  autoStart: false,
  showProgress: true,
  allowSkip: true,
  
  // Events
  onStart: () => console.log('Tour started'),
  onComplete: () => console.log('Tour completed'),
  onStepChange: (step) => console.log('Step changed:', step),
  
  // Localization
  locale: 'en',
  strings: {
    next: 'Continue',
    back: 'Go Back',
    skip: 'Skip Tour'
  }
});

tour.start();`,
  },
  {
    title: "React Integration",
    description: "Use our React component for seamless integration.",
    language: "jsx",
    code: `import { TourProvider, TourStep } from '@tourify/react';

function App() {
  return (
    <TourProvider
      tourId="welcome-tour"
      apiKey="your-api-key"
    >
      <div className="app">
        <TourStep
          stepId="welcome"
          title="Welcome to Our App"
          content="Let's take a quick tour of the main features"
          target="#welcome-button"
        >
          <button id="welcome-button">
            Get Started
          </button>
        </TourStep>
        
        {/* Your app content */}
      </div>
    </TourProvider>
  );
}`,
  },
];

export function DocumentationSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="docs" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full accent-bg/10 border border-amber-300/20 mb-4">
            <span className="text-sm font-medium accent-text">
              Documentation
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Easy Integration,{" "}
            <span className="gradient-text">Powerful Results</span>
          </h2>
          <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
            Get started in minutes with our comprehensive documentation and code
            examples.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {codeSnippets.map((snippet, index) => (
              <Button
                key={snippet.title}
                variant={activeTab === index ? "default" : "outline"}
                onClick={() => setActiveTab(index)}
                className={`rounded-full px-6 py-3 ${
                  activeTab === index
                    ? "bg-linear-to-r amber-500 to-amber-400 text-black"
                    : "border-amber-300/30 accent-text hover:accent-bg/10"
                }`}
              >
                <FileCode className="h-4 w-4 mr-2" />
                {snippet.title}
              </Button>
            ))}
          </div>

          {/* Code Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Card className="bg-gray-900/50 border border-amber-300/20 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-amber-300/20">
                  <div className="flex items-center gap-3">
                    <Terminal className="h-5 w-5 accent-text" />
                    <div>
                      <h3 className="font-semibold text-ivory">
                        {codeSnippets[activeTab].title}
                      </h3>
                      <p className="text-sm text-ivory/60">
                        {codeSnippets[activeTab].description}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      copyToClipboard(codeSnippets[activeTab].code)
                    }
                    className="accent-text hover:bg-accent/20"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <CardContent className="p-0">
                  <SyntaxHighlighter
                    language={codeSnippets[activeTab].language}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: "1.5rem",
                      background: "transparent",
                      fontSize: "0.875rem",
                    }}
                    showLineNumbers
                  >
                    {codeSnippets[activeTab].code}
                  </SyntaxHighlighter>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Lightweight",
                description: "Only 15KB gzipped, zero dependencies",
              },
              {
                icon: <Settings className="h-6 w-6" />,
                title: "Fully Customizable",
                description: "Complete control over look and feel",
              },
              {
                icon: <Code2 className="h-6 w-6" />,
                title: "TypeScript Ready",
                description: "Full TypeScript support with declarations",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect p-6 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg accent-bg/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-ivory">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-ivory/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
