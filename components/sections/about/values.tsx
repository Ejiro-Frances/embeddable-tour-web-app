"use client";

import { motion } from "framer-motion";
import { Heart, Users, Zap, Shield, Sparkles, Target } from "lucide-react";

const values = [
  {
    icon: <Heart className="h-8 w-8" />,
    title: "User-Centric",
    description: "We obsess over user delight in every decision we make",
    color: "#eabe7b",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Simplicity",
    description: "We believe powerful tools should be simple to use",
    color: "#eabe7b",
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Innovation",
    description: "We constantly push boundaries to create magical experiences",
    color: "#eabe7b",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Trust",
    description:
      "We build products you can trust with your most important users",
    color: "#eabe7b",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Collaboration",
    description: "We grow stronger together with our customers and team",
    color: "#eabe7b",
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Impact",
    description: "We measure success by the positive impact we create",
    color: "#eabe7b",
  },
];

export function ValuesSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="inline-block px-4 py-2 rounded-full border mb-4"
            style={{
              background: "oklch(0.8 0.2 70 / 0.1)",
              borderColor: "oklch(0.8 0.2 70 / 0.2)",
            }}
          >
            <span className="text-sm font-medium" style={{ color: "#eabe7b" }}>
              Our Values
            </span>
          </div>
          <h2 className="text-4xl md:text-4xl font-bold mb-6">
            The Principles That <span className="gradient-text">Guide Us</span>
          </h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            These values shape our culture, products, and relationships
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative "
            >
              {/* Floating background */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: value.color }}
                initial={{ scale: 0.9 }}
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative glass-effect p-8 rounded-2xl h-full">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex p-4 rounded-xl mb-6"
                  style={{ background: `${value.color}20` }}
                >
                  <div style={{ color: value.color }}>{value.icon}</div>
                </motion.div>

                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="opacity-80">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
