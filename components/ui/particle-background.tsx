"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface ParticleBackgroundProps {
  count?: number;
  className?: string;
}

export function ParticleBackground({
  count = 30,
  className = "",
}: ParticleBackgroundProps) {
  // Generate particles using useMemo to avoid hydration issues
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: (i * 37) % 100, // Deterministic positioning
        y: (i * 23) % 100,
        size: (i % 3) + 1,
        duration: 15 + (i % 10),
        delay: i % 5,
        xAnimation: (i % 5) - 2,
      })),
    [count]
  );

  return (
    <div
      className={`fixed inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br to-amber-400/20 to-amber-400/10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, particle.xAnimation, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
