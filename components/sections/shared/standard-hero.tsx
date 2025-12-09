"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ParticleBackground } from "@/components/ui/particle-background";

interface StandardHeroProps {
  title: ReactNode;
  subtitle?: string;
  badgeText?: string;
  badgeIcon?: ReactNode;
  highlights?: Array<{
    icon: ReactNode;
    title: string;
    description: string;
  }>;
  additionalInfo?: ReactNode;
  className?: string;
}

export function StandardHero({
  title,
  subtitle,
  badgeText,
  badgeIcon,
  highlights,
  additionalInfo,
  className,
}: StandardHeroProps) {
  const colors = [
    "accent-text",
    "text-amber-400",
    "text-amber-300",
    "text-amber-600",
  ];

  return (
    <section
      className={cn(
        "relative min-h-[60vh] flex items-center justify-center overflow-hidden py-20",
        className
      )}
    >
      {/* Background elements */}
      <div className="absolute bg-gradient-to-br from-black via-gray-900 to-black" />
      <ParticleBackground count={15} />

      {/* Animated gradient lines */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px"
            style={{
              width: "100%",
              background: `linear-gradient(90deg, transparent, rgba(234, 190, 123, 0.2), transparent)`,
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Highlights Grid */}
          {highlights && highlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12"
            >
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-4 rounded-xl text-center bg-white/5 border border-white/10 hover:border-amber-300/30 transition-colors"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex p-3 rounded-lg mb-3 accent-bg/10"
                  >
                    <div
                      className={cn(
                        "accent-text",
                        colors[index % colors.length]
                      )}
                    >
                      {highlight.icon}
                    </div>
                  </motion.div>
                  <h3 className="font-semibold mb-1 text-white">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Additional Info */}
          {additionalInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {additionalInfo}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
