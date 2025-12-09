"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Zap, Users } from "lucide-react";

export function FloatingElements() {
  const elements = [
    {
      icon: <Code2 className="h-6 w-6" />,
      position: { top: "10%", left: "5%" },
      delay: 0,
    },
    {
      icon: <Palette className="h-6 w-6" />,
      position: { top: "20%", right: "10%" },
      delay: 0.5,
    },
    {
      icon: <Zap className="h-6 w-6" />,
      position: { bottom: "30%", left: "15%" },
      delay: 1,
    },
    {
      icon: <Users className="h-6 w-6" />,
      position: { bottom: "20%", right: "5%" },
      delay: 1.5,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={element.position}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="p-4 rounded-2xl glass-effect border border-amber-300/20">
            <div className="accent-text">{element.icon}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
