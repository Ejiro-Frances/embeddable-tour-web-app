"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FocusPointerWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function FocusPointerWrapper({
  children,
  className,
}: FocusPointerWrapperProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn("relative", className)}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        // Check if the new focus is still inside the wrapper
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsFocused(false);
        }
      }}
    >
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -left-9 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{ x: [0, -4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MousePointer2
                className="w-6 h-6 accent-text fill-amber-500/20 rotate-[135deg]"
                strokeWidth={2}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
