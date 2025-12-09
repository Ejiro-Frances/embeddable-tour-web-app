import React from "react";
import { motion } from "framer-motion";

interface AnimatedGradientTextProps {
  text: string;
  className?: string;
}

export function AnimatedGradientText({
  text,
  className = "",
}: AnimatedGradientTextProps) {
  return (
    <div className="relative inline-block">
      <motion.span
        className={`bg-gradient-to-r to-[#eabe7b] via-[#dd9222] from-[#c7841f] bg-clip-text text-transparent ${className}`}
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}
