"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: ReactNode;
  subtitle?: string;
  badgeText?: string;
  badgeIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function HeroSection({
  title,
  subtitle,
  badgeText,
  badgeIcon,
  children,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative min-h-[60vh] flex items-center justify-center overflow-hidden py-20",
        className
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Badge */}
          {badgeText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-300/20 accent-bg/10 mb-8"
            >
              {badgeIcon}
              <span className="text-sm font-medium accent-text">
                {badgeText}
              </span>
            </motion.div>
          )}

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {children}
        </motion.div>
      </div>
    </section>
  );
}
