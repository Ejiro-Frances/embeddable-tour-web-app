"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Settings, Zap, Palette, Eye, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const apiEndpoints = [
  {
    method: "POST",
    endpoint: "/api/tours",
    title: "Create Tour",
    description: "Create a new onboarding tour",
    color: "#eabe7b",
  },
  {
    method: "GET",
    endpoint: "/api/tours/{id}",
    title: "Get Tour",
    description: "Retrieve tour details and steps",
    color: "oklch(0.85 0.18 75)",
  },
  {
    method: "PUT",
    endpoint: "/api/tours/{id}",
    title: "Update Tour",
    description: "Update tour configuration",
    color: "oklch(0.9 0.18 80)",
  },
  {
    method: "DELETE",
    endpoint: "/api/tours/{id}",
    title: "Delete Tour",
    description: "Remove a tour permanently",
    color: "oklch(0.8 0.15 85)",
  },
  {
    method: "POST",
    endpoint: "/api/analytics",
    title: "Track Event",
    description: "Send analytics data",
    color: "oklch(0.85 0.15 90)",
  },
  {
    method: "GET",
    endpoint: "/api/users/{id}/tours",
    title: "User Tours",
    description: "Get tours for specific user",
    color: "oklch(0.9 0.15 95)",
  },
];

const configurationOptions = [
  {
    icon: <Palette className="h-5 w-5" />,
    title: "Theme Configuration",
    properties: [
      {
        name: "primaryColor",
        type: "string",
        default: "#f59e0b",
        description: "Primary brand color",
      },
      {
        name: "backgroundColor",
        type: "string",
        default: "#0a0a0a",
        description: "Background color",
      },
      {
        name: "textColor",
        type: "string",
        default: "#ffffff",
        description: "Text color",
      },
      {
        name: "borderRadius",
        type: "number",
        default: "8",
        description: "Border radius in pixels",
      },
    ],
  },
  {
    icon: <Settings className="h-5 w-5" />,
    title: "Behavior Options",
    properties: [
      {
        name: "autoStart",
        type: "boolean",
        default: "false",
        description: "Start tour automatically",
      },
      {
        name: "showProgress",
        type: "boolean",
        default: "true",
        description: "Show progress bar",
      },
      {
        name: "allowSkip",
        type: "boolean",
        default: "true",
        description: "Allow users to skip tour",
      },
      {
        name: "closeOnClickOutside",
        type: "boolean",
        default: "true",
        description: "Close on outside click",
      },
    ],
  },
  {
    icon: <Eye className="h-5 w-5" />,
    title: "Display Options",
    properties: [
      {
        name: "position",
        type: "string",
        default: "auto",
        description: "Tooltip position",
      },
      {
        name: "offset",
        type: "number",
        default: "10",
        description: "Offset from target element",
      },
      {
        name: "zIndex",
        type: "number",
        default: "9999",
        description: "Z-index of tour elements",
      },
      {
        name: "animationDuration",
        type: "number",
        default: "300",
        description: "Animation duration in ms",
      },
    ],
  },
];

export function APISection() {
  const [activeTab, setActiveTab] = useState("endpoints");

  return (
    <section id="api-reference" className="py-24 relative">
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
            <Code className="h-4 w-4" style={{ color: "#eabe7b" }} />
            <span className="text-sm font-medium" style={{ color: "#eabe7b" }}>
              API Reference
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Complete <span className="gradient-text">API Documentation</span>
          </h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            Everything you need to integrate and customize Tourify
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="glass-effect mb-8">
              <TabsTrigger
                value="endpoints"
                className="data-[state=active]:text-black"
              >
                API Endpoints
              </TabsTrigger>
              <TabsTrigger
                value="configuration"
                className="data-[state=active]:text-black"
              >
                Configuration
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className="data-[state=active]:text-black"
              >
                Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="endpoints">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {apiEndpoints.map((endpoint, index) => (
                  <motion.div
                    key={endpoint.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="glass-effect p-6 rounded-2xl"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              endpoint.method === "GET"
                                ? "bg-green-500/20 text-green-400"
                                : endpoint.method === "POST"
                                ? "bg-blue-500/20 text-blue-400"
                                : endpoint.method === "PUT"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {endpoint.method}
                          </span>
                          <code className="text-sm opacity-80">
                            {endpoint.endpoint}
                          </code>
                        </div>
                        <h3 className="text-xl font-bold">{endpoint.title}</h3>
                        <p className="text-sm opacity-70 mt-1">
                          {endpoint.description}
                        </p>
                      </div>
                      <div
                        className="p-2 rounded-lg"
                        style={{ background: `${endpoint.color}20` }}
                      >
                        <Zap
                          className="h-5 w-5"
                          style={{ color: endpoint.color }}
                        />
                      </div>
                    </div>

                    {/* Example request */}
                    <div
                      className="mt-4 p-4 rounded-lg"
                      style={{ background: "oklch(0.05 0 0 / 0.5)" }}
                    >
                      <div className="text-sm opacity-70 mb-2">
                        Example Request
                      </div>
                      <code className="text-sm">
                        {`fetch('https://api.tourify.com${endpoint.endpoint}', {
  method: '${endpoint.method}',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})`}
                      </code>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="configuration">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {configurationOptions.map((config, index) => (
                  <motion.div
                    key={config.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="glass-effect p-6 rounded-2xl"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="p-2 rounded-lg"
                        style={{ background: "oklch(0.8 0.2 70 / 0.1)" }}
                      >
                        <div style={{ color: "#eabe7b" }}>{config.icon}</div>
                      </div>
                      <h3 className="text-lg font-bold">{config.title}</h3>
                    </div>

                    <div className="space-y-3">
                      {config.properties.map((prop) => (
                        <div
                          key={prop.name}
                          className="pb-3 border-b border-white/10 last:border-0"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <code className="text-sm font-medium">
                              {prop.name}
                            </code>
                            <span
                              className="text-xs px-2 py-1 rounded"
                              style={{
                                background: "oklch(0.8 0.2 70 / 0.1)",
                                color: "#eabe7b",
                              }}
                            >
                              {prop.type}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm opacity-70">
                            <span>Default: {prop.default}</span>
                            <span>{prop.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-effect p-8 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare
                    className="h-6 w-6"
                    style={{ color: "#eabe7b" }}
                  />
                  <h3 className="text-2xl font-bold">Event System</h3>
                </div>

                <p className="opacity-80 mb-8">
                  Tourify provides a comprehensive event system for tracking
                  user interactions and customizing tour behavior.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      event: "onStart",
                      description: "Triggered when tour starts",
                      parameters: ["tourId", "userId"],
                    },
                    {
                      event: "onComplete",
                      description: "Triggered when tour completes",
                      parameters: ["tourId", "userId", "duration"],
                    },
                    {
                      event: "onStepChange",
                      description: "Triggered when moving between steps",
                      parameters: ["tourId", "stepId", "direction"],
                    },
                    {
                      event: "onSkip",
                      description: "Triggered when user skips tour",
                      parameters: ["tourId", "userId", "stepId"],
                    },
                  ].map((event) => (
                    <div
                      key={event.event}
                      className="p-4 rounded-lg"
                      style={{ background: "oklch(0.05 0 0 / 0.5)" }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <code className="font-bold text-amber-400">
                          {event.event}
                        </code>
                        <span className="text-xs px-2 py-1 rounded accent-bg/20 text-amber-400">
                          Event
                        </span>
                      </div>
                      <p className="text-sm opacity-70 mb-3">
                        {event.description}
                      </p>
                      <div className="text-xs">
                        <span className="opacity-60">Parameters: </span>
                        {event.parameters.map((param, i) => (
                          <span key={param} className="mx-1">
                            <code className="text-amber-300">{param}</code>
                            {i < event.parameters.length - 1 && ","}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
