import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Northstar Studio — Thoughtful digital products",
    template: "%s | Northstar Studio",
  },
  description:
    "An independent digital studio for web development, SaaS products, e-commerce, mobile apps, product design, and custom software.",
};

import { CookieConsent } from "@/components/agency/cookie-consent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
