"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, CheckCircle, FileText } from "lucide-react";
import { StandardHero } from "../shared/standard-hero";

export function PrivacyHero() {
  const highlights = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Transparency",
      description: "Clear about data usage",
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Security",
      description: "Enterprise-grade protection",
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: "Control",
      description: "You own your data",
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Compliance",
      description: "GDPR, CCPA, SOC2",
    },
  ];

  return (
    <StandardHero
      title={
        <>
          Your Privacy,
          <br />
          <span className="gradient-text">Our Promise</span>
        </>
      }
      subtitle="We're committed to protecting your personal information with the highest standards of security and transparency."
      badgeText="Privacy Policy"
      badgeIcon={<Shield className="h-4 w-4" />}
      highlights={highlights}
      additionalInfo={
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="inline-block px-4 py-2 rounded-lg mb-8 bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FileText className="h-4 w-4" />
              <span>Last updated: December 8, 2025</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12 p-4 rounded-lg max-w-2xl mx-auto accent-bg/10 border border-amber-300/20"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 shrink-0 accent-text" />
              <p className="text-sm text-gray-300">
                Your data is protected with enterprise-grade security and
                transparent policies.
              </p>
            </div>
          </motion.div>
        </>
      }
    />
  );
}
