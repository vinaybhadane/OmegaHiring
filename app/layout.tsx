import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE_URL = "https://careers.abhyasmitra.in";

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "OmegaHiring | Work From Home Jobs & Remote Opportunities in India",
    template: "%s | OmegaHiring",
  },
  description:
    "OmegaHiring is a trusted career portal offering verified work-from-home jobs, remote internships, fresher jobs, and online earning opportunities across India. Apply now and start your career journey.",
  keywords: [
    "work from home jobs",
    "online jobs in India",
    "remote jobs",
    "fresher jobs",
    "internship opportunities",
    "part time jobs",
    "full time jobs",
    "student jobs",
    "remote internship",
    "online earning",
    "trusted hiring platform",
    "career portal India",
    "apply jobs online",
    "data entry jobs",
    "content writing jobs",
    "OmegaHiring",
  ],
  authors: [{ name: "OmegaHiring", url: BASE_URL }],
  creator: "OmegaHiring",
  publisher: "OmegaHiring",
  category: "Jobs & Careers",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "OmegaHiring",
    title: "OmegaHiring | Verified Remote Jobs & Work From Home Opportunities",
    description:
      "Find verified work-from-home jobs, remote internships, and online earning opportunities. Trusted by 10,000+ professionals across India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OmegaHiring – India's Trusted Remote Career Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmegaHiring | Work From Home & Remote Jobs India",
    description:
      "India's trusted platform for verified remote jobs, work-from-home opportunities, and online internships.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "vJyrCWgG7GTGhDSLWBew7_SagQqJSkjxGzVQLmYhCYA",
  },
};

// ─── JSON-LD SCHEMA ─────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OmegaHiring",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.ico`,
  description:
    "OmegaHiring is a verified career portal offering remote jobs, work-from-home opportunities, and online internships across India.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email: "support@careers.abhyasmitra.in",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: ["https://t.me/omegaofts"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "OmegaHiring",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/jobs?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-YWTCB9B4RR"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-YWTCB9B4RR');
        `}
      </Script>
    </html>
  );
}