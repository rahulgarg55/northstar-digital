import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/agency/cookie-consent";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://northstardigital.studio"),
  title: {
    default: "Northstar Digital Studio — Bespoke SaaS Engineering & Product Design",
    template: "%s | Northstar Digital",
  },
  description:
    "High-performance digital engineering studio. We build production-ready SaaS platforms, enterprise workforce intelligence tools, full-stack applications, and scalable digital architectures.",
  keywords: [
    "digital agency",
    "SaaS product development",
    "workforce intelligence",
    "productivity tracking",
    "bug tracking SaaS",
    "MERN stack engineering",
    "Next.js development studio",
    "Rahul Garg software studio",
  ],
  authors: [{ name: "Rahul Garg", url: "https://github.com/rahulgarg55" }],
  creator: "Rahul Garg",
  publisher: "Northstar Digital Studio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Northstar Digital Studio — Bespoke SaaS Engineering & Product Design",
    description:
      "Crafting production-grade SaaS products, intelligent trackers, and high-velocity digital experiences.",
    url: "https://northstardigital.studio",
    siteName: "Northstar Digital Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Northstar Digital Studio — SaaS Engineering & Design",
    description: "Production-grade SaaS platforms, intelligence tools, and custom web software.",
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://northstardigital.studio/#organization",
      name: "Northstar Digital Studio",
      url: "https://northstardigital.studio",
      logo: "https://northstardigital.studio/opengraph-image",
      image: "https://northstardigital.studio/opengraph-image",
      description:
        "High-performance digital engineering studio specializing in multi-tenant SaaS development, workforce intelligence telemetry, native Electron desktop companion apps, and modern Next.js 16 architectures.",
      founder: {
        "@type": "Person",
        name: "Rahul Garg",
        jobTitle: "Founder & Lead Systems Architect",
        email: "rahul@northstardigital.com",
        sameAs: ["https://github.com/rahulgarg55", "https://linkedin.com/in/rahulgarg55"],
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "rahul@northstardigital.com",
        telephone: "+91-7807221279",
        contactType: "Customer & Architectural Inquiries",
        availableLanguage: ["English", "Hindi"],
      },
      priceRange: "$$$$",
      knowsAbout: [
        "SaaS Product Development",
        "Next.js 16 Architecture",
        "Multi-Tenant Isolation",
        "Electron Desktop Applications",
        "Workforce Telemetry & Focus Analytics",
        "GDPR Compliance Engineering",
        "Full-Stack TypeScript & React 19",
      ],
      sameAs: [
        "https://github.com/rahulgarg55/northstar-digital",
        "https://github.com/rahulgarg55",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://northstardigital.studio/#website",
      url: "https://northstardigital.studio",
      name: "Northstar Digital Studio",
      publisher: {
        "@id": "https://northstardigital.studio/#organization",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "AetherDesk Tracker",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Windows, macOS, Linux, Web",
      url: "https://northstardigital.studio/work/aetherdesk",
      description: "Enterprise workforce telemetry, multi-tenant desktop monitoring, and compliance analytics platform.",
      author: {
        "@id": "https://northstardigital.studio/#organization",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "BugTracker & Desktop Companion",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows, macOS, Linux, Web",
      url: "https://northstardigital.studio/work/bug-tracker",
      description: "Multi-tenant engineering issue tracking, sprint management SaaS, and instant Electron defect HUD companion.",
      author: {
        "@id": "https://northstardigital.studio/#organization",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "ProductivityFlow Desktop Agent",
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Windows, macOS, Linux",
      url: "https://northstardigital.studio/work/productivity-tracker",
      description: "Workforce focus telemetry agent with real-time foreground window categorization, focus scoring, and GDPR compliance.",
      author: {
        "@id": "https://northstardigital.studio/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("northstar_theme");if(t==="light"){document.documentElement.classList.remove("dark");document.documentElement.classList.add("light")}else{document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${plusJakarta.className} min-h-screen antialiased selection:bg-emerald-500/30 selection:text-emerald-500`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
