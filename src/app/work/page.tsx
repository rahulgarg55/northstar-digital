import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AgencyFooter, AgencyHeader, SectionEyebrow } from "@/components/agency/site";
import { ProjectCaseCard } from "@/components/agency/project-case-card";
import { InteractiveDemoShowcase } from "@/components/agency/interactive-demo-showcase";
import { selectedProjects } from "@/lib/agency";

export const metadata = {
  title: "Selected work — Northstar Studio",
  description: "Explore live products, interactive video walkthroughs, and demos from Northstar Studio.",
};

export default function WorkPage() {
  return (
    <main className="agency-page">
      <AgencyHeader />

      <section className="agency-subpage-hero">
        <SectionEyebrow>Selected work</SectionEyebrow>
        <h1>Real products.<br /><span>Thoughtful details.</span></h1>
        <p>Explore live products, interactive video simulations, and demos from our workbench. Open each project or watch the walkthrough.</p>
      </section>

      {/* Interactive Video Demos Section */}
      <section className="agency-section" style={{ paddingTop: "60px", paddingBottom: "20px" }}>
        <InteractiveDemoShowcase />
      </section>

      <section className="agency-section agency-work-list" style={{ paddingTop: "20px" }}>
        <div className="agency-section-heading" style={{ marginBottom: "28px" }}>
          <div>
            <SectionEyebrow>Product Catalog</SectionEyebrow>
            <h2>All Projects &amp; Demos</h2>
          </div>
          <p>Direct live platforms, documentation repositories, and detailed feature breakdowns.</p>
        </div>

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
