"use client";

import { useState } from "react";
import { selectedProjects } from "@/lib/agency";
import { ProductVideoPlayer } from "./product-video-player";
import { VideoWalkthroughModal } from "./video-modal";
import { Play, Sparkles, Video } from "lucide-react";

export function InteractiveDemoShowcase() {
  const [selectedSlug, setSelectedSlug] = useState<string>("aetherdesk");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentProject =
    selectedProjects.find((p) => p.slug === selectedSlug) || selectedProjects[2];

  return (
    <section className="agency-demo-showcase-section my-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--agency-lime)" }}>
            <Video size={14} /> Video Walkthroughs &amp; Live Simulations
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "var(--agency-ink)" }}>
            See our products in action.
          </h2>
          <p className="text-sm mt-1 max-w-xl" style={{ color: "var(--agency-copy)" }}>
            Watch interactive simulated video walkthroughs of our workforce telemetry engines, issue workspaces, and AI reporting pipelines.
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border"
          style={{
            backgroundColor: "var(--agency-card-bg)",
            borderColor: "var(--agency-card-border)",
          }}
        >
          {selectedProjects.map((p) => {
            const isActive = p.slug === selectedSlug;
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => setSelectedSlug(p.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "font-bold shadow-sm"
                    : "hover:text-emerald-500"
                }`}
                style={{
                  backgroundColor: isActive ? "var(--agency-lime)" : "transparent",
                  color: isActive ? "#ffffff" : "var(--agency-copy)",
                }}
              >
                <span className="font-mono text-[10px] font-bold opacity-80">{p.mark}</span>
                {p.name.split(" ")[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Render the Video Player for the selected project */}
      <ProductVideoPlayer
        key={currentProject.slug}
        project={currentProject}
        onOpenTheater={() => setIsModalOpen(true)}
      />

      {/* Video Walkthrough Cinema Modal */}
      <VideoWalkthroughModal
        project={currentProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}

