"use client";

import { useState } from "react";
import { ArrowRight, Calculator, Check, Clock, Sparkles } from "lucide-react";

interface EstimatorOption {
  id: string;
  label: string;
  price: number;
  weeks: number;
}

const ARCHETYPES: EstimatorOption[] = [
  { id: "saas", label: "Multi-Tenant SaaS Platform", price: 7500, weeks: 4 },
  { id: "desktop", label: "Native Desktop Companion / Agent", price: 4500, weeks: 3 },
  { id: "fullstack", label: "Full-Stack Web App (MERN/Next.js)", price: 4000, weeks: 3 },
  { id: "marketing", label: "High-Performance Digital Studio Site", price: 2500, weeks: 2 },
];

const ADDONS: EstimatorOption[] = [
  { id: "multi-tenant", label: "Edge Multi-Tenancy & Subdomain Isolation", price: 1800, weeks: 1 },
  { id: "offline-sync", label: "Offline Queue & Resilient Cloud Sync", price: 1500, weeks: 1 },
  { id: "telemetry", label: "Real-Time Telemetry & Focus Scoring", price: 2000, weeks: 1 },
  { id: "billing", label: "Stripe Billing & Subscription Webhooks", price: 1200, weeks: 0.5 },
  { id: "compliance", label: "GDPR Article 15/17 & SOC2 Data Vault", price: 1500, weeks: 1 },
];

export function ScopeEstimator({
  onApplyScope,
}: {
  onApplyScope?: (scopeSummary: string, budgetTier: string) => void;
}) {
  const [selectedArchetype, setSelectedArchetype] = useState<string>("saas");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    "multi-tenant",
    "offline-sync",
  ]);
  const [applied, setApplied] = useState(false);

  function toggleAddon(id: string) {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  const base = ARCHETYPES.find((a) => a.id === selectedArchetype) || ARCHETYPES[0];
  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const item = ADDONS.find((a) => a.id === id);
    return acc + (item ? item.price : 0);
  }, 0);
  const addonsWeeks = selectedAddons.reduce((acc, id) => {
    const item = ADDONS.find((a) => a.id === id);
    return acc + (item ? item.weeks : 0);
  }, 0);

  const totalMin = base.price + addonsTotal;
  const totalMax = Math.round(totalMin * 1.35);
  const totalWeeks = Math.ceil(base.weeks + addonsWeeks);

  function handleApply() {
    const addonLabels = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.label)
      .filter(Boolean)
      .join(", ");

    const summary = `Project Scope Estimate:
- Archetype: ${base.label}
- Core Capabilities: ${addonLabels || "Core standard build"}
- Estimated Delivery: ${totalWeeks} Weeks
- Estimated Budget Range: $${totalMin.toLocaleString()} - $${totalMax.toLocaleString()}`;

    let budgetTier = "$5,000–$10,000";
    if (totalMin >= 10000) budgetTier = "$10,000+";
    else if (totalMin < 5000) budgetTier = "$2,500–$5,000";

    if (onApplyScope) {
      onApplyScope(summary, budgetTier);
    } else {
      // Auto-fill form fields in DOM if present
      const textarea = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
      if (textarea) {
        textarea.value = summary + "\n\nAdditional Requirements:\n";
        textarea.focus();
      }
      const budgetSelect = document.querySelector('select[name="budget"]') as HTMLSelectElement;
      if (budgetSelect) {
        budgetSelect.value = budgetTier;
      }
    }

    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  }

  return (
    <div className="rounded-2xl border p-6 bg-white/[0.02] border-white/10 mb-8 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-4">
        <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Calculator size={18} />
        </span>
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            Interactive Scope & Investment Estimator
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Live Architecture Pricing
            </span>
          </h3>
          <p className="text-xs text-zinc-400">
            Select your architectural goals to calculate transparent timelines and investment brackets.
          </p>
        </div>
      </div>

      {/* Step 1: Project Archetype */}
      <div className="mb-5">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
          1. Select Core Platform Archetype
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {ARCHETYPES.map((arch) => (
            <button
              type="button"
              key={arch.id}
              onClick={() => setSelectedArchetype(arch.id)}
              className={`text-left p-3 rounded-xl border text-xs transition-all ${
                selectedArchetype === arch.id
                  ? "bg-emerald-500/15 border-emerald-500/50 text-white shadow-sm shadow-emerald-500/20"
                  : "bg-white/[0.02] border-white/10 text-zinc-300 hover:border-white/20"
              }`}
            >
              <div className="font-semibold text-sm mb-0.5">{arch.label}</div>
              <div className="text-zinc-400 text-[11px]">
                Base from ${arch.price.toLocaleString()} · ~{arch.weeks} wks
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Architecture Capabilities */}
      <div className="mb-6">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
          2. Required Architecture Modules & Modules
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ADDONS.map((addon) => {
            const isSelected = selectedAddons.includes(addon.id);
            return (
              <button
                type="button"
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                  isSelected
                    ? "bg-cyan-500/10 border-cyan-500/40 text-white"
                    : "bg-white/[0.01] border-white/5 text-zinc-400 hover:border-white/15"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                      isSelected
                        ? "bg-cyan-500 border-cyan-400 text-black font-bold"
                        : "border-white/20 text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  <span>{addon.label}</span>
                </div>
                <span className="font-mono text-[11px] text-zinc-400">
                  +${addon.price.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculation Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[10px] uppercase font-semibold text-zinc-400 block">
              Estimated Investment
            </span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono">
              ${totalMin.toLocaleString()} – ${totalMax.toLocaleString()}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-semibold text-zinc-400 block">
              Target Delivery
            </span>
            <span className="text-sm font-bold text-white flex items-center gap-1 font-mono">
              <Clock size={14} className="text-cyan-400" />
              {totalWeeks}–{totalWeeks + 2} Weeks
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20"
        >
          {applied ? (
            <>
              <Check size={14} /> Scope Applied to Form
            </>
          ) : (
            <>
              <Sparkles size={14} /> Apply Scope to Inquiry Form <ArrowRight size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
