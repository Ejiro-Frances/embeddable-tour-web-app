"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Zap, Code } from "lucide-react";
import { Input } from "@/components/ui/input";
import { HeroSection } from "../shared/hero-section";
import Link from "next/link";

/* ✅ Example docs data (Replace with your real docs source) */
const docsData = [
  {
    title: "Quick Start",
    description: "Get up and running in 5 minutes",
    href: "#quick-start",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: "API Reference",
    description: "Complete API documentation",
    href: "#api",
    icon: <Code className="h-5 w-5" />,
  },
  {
    title: "Guides",
    description: "Step-by-step tutorials",
    href: "#examples",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Resources",
    description: "Some resources that helps",
    href: "#resources",
    icon: <BookOpen className="h-5 w-5" />,
  },
];

export function DocsHero() {
  const [query, setQuery] = useState("");

  /* ✅ Live filtering logic */
  const filteredDocs = useMemo(() => {
    if (!query.trim()) return [];

    return docsData.filter((doc) =>
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <HeroSection
      title={
        <>
          Build With <span className="gradient-text">Confidence</span>
        </>
      }
      subtitle="Everything you need to integrate Tourify seamlessly into your application"
      badgeText="Documentation"
      badgeIcon={<BookOpen className="h-4 w-4" />}
    >
      {/* ✅ SEARCH INPUT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-2xl mx-auto mb-10"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="pl-12 py-6 text-lg rounded-full bg-white/5 border-white/10"
          />
        </div>

        {/* ✅ LIVE SEARCH RESULTS */}
        {query && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
            {filteredDocs.length === 0 ? (
              <p className="p-4 text-gray-400 text-sm">
                No results found.
              </p>
            ) : (
              filteredDocs.map((doc) => (
                <Link
                  key={doc.title}
                  href={doc.href}
                  className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="p-2 rounded-md bg-white/10 accent-text">
                    {doc.icon}
                  </div>
                  <div>
                    <p className="font-medium text-white">{doc.title}</p>
                    <p className="text-sm text-gray-400">
                      {doc.description}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </motion.div>

      {/* ✅ QUICK LINKS (unchanged, but now real links) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
      >
        {docsData.slice(0, 3).map((link, index) => (
          <motion.a
            key={link.title}
            href={link.href}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl text-left group bg-white/5 border border-white/10 hover:border-amber-300/30 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg accent-bg/10 group-hover:accent-bg/20 transition-colors">
                <div className="accent-text">{link.icon}</div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {link.title}
                </h3>
                <p className="text-gray-400">{link.description}</p>
              </div>
            </div>
            <div className="h-0.5 rounded-full mt-4 bg-gradient-to-r from-transparent via-amber-500 to-transparent w-0 group-hover:w-full transition-all duration-300" />
          </motion.a>
        ))}
      </motion.div>
    </HeroSection>
  );
}
