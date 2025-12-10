"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  Users,
  Building,
} from "lucide-react";

const locations = [
  {
    city: "San Francisco",
    country: "United States",
    icon: "🌉",
    color: "#eabe7b",
    address: "123 Market Street, Suite 100",
    postal: "San Francisco, CA 94105",
    phone: "+1 (555) 123-4567",
    email: "sf@tourify.com",
    hours: "Mon-Fri, 9AM-6PM PST",
    team: "Headquarters",
    teamSize: "50+ team members",
  },
  {
    city: "New York",
    country: "United States",
    icon: "🗽",
    color: "oklch(0.85 0.18 75)",
    address: "456 Broadway, 20th Floor",
    postal: "New York, NY 10013",
    phone: "+1 (555) 234-5678",
    email: "ny@tourify.com",
    hours: "Mon-Fri, 9AM-6PM EST",
    team: "Sales & Marketing",
    teamSize: "25 team members",
  },
  {
    city: "London",
    country: "United Kingdom",
    icon: "🇬🇧",
    color: "oklch(0.9 0.18 80)",
    address: "78 Oxford Street",
    postal: "London W1D 1BS, UK",
    phone: "+44 20 7123 4567",
    email: "london@tourify.com",
    hours: "Mon-Fri, 9AM-6PM GMT",
    team: "EMEA Operations",
    teamSize: "30 team members",
  },
];

export function LocationsSection() {
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
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-sm font-medium"
            style={{
              background: "oklch(0.8 0.2 70 / 0.1)",
              borderColor: "oklch(0.8 0.2 70 / 0.2)",
              color: "#eabe7b",
            }}
          >
            <Globe className="h-3 w-3 mr-2" />
            Our Locations
          </Badge>
          <h2 className="text-4xl md:text-4xl font-bold mb-6">
            Global <span className="gradient-text">Presence</span>
          </h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Meet our teams around the world serving customers 24/7
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={location.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full border-0 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-sm hover:from-white/10 hover:to-white/5 transition-all duration-300 overflow-hidden">
                  {/* Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">{location.icon}</span>
                          <div>
                            <h3 className="text-xl font-semibold">
                              {location.city}
                            </h3>
                            <p className="text-sm opacity-60">
                              {location.country}
                            </p>
                          </div>
                        </div>

                        <Badge
                          variant="secondary"
                          className="text-xs mt-2"
                          style={{
                            background: `${location.color}15`,
                            color: location.color,
                          }}
                        >
                          {location.team}
                        </Badge>
                      </div>

                      {/* Animated indicator */}
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-3 h-3 rounded-full"
                        style={{ background: location.color }}
                      />
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Address */}
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div
                          className="p-2 rounded-lg shrink-0"
                          style={{ background: `${location.color}15` }}
                        >
                          <MapPin
                            className="h-4 w-4"
                            style={{ color: location.color }}
                          />
                        </div>
                        <div>
                          <p className="font-medium mb-1">Address</p>
                          <p className="text-sm opacity-70">
                            {location.address}
                          </p>
                          <p className="text-sm opacity-70">
                            {location.postal}
                          </p>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{ background: `${location.color}15` }}
                          >
                            <Phone
                              className="h-4 w-4"
                              style={{ color: location.color }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Phone</p>
                            <p className="text-sm opacity-70">
                              {location.phone}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{ background: `${location.color}15` }}
                          >
                            <Mail
                              className="h-4 w-4"
                              style={{ color: location.color }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm opacity-70">
                              {location.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{ background: `${location.color}15` }}
                          >
                            <Clock
                              className="h-4 w-4"
                              style={{ color: location.color }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Hours</p>
                            <p className="text-sm opacity-70">
                              {location.hours}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{ background: `${location.color}15` }}
                          >
                            <Users
                              className="h-4 w-4"
                              style={{ color: location.color }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Team</p>
                            <p className="text-sm opacity-70">
                              {location.teamSize}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <button
                        className="w-full py-3 rounded-lg font-medium transition-all hover:scale-105 group"
                        style={{
                          background: `${location.color}15`,
                          color: location.color,
                        }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Building className="h-4 w-4" />
                          Visit Office
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Remote Team */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div
              className="glass-effect p-8 rounded-2xl text-center"
              style={{ borderColor: "oklch(0.8 0.2 70 / 0.2)" }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Globe className="h-8 w-8" style={{ color: "#eabe7b" }} />
                <h3 className="text-2xl font-bold">Remote-First Company</h3>
              </div>
              <p className="opacity-80 mb-6 max-w-2xl mx-auto">
                We&apos;re a distributed team with members across 15+ countries.
                Our culture is built on async communication, flexibility, and
                results.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  "Flexible Hours",
                  "Async Work",
                  "Global Team",
                  "Results-Driven",
                ].map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="px-4 py-2"
                    style={{
                      background: "oklch(0.8 0.2 70 / 0.1)",
                      color: "#eabe7b",
                    }}
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
