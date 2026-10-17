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
  "@type": "ProfessionalService",
  name: "Northstar Digital Studio",
  url: "https://northstardigital.studio",
  logo: "https://northstardigital.studio/logo.png",
  description:
    "Independent software and digital product studio specializing in multi-tenant SaaS development, workforce intelligence, and UI/UX design.",
  founder: {
    "@type": "Person",
    name: "Rahul Garg",
    email: "gargr0109@gmail.com",
    sameAs: ["https://github.com/rahulgarg55", "https://linkedin.com/in/rahulgarg55"],
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "gargr0109@gmail.com",
    telephone: "+91-7807221279",
    contactType: "Customer Inquiries",
  },
  priceRange: "$$$$",
  sameAs: ["https://github.com/rahulgarg55/northstar-digital"],
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
