"use client";

import { motion } from "framer-motion";
import { Calendar, Rocket, Users, Award, Zap, Globe } from "lucide-react";

const timelineEvents = [
  {
    year: "2023",
    title: "The Spark",
    description: "Founded by a team frustrated with clunky onboarding tools",
    icon: <Zap className="h-6 w-6" />,
    color: "#eabe7b",
  },
  {
    year: "2024",
    title: "First Launch",
    description:
      "Released MVP to 100 early adopters with overwhelming positive feedback",
    icon: <Rocket className="h-6 w-6" />,
    color: "#eabe7b",
  },
  {
    year: "2024",
    title: "Growth",
    description:
      "Reached 1,000+ customers and expanded team to 15 amazing people",
    icon: <Users className="h-6 w-6" />,
    color: "#eabe7b",
  },
  {
    year: "2025",
    title: "Recognition",
    description: "Awarded 'Best UX Tool' by Design Awards 2025",
    icon: <Award className="h-6 w-6" />,
    color: "#eabe7b",
  },
  {
    year: "2025",
    title: "Global",
    description:
      "Serving customers in 50+ countries with localized experiences",
    icon: <Globe className="h-6 w-6" />,
    color: "#eabe7b",
  },
];

export function TimelineSection() {
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-amber-300/10 to-amber-400/10 border border-amber-300/20 mb-8"
            style={{
              // background: "oklch(0.8 0.2 70 / 0.1)",
              borderColor: "oklch(0.8 0.2 70 / 0.2)",
            }}
          >
            <Calendar className="h-4 w-4" style={{ color: "#eabe7b" }} />
            <span className="text-sm font-medium" style={{ color: "#eabe7b" }}>
              Our Journey
            </span>
          </div>
          <h2 className="text-4xl md:text-4xl font-bold mb-6">
            Building The Future <span className="gradient-text">Together</span>
          </h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            From a simple idea to transforming user experiences worldwide
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 hidden md:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, #eabe7b, transparent)",
              }}
            />

            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year + event.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative mb-12 md:mb-16 ${
                  index % 2 === 0 ? "md:pr-1/2 md:pl-8" : "md:pl-1/2 md:pr-8"
                }`}
              >
                {/* Year badge */}
                <div
                  className={`absolute ${
                    index % 2 === 0
                      ? "md:right-1/2 md:left-auto"
                      : "md:left-1/2 md:right-auto"
                  } top-0 transform md:translate-x-1/2 z-10`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center justify-center w-16 h-16 rounded-full border-2 mb-4"
                    style={{
                      background: "oklch(0 0 0)",
                      borderColor: event.color,
                    }}
                  >
                    <span
                      className="font-bold text-lg"
                      style={{ color: event.color }}
                    >
                      {event.year}
                    </span>
                  </motion.div>
                </div>

                {/* Content card */}
                <div
                  className={`glass-effect p-6 rounded-2xl md:max-w-md ${
                    index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      className="shrink-0 p-3 rounded-lg"
                      style={{ background: `${event.color}20` }}
                    >
                      <div style={{ color: event.color }}>{event.icon}</div>
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="opacity-80">{event.description}</p>
                    </div>
                  </div>

                  {/* Animated highlight */}
                  <motion.div
                    className="h-1 rounded-full"
                    style={{ background: event.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
