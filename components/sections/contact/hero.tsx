"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Zap } from "lucide-react";
import { StandardHero } from "../shared/standard-hero";

export function ContactHero() {
  const highlights = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      description: "hello@tourify.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      description: "+1 (555) 123-4567",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Office",
      description: "San Francisco, CA",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Hours",
      description: "Mon-Fri, 9AM-6PM PST",
    },
  ];

  return (
    <StandardHero
      title={
        <>
          Let&apos;s <span className="gradient-text">Connect</span>
        </>
      }
      subtitle="Have questions, feedback, or want to learn more? We'd love to hear from you and help you succeed."
      badgeText="Contact Us"
      badgeIcon={<Mail className="h-4 w-4" />}
      highlights={highlights}
      additionalInfo={
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-8 bg-white/5 border border-white/10"
          >
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">Mon-Fri, 9AM-6PM PST</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-300/20 to-amber-400/10 border border-amber-300/20">
              <Zap className="h-4 w-4 accent-text" />
              <span className="text-sm font-medium accent-text">
                ⚡ Average response time: 2 hours
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 p-4 rounded-lg max-w-2xl mx-auto accent-bg/10 border border-amber-300/20"
          >
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 accent-text" />
              <p className="text-sm text-gray-300">
                Need urgent assistance? Email support@tourify.com for priority
                support.
              </p>
            </div>
          </motion.div>
        </>
      }
    />
  );
}
