"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  xAnimation: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function ParticleBackground() {
  // Generate particles once during initial render
  const [particles] = useState<Particle[]>(() => 
    Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 5,
      xAnimation: Math.random() * 15 - 7.5,
    }))
  );

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, oklch(0.8 0.2 70 / 0.3), oklch(0.85 0.18 75 / 0.1))`,
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
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, 
            oklch(0 0 0) 0%,
            oklch(0 0 0 / 0) 30%,
            oklch(0 0 0 / 0) 70%,
            oklch(0 0 0) 100%
          )`,
        }}
      />
    </div>
  );
}