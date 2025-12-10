"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

export function MissionSection() {
  const items = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Our Mission",
      description:
        "To eliminate user frustration by making product adoption intuitive, engaging, and memorable for every single user.",
      color: "#eabe7b",
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Our Vision",
      description:
        "A world where no user ever feels lost in a new product, where onboarding is not a chore but a delightful discovery.",
      color: "#eabe7b",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Our Passion",
      description:
        "We're obsessed with creating moments of joy in user journeys, turning confusion into confidence through beautiful experiences.",
      color: "#eabe7b",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-amber-300/10 to-amber-400/10 border border-amber-300/20 mb-8"
            style={{
              // background: "oklch(0.8 0.2 70 / 0.1)",
              borderColor: "oklch(0.8 0.2 70 / 0.2)",
            }}
          >
            <span className="text-sm font-medium" style={{ color: "#eabe7b" }}>
              Why We Exist
            </span>
          </div>
          <h2 className="text-4xl md:text-4xl font-bold mb-6">
            More Than Just <span className="gradient-text">Software</span>
          </h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            We&#39;re on a mission to transform how users experience products
            for the first time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ background: item.color }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative glass-effect p-8 rounded-2xl h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex p-4 rounded-xl mb-6"
                  style={{ background: `${item.color}20` }}
                >
                  <div style={{ color: item.color }}>{item.icon}</div>
                </motion.div>

                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="opacity-80">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
