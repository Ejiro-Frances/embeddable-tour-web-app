"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, Github } from "lucide-react";
import { github } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const teamMembers = [
  {
    name: "Frances Ejiro",
    role: "Frontend Engineer",
    bio: "Former UX lead at Google with 10+ years in product design",
    imageColor: "oklch(0.75 0.18 80)",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    name: "Chief Leo",
    role: "Head of Engineering",
    bio: "Ex-Facebook engineer specializing in frontend architecture",
    imageColor: "oklch(0.85 0.18 75)",
    social: {
      linkedin: "#",
      github: "#",
      email: "#",
    },
  },
  {
    name: "David Uwagbale",
    role: "Fullstack Developer",
    bio: "Product manager with 8+ years at top SaaS companies",
    imageColor: "oklch(0.9 0.18 80)",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
  },
  {
    name: "Tolulope Ilesanmi",
    role: "Frontend Engineer",
    bio: "Award-winning designer focused on creating delightful experiences",
    imageColor: "oklch(0.8 0.15 85)",
    social: {
      linkedin: "#",
      github: "#",
      email: "#",
    },
  },
];

export function TeamSection() {
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
              Meet The Team
            </span>
          </div>
          <h2 className="text-4xl md:text-4xl font-bold mb-6">
            The Minds Behind <span className="gradient-text">Tourify</span>
          </h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            A diverse team united by a shared passion for creating exceptional
            user experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative">
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: member.imageColor }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative glass-effect p-8 rounded-2xl">
                  {/* Avatar placeholder with animation */}
                  <motion.div
                    className="w-24 h-24 rounded-full mx-auto mb-6 relative overflow-hidden border bg-white/10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: [
                          `linear-gradient(45deg, ${member.imageColor}40, transparent)`,
                          `linear-gradient(135deg, ${member.imageColor}60, transparent)`,
                          `linear-gradient(225deg, ${member.imageColor}40, transparent)`,
                          `linear-gradient(315deg, ${member.imageColor}60, transparent)`,
                          `linear-gradient(45deg, ${member.imageColor}40, transparent)`,
                        ],
                      }}
                      transition={{ duration: 10, repeat: Infinity }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                    <div
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
                      style={{
                        background: `${member.imageColor}20`,
                        color: "#eabe7b",
                      }}
                    >
                      {member.role}
                    </div>
                    <p className="opacity-80 mb-6">{member.bio}</p>

                    {/* Social links */}
                    <motion.div
                      className="flex justify-center gap-3"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {member.social.linkedin && (
                        <motion.a
                          href={member.social.linkedin}
                          whileHover={{ scale: 1.2, y: -2 }}
                          className="p-2 rounded-lg hover:bg-white/10"
                          style={{ color: "#eabe7b" }}
                        >
                          <Linkedin className="h-5 w-5" />
                        </motion.a>
                      )}
                      {member.social.twitter && (
                        <motion.a
                          href={member.social.twitter}
                          whileHover={{ scale: 1.2, y: -2 }}
                          className="p-2 rounded-lg hover:bg-white/10"
                          style={{ color: member.imageColor }}
                        >
                          <Twitter className="h-5 w-5" />
                        </motion.a>
                      )}
                      {member.social.github && (
                        <motion.a
                          href={member.social.github}
                          whileHover={{ scale: 1.2, y: -2 }}
                          className="p-2 rounded-lg hover:bg-white/10"
                          style={{ color: member.imageColor }}
                        >
                          <Github className="h-5 w-5" />
                        </motion.a>
                      )}
                      {member.social.email && (
                        <motion.a
                          href={`mailto:${member.social.email}`}
                          whileHover={{ scale: 1.2, y: -2 }}
                          className="p-2 rounded-lg hover:bg-white/10"
                          style={{ color: member.imageColor }}
                        >
                          <Mail className="h-5 w-5" />
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
