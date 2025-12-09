"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "about" },
  { label: "Docs", href: "docs" },
  // { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "glass-effect py-3 shadow-lg" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <Link href="/" className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 accent-bg rounded-lg blur-xl opacity-50" />
                  <Sparkles className="relative h-8 w-8 accent-text" />
                </div>
                <span className="text-2xl font-bold gradient-text">
                  Tourify
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link
                    href={item.href}
                    className="text-ivory/80 hover:accent-text transition-colors font-medium relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 accent-bg group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-ivory hover:accent-text hover:bg-transparent font-semibold transition-all ease-in-out duration-600"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-linear-to-r from-amber-300 to-amber-400 hover:from-amber-600 hover:to-amber-700 text-black font-semibold transition-all ease-in-out duration-600"
                  asChild
                >
                  <Link href="/signup">Get Started Free</Link>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-ivory"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        className="fixed top-16 left-0 right-0 z-40 glass-effect md:hidden overflow-hidden"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-ivory hover:accent-text transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-4">
              <Button
                variant="outline"
                className="w-full border-amber-300 accent-text"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-[#eabe7b] to-[#dd9222] hover:from-[#e3a84f] hover:to-[#c7841f] text-black"
                variant="default"
              >
                <Link href="/signup">Get Started Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
