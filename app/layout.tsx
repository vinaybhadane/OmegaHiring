import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 1. Viewport Configuration for Mobile Scaling
export const viewport: Viewport = {
  themeColor: "#4f46e5", // Indigo-600 to match your brand
  width: "device-width",
  initialScale: 1,
};

// 2. SEO Metadata Configuration
export const metadata: Metadata = {
  title: {
    default: "OmegaHiring | Verified Remote Tasks & Micro-Jobs",
    template: "%s | OmegaHiring",
  },
  description: "Join OmegaHiring, India's leading platform for verified remote tasks, micro-jobs, and work-from-home opportunities. Start earning with daily payouts.",
  keywords: [
    "Remote Jobs India",
    "Work from Home",
    "Micro-tasking",
    "Data Entry Jobs",
    "Online Tasks",
    "OmegaHiring",
    "Freelance Jobs",
    "Earn Online India"
  ],
  authors: [{ name: "OmegaHiring Team" }],
  creator: "OmegaHiring",
  metadataBase: new URL("https://omegahiring.vercel.app"),
  alternates: {
    canonical: "/",
  },
  
  // OpenGraph (Social Media Previews: WhatsApp, Facebook, LinkedIn)
  openGraph: {
    title: "OmegaHiring - Start Your Remote Career",
    description: "Verified micro-tasks and remote jobs with daily payouts. Join thousands of users today.",
    url: "https://omegahiring.vercel.app",
    siteName: "OmegaHiring",
    locale: "en_IN",
    type: "website",
  },

  // Twitter Previews
  twitter: {
    card: "summary_large_image",
    title: "OmegaHiring | Remote Work Platform",
    description: "Verified micro-tasks and remote jobs with daily payouts.",
  },

  // Favicons & Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-sans text-slate-900">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}