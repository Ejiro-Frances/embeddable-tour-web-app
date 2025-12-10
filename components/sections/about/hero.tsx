"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Globe, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import Link from "next/link";

function generateFloatingOrbs(count = 8) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 400 + 100,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 10 + 10,
  }));
}

export function HeroSection() {
  const orbs = useMemo(() => generateFloatingOrbs(8), []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-10">
      <div className="absolute inset-0 bg-linear-to-br from-amber-900/10 via-black to-amber-900/5" />

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
            <Users className="h-4 w-4" style={{ color: "#eabe7b" }} />
            <span className="text-sm font-medium" style={{ color: "#eabe7b" }}>
              Our Story
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="gradient-text">Redefining</span>
            <br />
            <span className="text-ivory">User Onboarding</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl opacity-80 mb-12 max-w-3xl mx-auto"
          >
            We believe every user deserves a magical first experience. Tourify
            was born from a simple idea: make onboarding delightful, effective,
            and accessible to everyone.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12"
          >
            {[
              { value: "10K+", label: "Happy Customers", icon: Users },
              { value: "50+", label: "Countries", icon: Globe },
              { value: "300%", label: "Avg. Engagement Boost", icon: Rocket },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="glass-effect p-6 rounded-2xl backdrop-blur-md border border-white/5"
              >
                <div className="flex items-center justify-center mb-4">
                  <div
                    className="p-3 rounded-full"
                    style={{ background: "oklch(0.8 0.2 70 / 0.1)" }}
                  >
                    <stat.icon
                      className="h-6 w-6"
                      style={{ color: "#eabe7b" }}
                    />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-300 mb-2">
                  {stat.value}
                </div>
                <div className="opacity-70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="group text-lg px-8 py-6 font-medium hover:scale-105 transition-transform"
              style={{
                background:
                  "linear-gradient(to right, #eabe7b, oklch(0.85 0.18 75))",
                boxShadow: "0 10px 30px -10px oklch(0.8 0.2 70 / 0.4)",
              }}
            >
              <Link href="/signup" className="flex items-center">
              
              Join Our Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Orbs — 100% Pure & Stable */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {orbs.map((orb) => (
          <motion.div
            key={orb.id}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              background: `radial-gradient(circle at 30% 30%, oklch(0.8 0.2 70 / 0.08), transparent 70%)`,
              left: `${orb.left}%`,
              top: `${orb.top}%`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.15, 0.4, 0.15],
              x: [0, 30, -30, 0],
              y: [0, -40, 40, 0],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
}
