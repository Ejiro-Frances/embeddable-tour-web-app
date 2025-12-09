"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Scale, FileText, HelpCircle, Mail } from "lucide-react";

export function TermsCTA() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0">
        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(90deg, #eabe7b 1px, transparent 1px),
                             linear-gradient(0deg, #eabe7b 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        
      </div>

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
              <Scale className="h-8 w-8" style={{ color: "#eabe7b" }} />
              <h2 className="text-3xl font-bold">Need Legal Assistance?</h2>
            </div>

            <p className="text-lg opacity-80 mb-8">
              Our legal team is available to answer questions about our Terms of
              Service and other legal matters.
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
                <h3 className="font-semibold mb-2">Legal Inquiries</h3>
                <p className="text-sm opacity-70">legal@tourify.com</p>
                <p className="text-xs opacity-50 mt-2">
                  For formal legal matters
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
                <h3 className="font-semibold mb-2">General Questions</h3>
                <p className="text-sm opacity-70">support@tourify.com</p>
                <p className="text-xs opacity-50 mt-2">
                  For service-related questions
                </p>
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
                <Mail className="h-4 w-4" />
                Contact Legal Team
              </Button>

              <Button
                variant="outline"
                className="gap-2 hover:bg-accent/20"
                style={{
                  borderColor: "oklch(0.8 0.2 70 / 0.3)",
                  color: "#eabe7b",
                }}
              >
                <FileText className="h-4 w-4" />
                Download Terms PDF
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 pt-6 border-t border-white/10"
            >
              <p className="text-sm opacity-60">
                For formal legal notices, please send correspondence to our
                registered office address listed in Section 12.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
