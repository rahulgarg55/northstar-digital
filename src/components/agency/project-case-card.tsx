"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import type { selectedProjects } from "@/lib/agency";
import { VideoWalkthroughModal } from "./video-modal";

type Project = (typeof selectedProjects)[number];

export function ProjectCaseCard({ project }: { project: Project }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <article className="agency-project-card">
        <Link
          className="agency-project-identity"
          href={`/work/${project.slug}`}
          aria-label={`Read the ${project.name} product overview`}
        >
          <span className="agency-project-mark">{project.mark}</span>
          <span className="agency-project-live"><i /> {project.liveStatusLabel}</span>
          <span className="agency-project-identity-name">{project.name}</span>
          <span className="agency-project-identity-type">{project.type}</span>
        </Link>
        <div className="agency-project-card-info">
          <span className="agency-case-type">{project.type}</span>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="agency-project-card-actions">
            <Link className="agency-project-overview-link" href={`/work/${project.slug}`}>
              Product overview <ArrowRight size={15} />
            </Link>
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="agency-project-demo-btn"
              aria-label={`Watch ${project.name} video walkthrough`}
            >
              <Play size={12} className="fill-current" /> Watch Demo
            </button>
            <a
              className="agency-project-visit-link"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              {project.liveLinkLabel} <ArrowUpRight size={15} />
            </a>
            {project.sourceUrl && (
              <a
                className="agency-project-repo-link"
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                GitHub repository <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>
      </article>

      <VideoWalkthroughModal
        project={project}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </>
  );
}

