"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ParticleBackground } from "@/components/ui/particle-background";
import { FloatingElements } from "@/components/ui/floating-elements";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <FloatingElements />

      <div className="container mx-auto p-8 py-20 relative z-10">
        <div className="max-w-6xl mx-auto text-center py-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-amber-300/10 to-amber-400/10 border border-amber-300/20 mb-8"
          >
            <Sparkles className="h-4 w-4 accent-text" />
            <span className="text-sm font-medium accent-text">
              Voted #1 Onboarding Platform 2025
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-ivory">Transform User </span>
            <AnimatedGradientText text="Experience" />
            <br />
            <span className="text-ivory">With </span>
            <span className="relative">
              <span className="gradient-text">Smart Tours</span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-amber-300 via-amber-400 to-amber-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-ivory/80 mb-12 max-w-3xl mx-auto"
          >
            Create beautiful, interactive onboarding tours that increase user
            engagement by 300%. No coding required.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              className="group bg-linear-to-r from-[#eabe7b] to-[#dd9222] hover:from-[#e3a84f] hover:to-[#c7841f] text-black font-bold text-lg px-8 py-6"
            >
              <Link href="/signup" className="flex items-center">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer border-amber-300 accent-text hover:accent-bg/10 hover:text-amber-600 font-bold text-lg px-8 py-6"
            >
              <Zap className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: "10K+", label: "Happy Customers", icon: Sparkles },
              { value: "300%", label: "Engagement Boost", icon: TrendingUp },
              { value: "99.9%", label: "Uptime", icon: Zap },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="glass-effect p-6 rounded-2xl"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full accent-bg/10">
                    <stat.icon className="h-6 w-6 accent-text" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-300 mb-2">
                  {stat.value}
                </div>
                <div className="text-ivory/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <div className="text-ivory/50 text-sm mb-2">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-amber-300/50 rounded-full flex justify-center">
            <div className="w-1 h-3 accent-bg rounded-full mt-2" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
