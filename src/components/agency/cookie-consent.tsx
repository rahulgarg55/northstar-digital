"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("northstar_cookie_consent");
      if (!consent) {
        setShowConsent(true);
      }
    } catch {
      // Storage unavailable / private mode
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("northstar_cookie_consent", "accepted");
    } catch {}
    setShowConsent(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("northstar_cookie_consent", "essential_only");
    } catch {}
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <aside
      aria-label="Privacy & Cookie Consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-4 rounded-xl border backdrop-blur-md text-xs transition-all duration-300"
      style={{
        backgroundColor: "var(--agency-card-bg)",
        borderColor: "var(--agency-card-border)",
        color: "var(--agency-copy)",
        boxShadow: "var(--agency-card-shadow)",
      }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <p className="leading-relaxed">
            We use strictly essential technical cookies to guarantee secure navigation and rate limiting in accordance with GDPR &amp; CCPA. Read our{" "}
            <Link href="/privacy" className="underline font-medium" style={{ color: "var(--agency-lime)" }}>
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="underline font-medium" style={{ color: "var(--agency-lime)" }}>
              Terms
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors"
            style={{
              borderColor: "var(--agency-line)",
              color: "var(--agency-muted)",
              backgroundColor: "var(--agency-paper)",
            }}
          >
            Essential Only
          </button>
          <button
            onClick={handleAccept}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-transform hover:-translate-y-0.5"
            style={{
              backgroundColor: "var(--agency-lime)",
              color: "#ffffff",
            }}
          >
            Accept All
          </button>
        </div>
      </div>
    </aside>
  );
}
