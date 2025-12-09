"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Github, Linkedin, Heart, Sparkles } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gray-500/20">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-linear-to-br from-[#eabe7b] to-[#dd9222]">
                <Sparkles className="h-6 w-6 text-black" />
              </div>
              <span className="text-2xl font-bold gradient-text">Tourify</span>
            </div>
            <p className="text-ivory/70 max-w-md">
              The most advanced onboarding platform for modern web applications.
              Transform user experience with beautiful, interactive tours.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-ivory">Product</h3>
            <ul className="space-y-3">
              {[
                "Features",
                "How It Works",
                "Pricing",
                "Documentation",
                "API",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-ivory/70 hover:accent-text transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-ivory">Company</h3>
            <ul className="space-y-3">
              {["Docs", "About", "Contact", "Privacy", "Terms"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-ivory/70 hover:accent-text transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t border-gray
        -500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-ivory/60 text-sm">
            © {currentYear} Tourify. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://twitter.com"
              className="text-ivory/70 hover:[#eabe7b] transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://github.com"
              className="text-ivory/70 hover:[#eabe7b] transition-colors"
            >
              <Github className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://linkedin.com"
              className="text-ivory/70 hover:[#eabe7b] transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>
          </div>

          <div className="flex items-center gap-2 text-sm text-ivory/60">
            Made with
            <Heart className="h-4 w-4 accent-text fill-[#dd9222]" />
            by Team Tourify
          </div>
        </div>
      </div>
    </footer>
  );
}
