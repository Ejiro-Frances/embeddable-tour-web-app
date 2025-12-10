"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

const sections = [
  {
    id: "overview",
    title: "1. Overview",
    content: `Tourify Inc. ("we", "our", or "us") operates the Tourify onboarding platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.

We respect your privacy and are committed to protecting your personal data. This policy applies to all users of our Service, including website visitors, customers, and trial users.`,
  },
  {
    id: "data-collection",
    title: "2. Information We Collect",
    content: `We collect several types of information for various purposes to provide and improve our Service:

### Personal Data
- **Account Information**: Name, email address, company name, phone number
- **Payment Information**: Billing address, payment method details (processed by secure payment processors)
- **Profile Data**: Profile picture, job title, preferences

### Usage Data
- **Device Information**: IP address, browser type, device type, operating system
- **Usage Information**: Pages visited, features used, time spent, tour interactions
- **Analytics Data**: Tour completion rates, drop-off points, user engagement metrics

### Cookies and Tracking
We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.`,
  },
  {
    id: "data-use",
    title: "3. How We Use Your Information",
    content: `We use the collected data for various purposes:

- **To provide and maintain our Service**
- **To notify you about changes to our Service**
- **To allow you to participate in interactive features**
- **To provide customer support**
- **To gather analysis or valuable information to improve our Service**
- **To monitor the usage of our Service**
- **To detect, prevent and address technical issues**
- **To provide you with news, special offers and general information about other goods, services and events which we offer (you may opt out at any time)**
- **To process payments and prevent fraud**`,
  },
  {
    id: "data-sharing",
    title: "4. Data Sharing and Disclosure",
    content: `We may share your personal information in the following situations:

- **With Service Providers**: We may share your information with third-party vendors who perform services on our behalf (e.g., payment processing, data analysis, email delivery).
- **For Business Transfers**: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition.
- **With Affiliates**: We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy.
- **With Business Partners**: We may share your information with our business partners to offer you certain products, services or promotions.
- **With Your Consent**: We may disclose your personal information for any other purpose with your consent.

We do not sell your personal information to third parties.`,
  },
  {
    id: "data-security",
    title: "5. Data Security",
    content: `The security of your data is important to us. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

Our security measures include:
- **Encryption**: All data is encrypted in transit (TLS 1.2+) and at rest (AES-256)
- **Access Controls**: Role-based access control and multi-factor authentication
- **Regular Audits**: Security assessments and penetration testing
- **SOC2 Compliance**: Annual SOC2 Type II audits
- **Data Backups**: Regular encrypted backups with disaster recovery procedures

Despite our safeguards, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.`,
  },
  {
    id: "gdpr-ccpa",
    title: "6. Your Data Protection Rights",
    content: `Depending on your location, you may have certain rights regarding your personal information:

### GDPR (European Union)
- **Right to Access**: You can request copies of your personal data
- **Right to Rectification**: You can request correction of inaccurate data
- **Right to Erasure**: You can request deletion of your personal data
- **Right to Restrict Processing**: You can request restriction of processing
- **Right to Data Portability**: You can request transfer of your data
- **Right to Object**: You can object to our processing of your data

### CCPA (California)
- **Right to Know**: You can request information about data collection
- **Right to Delete**: You can request deletion of personal information
- **Right to Opt-Out**: You can opt-out of sale of personal information
- **Right to Non-Discrimination**: You won't receive discriminatory treatment

To exercise these rights, contact us at privacy@tourify.com.`,
  },
  {
    id: "data-retention",
    title: "7. Data Retention",
    content: `We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.

Retention periods:
- **Account Data**: Retained while your account is active, plus 30 days after deletion
- **Usage Data**: Retained for 36 months for analytics purposes
- **Financial Records**: Retained for 7 years for tax and legal compliance
- **Support Data**: Retained for 24 months after resolution

After the retention period expires, we securely delete or anonymize your data.`,
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    content: `Our Service is not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16.

If you are a parent or guardian and you believe your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from a child under 16, we will take steps to remove that information from our servers.`,
  },
  {
    id: "changes",
    title: "9. Changes to This Policy",
    content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.

We will also provide email notification for significant changes. You are advised to review this Privacy Policy periodically for any changes.

Changes to this Privacy Policy are effective when they are posted on this page.`,
  },
  {
    id: "contact",
    title: "10. Contact Us",
    content: `If you have any questions about this Privacy Policy, please contact us:

- **Email**: privacy@tourify.com
- **Mail**: Tourify Inc.
  123 Privacy Lane, Suite 100
  San Francisco, CA 94105
  United States

- **Phone**: +1 (555) 123-4567
- **DPO Contact**: dpo@tourify.com

For EU/UK residents, you may also contact our Data Protection Officer directly for privacy-related inquiries.`,
  },
];

export function PrivacyContent() {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "overview",
  ]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    const x = 40;
    let y = 40;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(18);
    doc.text("Tourify Privacy Policy", x, y);

    y += 30;

    doc.setFontSize(12);

    sections.forEach((section) => {
      doc.setFont("Helvetica", "bold");
      doc.text(section.title, x, y);
      y += 20;

      doc.setFont("Helvetica", "normal");

      const lines = doc.splitTextToSize(section.content, 520);
      lines.forEach((line: string) => {
        if (y > 780) {
          doc.addPage();
          y = 40;
        }
        doc.text(line, x, y);
        y += 16;
      });

      y += 10;
    });

    doc.save("privacy-policy.pdf");
  };

  const printVersion = () => {
    const printContent = sections
      .map(
        (section) =>
          `<h2>${section.title}</h2><p>${section.content.replace(
            /\n/g,
            "<br/>"
          )}</p>`
      )
      .join("<hr/>");

    const printWindow = window.open("", "", "width=900,height=700");

    printWindow!.document.write(`
    <html>
      <head>
        <title>Privacy Policy</title>
        <style>
          body { font-family: Arial; padding: 20px; line-height: 1.6; }
          h2 { margin-top: 24px; color: #444; }
          hr { margin: 32px 0; opacity: 0.3; }
        </style>
      </head>
      <body>${printContent}</body>
    </html>
  `);

    printWindow!.document.close();
    printWindow!.focus();
    printWindow!.print();
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
            Complete Privacy <span className="gradient-text">Policy</span>
          </h2>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            Detailed information about how we collect, use, and protect your
            data
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="mb-12">
            <div
              className="glass-effect p-6 rounded-2xl mb-8"
              style={{ borderColor: "oklch(0.8 0.2 70 / 0.2)" }}
            >
              <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toggleSection(section.id);
                      document.getElementById(section.id)?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="rounded-full text-xs text-accent hover:text-black"
                    style={{
                      borderColor: "oklch(0.8 0.2 70 / 0.3)",
                    }}
                  >
                    {section.title.split(" ")[0]}
                  </Button>
                ))}
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
                      <div className="prose prose-invert max-w-none">
                        <div className="whitespace-pre-line text-opacity-90">
                          {section.content.split("\n").map((paragraph, i) => {
                            if (paragraph.startsWith("### ")) {
                              return (
                                <h4
                                  key={i}
                                  className="text-lg font-semibold mt-4 mb-2 text-amber-400"
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

          {/* Download Option */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div
              className="glass-effect p-6 rounded-2xl text-center"
              style={{ borderColor: "oklch(0.8 0.2 70 / 0.2)" }}
            >
              <h3 className="text-lg font-semibold mb-4">Need a Copy?</h3>
              <p className="opacity-80 mb-6">
                Download a PDF version of our Privacy Policy for your records
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  className="gap-2"
                  onClick={downloadPDF}
                  style={{
                    background:
                      "linear-gradient(to right, #eabe7b, oklch(0.85 0.18 75))",
                  }}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 text-accent hover:text-black"
                  onClick={printVersion}
                  style={{
                    borderColor: "oklch(0.8 0.2 70 / 0.3)",
                  }}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Print Version
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
