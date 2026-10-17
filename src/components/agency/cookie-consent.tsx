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
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-4 rounded-xl bg-slate-900/95 border border-white/10 shadow-2xl backdrop-blur-md text-xs text-slate-300 transition-all duration-300"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <p className="leading-relaxed">
            We use strictly essential technical cookies to guarantee secure navigation and rate limiting in accordance with GDPR & CCPA. Read our{" "}
            <Link href="/privacy" className="text-white underline hover:text-emerald-400">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="text-white underline hover:text-emerald-400">
              Terms
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Essential Only
          </button>
          <button
            onClick={handleAccept}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </aside>
  );
}
