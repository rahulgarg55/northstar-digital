"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { selectedProjects } from "@/lib/agency";
import { ProductVideoPlayer } from "./product-video-player";
import { VideoWalkthroughModal } from "./video-modal";

type Project = (typeof selectedProjects)[number];

export function ProjectDemoSection({ project }: { project: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="agency-project-demo-wrapper">
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="agency-project-demo-btn cursor-pointer"
        >
          <Play size={12} className="fill-current" /> Open Walkthrough in Theater Mode
        </button>
      </div>

      <ProductVideoPlayer
        project={project}
        onOpenTheater={() => setIsModalOpen(true)}
      />

      <VideoWalkthroughModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
