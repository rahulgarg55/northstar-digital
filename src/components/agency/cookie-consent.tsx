"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, ShieldCheck, Check, Settings2, X, Lock, Sliders, ExternalLink } from "lucide-react";

interface CookieSettings {
  necessary: boolean;
  performance: boolean;
  functional: boolean;
  analytics: boolean;
  timestamp: string;
}

const DEFAULT_SETTINGS: CookieSettings = {
  necessary: true,
  performance: true,
  functional: true,
  analytics: true,
  timestamp: "",
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("northstar_cookie_consent_v2");
      if (stored) {
        setSettings(JSON.parse(stored));
      } else {
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }

    // Listen for custom event to reopen preferences from footer
    const handleOpenPreferences = () => {
      setShowModal(true);
    };

    window.addEventListener("open-cookie-preferences", handleOpenPreferences);
    return () => {
      window.removeEventListener("open-cookie-preferences", handleOpenPreferences);
    };
  }, []);

  const saveSettings = (newSettings: CookieSettings) => {
    try {
      const payload = { ...newSettings, timestamp: new Date().toISOString() };
      localStorage.setItem("northstar_cookie_consent_v2", JSON.stringify(payload));
      localStorage.setItem("northstar_cookie_consent", "accepted");
      setSettings(payload);
    } catch {}
    setShowBanner(false);
    setShowModal(false);
  };

  const handleAcceptAll = () => {
    saveSettings({
      necessary: true,
      performance: true,
      functional: true,
      analytics: true,
      timestamp: new Date().toISOString(),
    });
  };

  const handleRejectNonEssential = () => {
    saveSettings({
      necessary: true,
      performance: false,
      functional: false,
      analytics: false,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <>
      {/* Enterprise Cookie Banner */}
      {showBanner && !showModal && (
        <aside
          aria-label="Enterprise Cookie & Privacy Notice"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-50 p-5 rounded-2xl border backdrop-blur-xl shadow-2xl text-xs transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
          style={{
            backgroundColor: "rgba(10, 15, 26, 0.96)",
            borderColor: "rgba(255, 255, 255, 0.15)",
            color: "#e2e8f0",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.15)",
                    borderColor: "rgba(16, 185, 129, 0.4)",
                    color: "#10b981",
                  }}
                >
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-white text-sm font-bold tracking-tight">
                      Enterprise Cookie &amp; Data Governance
                    </strong>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      GDPR &amp; CCPA
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    ISO/IEC 27001 &amp; SOC-2 Type II telemetry principles
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowBanner(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
                aria-label="Dismiss banner"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">
              We use strictly necessary cookies to ensure secure session boundaries, rate limiting, and zero-trust multi-tenancy. With your consent, we also collect anonymized telemetry to optimize latency and UI responsiveness in accordance with GDPR Art. 6(1)(a). Review our{" "}
              <Link href="/privacy" className="text-emerald-400 hover:underline font-semibold">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-emerald-400 hover:underline font-semibold">
                Terms of Service
              </Link>.
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <Sliders size={13} /> Customize Preferences
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-3.5 py-1.5 rounded-lg border text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-950 transition-transform hover:-translate-y-0.5 cursor-pointer shadow-md"
                  style={{
                    backgroundColor: "#10b981",
                  }}
                >
                  Accept All Cookies
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Enterprise Cookie Preferences Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Manage Cookie Preferences"
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl border bg-slate-950 p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-200"
            style={{
              borderColor: "rgba(255, 255, 255, 0.15)",
              backgroundColor: "#070b14",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    Enterprise Privacy &amp; Cookie Preferences
                  </h3>
                  <span className="text-xs text-slate-400">
                    Compliant with EU GDPR (2016/679) &amp; California CPRA
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body - Category Accordion/Cards */}
            <div className="overflow-y-auto py-4 space-y-3 flex-1 pr-1">
              {/* Category 1: Strictly Necessary */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <Lock size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-semibold text-white">
                          Strictly Necessary Cookies
                        </strong>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-emerald-400 border border-emerald-400/20">
                          Always Active
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Required for core application functionality: authentication tokens, multi-tenant workspace routing, CSRF cryptographic verification, and Cloudflare DDoS rate limiting. Cannot be turned off.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category 2: Performance & Telemetry */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <strong className="text-sm font-semibold text-white block">
                      Performance &amp; Edge Telemetry
                    </strong>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Collects synthetic edge latency measurements and Web Vitals to optimize asset delivery across global Cloudflare and Vercel edge points.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={settings.performance}
                      onChange={(e) => setSettings({ ...settings, performance: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>

              {/* Category 3: Functional Experience */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <strong className="text-sm font-semibold text-white block">
                      Functional &amp; Workspace Memory
                    </strong>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Remembers user interface customizations such as Dark/Light mode theme selections, interactive video walkthrough speeds, audio mute states, and collapsed sidebar preferences.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={settings.functional}
                      onChange={(e) => setSettings({ ...settings, functional: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>

              {/* Category 4: Analytics & Feedback */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <strong className="text-sm font-semibold text-white block">
                      Aggregated Analytics
                    </strong>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Provides anonymized usage metrics on product documentation, case studies, and demo interactive previews without collecting any personally identifiable information (PII).
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={settings.analytics}
                      onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs">
              <Link
                href="/privacy"
                target="_blank"
                className="text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                Read Privacy Documentation <ExternalLink size={12} />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => saveSettings(settings)}
                  className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors cursor-pointer"
                >
                  Save My Preferences
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all cursor-pointer shadow-md"
                >
                  Accept All Cookies
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
