"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    id: "agreement",
    title: "1. Agreement to Terms",
    content: `By accessing or using Tourify's services, you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.

These Terms apply to all visitors, users, and others who access or use the Service. Our Privacy Policy explains how we collect, use, and protect your personal information.`,
  },
  {
    id: "service-description",
    title: "2. Service Description",
    content: `Tourify provides a user onboarding platform that allows businesses to create, manage, and deploy interactive product tours and walkthroughs on their websites and applications.

**Service Components:**
- **Tour Builder**: Visual editor for creating onboarding experiences
- **Analytics Dashboard**: Performance tracking and user engagement metrics
- **APIs & SDKs**: Developer tools for integration
- **Support Services**: Technical support and customer success

We reserve the right to modify or discontinue the Service at any time with notice to users.`,
  },
  {
    id: "account-registration",
    title: "3. Account Registration",
    content: `To use our Service, you must register for an account. You agree to:

- Provide accurate, current, and complete information
- Maintain the security of your password and accept all risks of unauthorized access
- Notify us immediately of any unauthorized use of your account
- Be responsible for all activities that occur under your account

You must be at least 16 years old to use this Service. By registering, you represent that you meet this age requirement.`,
  },
  {
    id: "subscriptions",
    title: "4. Subscriptions & Payments",
    content: `### Subscription Plans
We offer various subscription plans with different features and limitations. Your subscription will automatically renew unless you cancel before the renewal date.

### Payment Terms
- All fees are exclusive of taxes, which we'll charge as applicable
- Payments are processed by third-party payment processors
- You authorize us to charge your payment method for recurring fees

### Free Trial
We may offer a free trial period. After the trial ends, your subscription will automatically convert to a paid plan unless you cancel.

### Cancellation
You may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period. No refunds for partial months.`,
  },
  {
    id: "user-content",
    title: "5. User Content",
    content: `### Your Content
You retain ownership of any content you create using our Service ("User Content"). By using Tourify, you grant us a worldwide, non-exclusive license to host, store, and display your User Content as necessary to provide the Service.

### Content Guidelines
You agree not to use the Service to create, upload, or distribute content that:
- Violates any law or regulation
- Infringes intellectual property rights
- Contains malware or malicious code
- Is discriminatory, harassing, or abusive

### Our Rights
We may remove any content that violates these Terms or our policies.`,
  },
  {
    id: "intellectual-property",
    title: "6. Intellectual Property",
    content: `### Our Property
The Service and its original content, features, and functionality are owned by Tourify and are protected by international copyright, trademark, and other intellectual property laws.

### License Grant
We grant you a limited, non-exclusive, non-transferable license to use the Service for your internal business purposes, subject to these Terms.

### Restrictions
You may not:
- Modify, reverse engineer, or create derivative works
- Use the Service to build a competitive product
- Remove any copyright or proprietary notices
- Use the Service for any illegal purpose

### Feedback
Any feedback, suggestions, or ideas you provide become our property without compensation.`,
  },
  {
    id: "termination",
    title: "7. Termination",
    content: `We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including:

- Breach of these Terms
- Non-payment of fees
- Illegal or harmful use of the Service
- Prolonged inactivity

Upon termination:
- Your right to use the Service will immediately cease
- You must stop all use of the Service
- We may delete your account and data (subject to data retention policies)

You may terminate your account at any time by contacting support or through your account settings.`,
  },
  {
    id: "disclaimer",
    title: "8. Disclaimer of Warranties",
    content: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.

TO THE FULLEST EXTENT PERMISSIBLE BY LAW, TOURIFY DISCLAIMS ALL WARRANTIES, INCLUDING:

- MERCHANTABILITY
- FITNESS FOR A PARTICULAR PURPOSE
- NON-INFRINGEMENT
- ACCURACY OR RELIABILITY OF INFORMATION
- UNINTERRUPTED OR ERROR-FREE SERVICE
- SECURITY OF YOUR DATA

You acknowledge that you use the Service at your own risk. We do not guarantee that the Service will meet your requirements or be available 100% of the time.`,
  },
  {
    id: "limitation-liability",
    title: "9. Limitation of Liability",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL TOURIFY, ITS DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR:

- ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES
- LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES
- PERSONAL INJURY OR PROPERTY DAMAGE
- ANY DAMAGES EXCEEDING THE AMOUNT YOU PAID US IN THE PAST 12 MONTHS

This limitation applies regardless of the legal theory (contract, tort, or otherwise) and even if we have been advised of the possibility of such damages.

Some jurisdictions do not allow the exclusion or limitation of liability, so these limitations may not apply to you.`,
  },
  {
    id: "governing-law",
    title: "10. Governing Law",
    content: `These Terms shall be governed by the laws of the State of California, United States, without regard to its conflict of law provisions.

Any disputes arising from these Terms or your use of the Service shall be resolved in the state or federal courts located in San Francisco County, California.

You agree to submit to the personal jurisdiction of these courts and waive any objection to venue.

### Class Action Waiver
You agree to resolve disputes on an individual basis and waive any right to participate in class actions or collective proceedings.`,
  },
  {
    id: "changes",
    title: "11. Changes to Terms",
    content: `We reserve the right to modify these Terms at any time. When we make changes:

- We will update the "Effective Date" at the top of these Terms
- We will provide notice via email or through the Service for material changes
- Your continued use of the Service after changes constitutes acceptance

We encourage you to review these Terms periodically. If you object to any changes, you must stop using the Service.`,
  },
  {
    id: "contact",
    title: "12. Contact Information",
    content: `If you have any questions about these Terms, please contact us:

**Tourify Inc.**
123 Market Street, Suite 100
San Francisco, CA 94105
United States

**Email**: legal@tourify.com
**Phone**: +1 (555) 123-4567

For legal notices, please use the mailing address above or email legal@tourify.com with "LEGAL NOTICE" in the subject line.`,
  },
];

export function TermsContent() {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "agreement",
  ]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Terms of Service <span className="gradient-text">Details</span>
          </h2>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            Comprehensive legal agreement for using Tourify&#39;s services
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Important Notice */}
          <div className="mb-12">
            <div
              className="glass-effect p-6 rounded-2xl"
              style={{
                background: "oklch(0.8 0.2 70 / 0.05)",
                borderColor: "oklch(0.8 0.2 70 / 0.2)",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg mt-0.5"
                  style={{
                    background: "oklch(0.8 0.2 70 / 0.1)",
                  }}
                >
                  <svg
                    className="h-5 w-5"
                    style={{ color: "#eabe7b" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.698-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Important Legal Notice
                  </h3>
                  <p className="opacity-80">
                    This is a legally binding agreement. These Terms govern your
                    use of Tourify&#39;s services. By using our Service, you
                    agree to these terms. We recommend consulting with legal
                    counsel if you have questions about these Terms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div
                  className="glass-effect rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-amber-300/30"
                  style={{ borderColor: "oklch(0.8 0.2 70 / 0.1)" }}
                  onClick={() => toggleSection(section.id)}
                >
                  {/* Section Header */}
                  <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
                        style={{
                          background: "oklch(0.8 0.2 70 / 0.1)",
                          color: "#eabe7b",
                        }}
                      >
                        {section.title.split(".")[0]}
                      </div>
                      <h3 className="text-xl font-semibold">{section.title}</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      style={{ color: "#eabe7b" }}
                    >
                      {expandedSections.includes(section.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Section Content */}
                  {expandedSections.includes(section.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 pt-4"
                    >
                      <div
                        className="prose prose-invert max-w-none"
                        
                      >
                        <div className="whitespace-pre-line text-opacity-90">
                          {section.content.split("\n").map((paragraph, i) => {
                            if (paragraph.startsWith("### ")) {
                              return (
                                <h4
                                  key={i}
                                  className="text-lg font-semibold mt-6 mb-3 text-accent-text"
                                >
                                  {paragraph.substring(4)}
                                </h4>
                              );
                            } else if (paragraph.startsWith("- **")) {
                              const match =
                                paragraph.match(/\*\*(.*?)\*\*: (.*)/);
                              if (match) {
                                return (
                                  <div key={i} className="flex gap-2 mt-2">
                                    <div
                                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                                      style={{
                                        background: "#eabe7b",
                                      }}
                                    />
                                    <div>
                                      <strong>{match[1]}</strong>: {match[2]}
                                    </div>
                                  </div>
                                );
                              }
                            } else if (paragraph.startsWith("**")) {
                              const text = paragraph.replace(/\*\*/g, "");
                              return (
                                <div
                                  key={i}
                                  className="my-3 p-4 rounded-lg"
                                  style={{
                                    background: "oklch(0.1 0 0)",
                                    borderLeft: "4px solid #eabe7b",
                                  }}
                                >
                                  <strong className="block mb-1">{text}</strong>
                                </div>
                              );
                            }
                            return (
                              <p key={i} className="mt-3 leading-relaxed">
                                {paragraph}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Acceptance Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div
              className="glass-effect p-8 rounded-2xl text-center"
              style={{ borderColor: "oklch(0.8 0.2 70 / 0.2)" }}
            >
              <h3 className="text-xl font-bold mb-4">Acceptance of Terms</h3>
              <p className="opacity-80 mb-6">
                By using Tourify&#39;s services, you acknowledge that you have
                read, understood, and agree to be bound by these Terms of
                Service.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm opacity-70">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Last updated: December 8, 2025
                </span>
                <span>•</span>
                <span>Version: 3.1</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
