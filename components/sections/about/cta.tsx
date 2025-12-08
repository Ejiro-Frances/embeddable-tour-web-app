"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ PURE deterministic pseudo-random generator
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

type Bubble = {
  width: number;
  height: number;
  left: number;
  top: number;
  x: number;
  y: number;
  duration: number;
};

// ✅ Generated with PURE math (no Math.random)
const bubbles: Bubble[] = Array.from({ length: 20 }).map((_, i) => {
  const base = i + 1;

  return {
    width: seededRandom(base * 2) * 200 + 50,
    height: seededRandom(base * 3) * 200 + 50,
    left: seededRandom(base * 4) * 100,
    top: seededRandom(base * 5) * 100,
    x: seededRandom(base * 6) * 100 - 50,
    y: seededRandom(base * 7) * 100 - 50,
    duration: seededRandom(base * 8) * 20 + 20,
  };
});

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${bubble.width}px`,
              height: `${bubble.height}px`,
              background:
                "radial-gradient(circle, rgba(255, 200, 80, 0.12), transparent 70%)",
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
            }}
            animate={{
              x: [0, bubble.x, 0],
              y: [0, bubble.y, 0],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-effect p-8 md:p-12 rounded-3xl border"
            style={{ borderColor: "oklch(0.8 0.2 70 / 0.2)" }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
              style={{
                background: "oklch(0.8 0.2 70 / 0.1)",
                borderColor: "oklch(0.8 0.2 70 / 0.2)",
              }}
            >
              <Users
                className="h-4 w-4"
                style={{ color: "oklch(0.8 0.2 70)" }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: "oklch(0.8 0.2 70)" }}
              >
                Join Our Mission
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Create{" "}
              <span className="gradient-text">Magical Experiences?</span>
            </h2>

            <p className="text-xl opacity-80 mb-8 max-w-2xl mx-auto">
              Join thousands of companies transforming their user onboarding
              with Tourify
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="group text-lg px-8 py-6"
                style={{
                  background:
                    "linear-gradient(to right, oklch(0.8 0.2 70), oklch(0.85 0.18 75))",
                }}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                style={{
                  borderColor: "oklch(0.8 0.2 70 / 0.3)",
                  color: "oklch(0.8 0.2 70)",
                }}
              >
                <Rocket className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm opacity-60 mt-8"
            >
              No credit card required • 14-day free trial • Cancel anytime
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
