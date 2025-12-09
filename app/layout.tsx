import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#18181b", // zinc-950/black
};

export const metadata: Metadata = {
  title: {
    default: "Tourify - Embeddable Product Tours",
    template: "%s | Tourify",
  },
  description: "Create beautiful, embeddable product tours and onboarding flows for your web app in minutes. Easy to integrate, highly customizable, and designed for modern SaaS.",
  keywords: [
    "product tour",
    "onboarding",
    "user guide",
    "walkthrough",
    "saas",
    "onboarding tool",
    "react component",
    "embeddable tour"
  ],
  authors: [{ name: "Tourify Team" }],
  creator: "Tourify",
  publisher: "Tourify",
  metadataBase: new URL("https://tourify.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tourify.app",
    title: "Tourify - Embeddable Product Tours",
    description: "Boost user adoption with interactive, embeddable product tours. No coding required to build, easy to integrate.",
    siteName: "Tourify",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tourify - Product Tours Made Easy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tourify - Embeddable Product Tours",
    description: "Boost user adoption with interactive, embeddable product tours. No coding required to build, easy to integrate.",
    images: ["/twitter-image.jpg"],
    creator: "@tourify",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
