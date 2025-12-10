"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
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
              <Users className="h-4 w-4" style={{ color: "#eabe7b" }} />
              <span
                className="text-sm font-medium"
                style={{ color: "#eabe7b" }}
              >
                Join Our Mission
              </span>
            </div>

            <h2 className="text-4xl md:text-4xl font-bold mb-6 leading-tight">
              Ready to Create <span className="gradient-text">Magical</span>{" "}
              Experiences?
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
                    "linear-gradient(to right, #eabe7b, oklch(0.85 0.18 75))",
                }}
              >
                <Link href="/signup" className="flex items-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 text-accent hover:text-accent-foreground transition-transform"
                style={{
                  borderColor: "oklch(0.8 0.2 70 / 0.3)",
                }}
              >
                <Link href="/contact" className="flex items-center">
                  <Rocket className="mr-2 h-5 w-5" />
                  Schedule Demo
                </Link>
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
