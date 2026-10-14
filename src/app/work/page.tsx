import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AgencyFooter, AgencyHeader, SectionEyebrow } from "@/components/agency/site";
import { ProjectCaseCard } from "@/components/agency/project-case-card";
import { selectedProjects } from "@/lib/agency";

export const metadata = {
  title: "Selected work — Northstar Studio",
  description: "Explore BugTracker and ReportIQ, two live products from Northstar Studio.",
};

export default function WorkPage() {
  return (
    <main className="agency-page">
      <AgencyHeader />
      <section className="agency-subpage-hero">
        <SectionEyebrow>Selected work</SectionEyebrow>
        <h1>Real products.<br /><span>Thoughtful details.</span></h1>
        <p>Explore two live products from our workbench. Open each product or read a concise overview of what it offers.</p>
      </section>
      <section className="agency-section agency-work-list">
        <div className="agency-project-grid">
          {selectedProjects.map((project) => (
            <ProjectCaseCard key={project.slug} project={project} />
          ))}
        </div>
        <p className="agency-work-disclaimer">Product descriptions summarize the linked product pages and do not claim independently verified results. <Link href="/contact">Discuss a project <ArrowRight size={14} /></Link>.</p>
      </section>
      <AgencyFooter />
    </main>
  );
}
