"use client";

import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Settings,
  Code,
  Rocket,
  ChevronRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <ClipboardCheck className="h-8 w-8" />,
    title: "Sign Up & Create Tour",
    description:
      "Create your account and use our no-code builder to design your tour.",
    color: "from-amber-300 to-yellow-500",
  },
  {
    number: "02",
    icon: <Settings className="h-8 w-8" />,
    title: "Customize Steps",
    description: "Add 5+ steps, set triggers, and customize the appearance.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    number: "03",
    icon: <Code className="h-8 w-8" />,
    title: "Get Embed Code",
    description: "Copy a single line of JavaScript to embed on your website.",
    color: "from-orange-500 to-red-500",
  },
  {
    number: "04",
    icon: <Rocket className="h-8 w-8" />,
    title: "Go Live & Analyze",
    description: "Track performance and optimize based on real user data.",
    color: "from-red-500 to-pink-500",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-10 relative">
      <div className="container mx-auto px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full accent-bg/10 border border-amber-300/20 mb-4">
            <span className="text-sm font-medium accent-text">
              How It Works
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Started in <span className="gradient-text">4 Easy Steps</span>
          </h2>
          <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
            From creating your first tour to embedding it on your site, we make
            the process incredibly simple.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Line */}
          {/* <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-400 transform -translate-y-1/2 hidden lg:block" /> */}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative z-10">
                  <div className="flex flex-col items-center text-center">
                    {/* Number Badge */}
                    <div className="relative mb-6">
                      {/* <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-400 rounded-full blur-lg opacity-50" /> */}
                      <div className="relative h-16 w-16 rounded-full bg-linear-to-br from-black to-gray-900 border-2 border-amber-300/30 flex items-center justify-center">
                        <span className="text-2xl font-bold gradient-text">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Icon */}
                    {/* <div className={`mb-4 p-4 rounded-2xl accent-bg/10 ${step.color}`}>
                      {step.icon}
                    </div> */}

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 text-ivory">
                      {step.title}
                    </h3>
                    <p className="text-ivory/70 mb-6">{step.description}</p>
                  </div>
                </div>

                {/* Arrow between steps (mobile) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-8">
                    <ChevronRight className="h-8 w-8 accent-text rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="group px-8 py-4 rounded-full bg-linear-to-r from-[#eabe7b] to-[#dd9222] hover:from-[#e3a84f] hover:to-[#c7841f] text-black font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30">
            Start Building Your Tour
            <ChevronRight className="inline ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
