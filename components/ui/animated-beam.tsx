"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBeamProps {
  className?: string;
}

export function AnimatedBeam({ className }: AnimatedBeamProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className={cn(
          "absolute h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent",
          className
        )}
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}