"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function GlowingCard({
  children,
  className,
  delay = 0,
}: GlowingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={cn(
        "relative group p-8 rounded-2xl border border-amber-300/20 bg-gray-800/50 backdrop-blur-sm",
        "hover:border-amber-300/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20",
        className
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-amber-300/10 via-transparent to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
