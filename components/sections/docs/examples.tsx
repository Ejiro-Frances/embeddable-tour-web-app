"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Check,
  ExternalLink,
  Play,
  Code2,
  Smartphone,
  Globe,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const examples = [
  {
    id: "ecommerce",
    title: "E-commerce Onboarding",
    description: "Guide users through your store with product discovery tours",
    icon: <Globe className="h-5 w-5" />,
    color: "#eabe7b",
    code: `// E-commerce product tour
const tour = new Tourify({
  steps: [
    {
      id: 'welcome',
      title: 'Welcome to Our Store!',
      content: 'Discover amazing products with our guided tour',
      target: '.hero-section',
      position: 'bottom'
    },
    {
      id: 'categories',
      title: 'Browse Categories',
      content: 'Explore products by category',
      target: '.category-nav',
      position: 'right'
    },
    {
      id: 'search',
      title: 'Smart Search',
      content: 'Find exactly what you need',
      target: '.search-bar',
      position: 'bottom'
    },
    {
      id: 'cart',
      title: 'Easy Checkout',
      content: 'Add items and checkout in seconds',
      target: '.cart-button',
      position: 'left'
    }
  ],
  theme: {
    primaryColor: '#f59e0b',
    backgroundColor: '#1a1a1a'
  }
});`,
    image: "/examples/ecommerce.png",
  },
  {
    id: "saas",
    title: "SaaS Product Tour",
    description: "Onboard users to complex SaaS applications",
    icon: <Zap className="h-5 w-5" />,
    color: "#eabe7b",
    code: `// SaaS application onboarding
const saasTour = {
  steps: [
    {
      id: 'dashboard',
      title: 'Welcome to Your Dashboard',
      content: 'Everything you need in one place',
      target: '#main-dashboard',
      position: 'center',
      action: () => console.log('Dashboard viewed')
    },
    {
      id: 'analytics',
      title: 'Real-time Analytics',
      content: 'Track your performance metrics',
      target: '.analytics-widget',
      position: 'right',
      action: () => loadAnalytics()
    },
    {
      id: 'team',
      title: 'Team Collaboration',
      content: 'Invite team members and collaborate',
      target: '.team-section',
      position: 'left',
      action: () => showTeamModal()
    },
    {
      id: 'settings',
      title: 'Customize Settings',
      content: 'Tailor the app to your needs',
      target: '.settings-menu',
      position: 'top',
      action: () => openSettings()
    }
  ],
  onComplete: () => trackTourCompletion('saas-onboarding')
};`,
    image: "/examples/saas.png",
  },
  {
    id: "mobile",
    title: "Mobile App Tour",
    description: "Native-like onboarding for mobile web apps",
    icon: <Smartphone className="h-5 w-5" />,
    color: "#eabe7b",
    code: `// Mobile-optimized tour
const mobileTour = {
  steps: [
    {
      id: 'welcome-mobile',
      title: 'Welcome! 👋',
      content: 'Swipe to learn about our app features',
      target: 'body',
      position: 'center',
      mobile: true
    },
    {
      id: 'navigation',
      title: 'Easy Navigation',
      content: 'Tap the menu to explore',
      target: '.mobile-nav',
      position: 'bottom',
      mobile: true,
      arrow: false
    },
    {
      id: 'actions',
      title: 'Quick Actions',
      content: 'Perform actions with single taps',
      target: '.action-buttons',
      position: 'top',
      mobile: true
    }
  ],
  mobileConfig: {
    tapOutsideToClose: true,
    showBackdrop: true,
    borderRadius: '16px'
  }
};`,
    image: "/examples/mobile.png",
  },
];

const frameworks = [
  {
    name: "React",
    icon: "⚛️",
    color: "oklch(0.6 0.2 220)",
    description: "Full React component library with hooks",
    code: `import { TourProvider, useTour } from '@tourify/react';

function App() {
  const { start, next, previous } = useTour();
  
  return (
    <TourProvider steps={steps}>
      <button onClick={start}>Start Tour</button>
    </TourProvider>
  );
}`,
  },
  {
    name: "Vue",
    icon: "🖖",
    color: "oklch(0.7 0.15 150)",
    description: "Vue 3 composition API support",
    code: `<template>
  <TourProvider :steps="steps">
    <button @click="startTour">Start Tour</button>
  </TourProvider>
</template>

<script setup>
import { useTour } from '@tourify/vue';
const { startTour } = useTour();
</script>`,
  },
  {
    name: "Angular",
    icon: "🅰️",
    color: "oklch(0.8 0.25 25)",
    description: "Angular service with dependency injection",
    code: `@Component({
  selector: 'app-root',
  template: \`
    <button (click)="startTour()">Start Tour</button>
  \`
})
export class AppComponent {
  constructor(private tourService: TourService) {}
  
  startTour() {
    this.tourService.start(steps);
  }
}`,
  },
  {
    name: "Vanilla JS",
    icon: "⚡",
    color: "#eabe7b",
    description: "Plain JavaScript for any framework",
    code: `// Simple vanilla JS integration
const tour = new Tourify({
  steps: [
    { target: '#feature-1', title: 'Feature 1' },
    { target: '#feature-2', title: 'Feature 2' }
  ]
});

// Start tour automatically
tour.start();`,
  },
];

export function ExamplesSection() {
  const [copiedExample, setCopiedExample] = useState<string | null>(null);
  const [activeExample, setActiveExample] = useState(0);
  const [activeFramework, setActiveFramework] = useState(0);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedExample(id);
    setTimeout(() => setCopiedExample(null), 2000);
  };

  return (
    <section id="examples" className="py-24 relative">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-amber-300/10 to-amber-400/10 border border-amber-300/20 mb-8"
            style={{
              // background: "oklch(0.8 0.2 70 / 0.1)",
              borderColor: "oklch(0.8 0.2 70 / 0.2)",
              color: "#eabe7b",
            }}
          >
            <Play className="h-3 w-3 mr-2" />
            Live Examples
          </Badge>
          <h2 className="text-4xl md:text-4xl font-bold mb-6">
            Real-World <span className="gradient-text">Implementations</span>
          </h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            See how top companies use Tourify to onboard millions of users
          </p>
        </motion.div>

        {/* Example Cards */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {examples.map((example, index) => (
              <motion.div
                key={example.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full overflow-hidden border-0 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm hover:from-white/10 hover:to-white/5 transition-all duration-300">
                  <CardContent className="p-0">
                    {/* Example Header */}
                    <div className="p-6 border-b border-white/10">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{ background: `${example.color}20` }}
                          >
                            <div style={{ color: example.color }}>
                              {example.icon}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">
                              {example.title}
                            </h3>
                            <p className="text-sm opacity-60">
                              {example.description}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-xs"
                          style={{ background: `${example.color}15` }}
                        >
                          Example
                        </Badge>
                      </div>
                    </div>

                    {/* Code Preview */}
                    <div className="p-6">
                      <div className="relative">
                        <div className="absolute top-3 right-3 z-10">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 opacity-70 hover:bg-accent/20"
                            onClick={() =>
                              copyToClipboard(example.code, example.id)
                            }
                            style={{ color: example.color }}
                          >
                            {copiedExample === example.id ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-linear-to-r from-amber-300/20 to-amber-400/20 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300" />
                          <pre
                            className="relative p-4 rounded-lg overflow-x-auto text-sm leading-relaxed"
                            style={{
                              background: "oklch(0.08 0 0)",
                              color: "oklch(0.9 0.05 100)",
                            }}
                          >
                            <code>{example.code}</code>
                          </pre>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="p-6 pt-0">
                      <Button
                        variant="outline"
                        className="w-full group/btn hover:bg-accent/20"
                        style={{
                          borderColor: `${example.color}40`,
                          color: example.color,
                        }}
                      >
                        <span>View Live Demo</span>
                        <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Framework Integration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Framework Integration</h3>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Works seamlessly with your favorite frontend framework
            </p>
          </div>

          <Tabs
            value={frameworks[activeFramework].name.toLowerCase()}
            onValueChange={(v) => {
              const index = frameworks.findIndex(
                (f) => f.name.toLowerCase() === v
              );
              setActiveFramework(index);
            }}
          >
            <TabsList className="glass-effect mb-8 justify-start overflow-x-auto">
              {frameworks.map((framework, index) => (
                <TabsTrigger
                  key={framework.name}
                  value={framework.name.toLowerCase()}
                  className="flex items-center gap-2 data-[state=active]:text-black"
                  onClick={() => setActiveFramework(index)}
                >
                  <span className="text-lg">{framework.icon}</span>
                  {framework.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFramework}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent
                  value={frameworks[activeFramework].name.toLowerCase()}
                  className="mt-0"
                >
                  <Card className="border-0 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">
                              {frameworks[activeFramework].icon}
                            </span>
                            <h4 className="text-2xl font-bold">
                              {frameworks[activeFramework].name}
                            </h4>
                          </div>
                          <p className="opacity-80">
                            {frameworks[activeFramework].description}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-sm"
                          style={{
                            background: `${frameworks[activeFramework].color}15`,
                            color: frameworks[activeFramework].color,
                          }}
                        >
                          Official Package
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-linear-to-r from-amber-300/20 to-amber-400/20 rounded-lg blur opacity-50" />
                          <pre
                            className="relative p-6 rounded-lg overflow-x-auto text-sm"
                            style={{
                              background: "oklch(0.08 0 0)",
                              color: "oklch(0.9 0.05 100)",
                            }}
                          >
                            <code>{frameworks[activeFramework].code}</code>
                          </pre>
                        </div>

                        <div className="space-y-4">
                          <div className="p-4 rounded-lg border border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap
                                className="h-4 w-4"
                                style={{
                                  color: frameworks[activeFramework].color,
                                }}
                              />
                              <span className="font-semibold">Features</span>
                            </div>
                            <ul className="space-y-2 text-sm opacity-80">
                              <li className="flex items-center gap-2">
                                <div
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{
                                    background:
                                      frameworks[activeFramework].color,
                                  }}
                                />
                                TypeScript support
                              </li>
                              <li className="flex items-center gap-2">
                                <div
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{
                                    background:
                                      frameworks[activeFramework].color,
                                  }}
                                />
                                Tree-shakeable
                              </li>
                              <li className="flex items-center gap-2">
                                <div
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{
                                    background:
                                      frameworks[activeFramework].color,
                                  }}
                                />
                                SSR compatible
                              </li>
                              <li className="flex items-center gap-2">
                                <div
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{
                                    background:
                                      frameworks[activeFramework].color,
                                  }}
                                />
                                Zero dependencies
                              </li>
                            </ul>
                          </div>

                          <div className="p-4 rounded-lg border border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                              <Code2
                                className="h-4 w-4"
                                style={{
                                  color: frameworks[activeFramework].color,
                                }}
                              />
                              <span className="font-semibold">
                                Installation
                              </span>
                            </div>
                            <code
                              className="block p-3 rounded text-sm"
                              style={{
                                background: "oklch(0.08 0 0)",
                                color: frameworks[activeFramework].color,
                              }}
                            >
                              npm install @tourify/
                              {frameworks[activeFramework].name.toLowerCase()}
                            </code>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
