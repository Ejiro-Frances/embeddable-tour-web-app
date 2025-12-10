"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Shield, HelpCircle } from "lucide-react";
import Link from "next/link";

export function PrivacyCTA() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-effect p-8 md:p-12 rounded-3xl"
            style={{ borderColor: "oklch(0.8 0.2 70 / 0.2)" }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="h-8 w-8" style={{ color: "#eabe7b" }} />
              <h2 className="text-3xl font-bold">Questions About Privacy?</h2>
            </div>

            <p className="text-lg opacity-80 mb-8">
              Our team is here to help you understand our privacy practices and
              address any concerns you may have.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div
                className="p-4 rounded-xl text-center"
                style={{
                  background: "oklch(0.1 0 0)",
                  border: "1px solid oklch(1 0 0 / 0.1)",
                }}
              >
                <Mail
                  className="h-6 w-6 mx-auto mb-3"
                  style={{ color: "#eabe7b" }}
                />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-sm opacity-70">privacy@tourify.com</p>
                <p className="text-xs opacity-50 mt-2">
                  Response within 24 hours
                </p>
              </div>

              <div
                className="p-4 rounded-xl text-center"
                style={{
                  background: "oklch(0.1 0 0)",
                  border: "1px solid oklch(1 0 0 / 0.1)",
                }}
              >
                <HelpCircle
                  className="h-6 w-6 mx-auto mb-3"
                  style={{ color: "#eabe7b" }}
                />
                <h3 className="font-semibold mb-2">Data Protection Officer</h3>
                <p className="text-sm opacity-70">dpo@tourify.com</p>
                <p className="text-xs opacity-50 mt-2">For EU/UK residents</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="gap-2"
                style={{
                  background:
                    "linear-gradient(to right, #eabe7b, oklch(0.85 0.18 75))",
                }}
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Privacy Team
                </Link>
              </Button>

              <Button
                variant="outline"
                className="gap-2 text-accent hover:text-accent-foreground"
                style={{
                  borderColor: "oklch(0.8 0.2 70 / 0.3)",
                }}
              >
                <Link href="/about" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Know more
                </Link>
              </Button>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm opacity-60 mt-8"
            >
              We&#39;re committed to transparency and protecting your privacy
              rights.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
