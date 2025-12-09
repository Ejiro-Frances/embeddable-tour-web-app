"use client";

import { motion } from "framer-motion";
import {
  Scale,
  FileText,
  CheckCircle,
  Shield,
  Users,
  Clock,
} from "lucide-react";

export function TermsHero() {
  const highlights = [
    {
      icon: <Scale className="h-5 w-5" />,
      title: "Clear Terms",
      description: "Simple, understandable language",
      color: "#eabe7b",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Fair Use",
      description: "Reasonable terms for everyone",
      color: "#eabe7b",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Protection",
      description: "Your rights protected",
      color: "#eabe7b",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Always Updated",
      description: "Regular policy reviews",
      color: "#eabe7b",
    },
  ];

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-amber-900/5 via-black to-amber-900/10" />
        {/* Animated lines */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px"
            style={{
              width: "100%",
              background: `linear-gradient(90deg, transparent, oklch(0.8 0.2 70 / 0.2), transparent)`,
              top: `${20 + i * 30}%`,
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 10 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
            style={{
              background: "oklch(0.8 0.2 70 / 0.1)",
              borderColor: "oklch(0.8 0.2 70 / 0.2)",
            }}
          >
            <FileText className="h-4 w-4" style={{ color: "#eabe7b" }} />
            <span className="text-sm font-medium" style={{ color: "#eabe7b" }}>
              Terms of Service
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Clear Terms for
            <br />
            <span className="gradient-text">Great Partnership</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl opacity-80 mb-12 max-w-3xl mx-auto"
          >
            Understand our agreement for using Tourify&#39;s services and
            building better user experiences together.
          </motion.p>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-8"
            style={{
              background: "oklch(0.1 0 0)",
              border: "1px solid oklch(1 0 0 / 0.1)",
            }}
          >
            <Clock className="h-4 w-4 opacity-60" />
            <span className="text-sm">Effective: December 8, 2025</span>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-4 rounded-xl text-center"
                style={{
                  background: "oklch(0.1 0 0)",
                  border: "1px solid oklch(1 0 0 / 0.1)",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex p-3 rounded-lg mb-3"
                  style={{ background: `${highlight.color}20` }}
                >
                  <div style={{ color: highlight.color }}>{highlight.icon}</div>
                </motion.div>
                <h3 className="font-semibold mb-1">{highlight.title}</h3>
                <p className="text-sm opacity-70">{highlight.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 p-4 rounded-lg max-w-2xl mx-auto"
            style={{
              background: "oklch(0.8 0.2 70 / 0.1)",
              border: "1px solid oklch(0.8 0.2 70 / 0.2)",
            }}
          >
            <div className="flex items-center gap-3">
              <CheckCircle
                className="h-5 w-5 shrink-0"
                style={{ color: "#eabe7b" }}
              />
              <p className="text-sm">
                By using Tourify, you agree to these terms. We recommend
                reviewing them carefully.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
