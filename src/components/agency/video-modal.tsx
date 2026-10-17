"use client";

import { useEffect, useState } from "react";
import { X, Maximize2, ExternalLink, Film, Globe } from "lucide-react";
import type { selectedProjects } from "@/lib/agency";
import { ProductVideoPlayer } from "./product-video-player";

type Project = (typeof selectedProjects)[number];

export function VideoWalkthroughModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"tour" | "sandbox">("tour");

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} Video Walkthrough`}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl border bg-slate-950 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        style={{ borderColor: "var(--agency-card-border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className="px-5 py-3.5 flex items-center justify-between border-b"
          style={{
            borderColor: "rgba(255, 255, 255, 0.1)",
            backgroundColor: "#090d16",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs border"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.18)",
                color: "var(--agency-lime)",
                borderColor: "rgba(16, 185, 129, 0.35)",
              }}
            >
              {project.mark}
            </span>
            <div>
              <strong className="text-sm font-bold text-white block leading-tight">
                {project.name} — Full Website UI Walkthrough
              </strong>
              <span className="text-[11px] text-slate-400">
                HD 1080p · Step-by-Step Interactive Guide
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Switcher: Guided Tour vs Live Sandbox */}
            <div className="flex items-center p-1 rounded-lg bg-black/50 border border-white/10 text-xs mr-2">
              <button
                type="button"
                onClick={() => setActiveTab("tour")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${
                  activeTab === "tour"
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Film size={12} /> Guided Video Tour
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("sandbox")}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${
                  activeTab === "sandbox"
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Globe size={12} /> Live Interactive Sandbox
              </button>
            </div>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors hidden sm:inline-flex"
              title="Open Live Website in New Window"
            >
              <ExternalLink size={16} />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close walkthrough"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 bg-slate-950">
          {activeTab === "tour" ? (
            <ProductVideoPlayer project={project} autoStart={true} />
          ) : (
            <div className="rounded-xl border border-white/10 overflow-hidden bg-black flex flex-col h-[520px]">
              <div className="px-4 py-2 bg-slate-900 border-b border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Connecting to Live Instance: {project.liveUrl}</span>
                </div>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1"
                >
                  Open in New Tab <ExternalLink size={12} />
                </a>
              </div>
              <iframe
                src={project.liveUrl}
                title={`${project.name} Live Sandbox`}
                className="w-full flex-1 border-0 bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
