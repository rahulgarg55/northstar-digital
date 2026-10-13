import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AgencyFooter, AgencyHeader, SectionEyebrow } from "@/components/agency/site";
import { featuredProject } from "@/lib/agency";

export const metadata = {
  title: "Selected work — Northstar Studio",
  description: "A look at a real in-house SaaS product, built with a modern full-stack web stack.",
};

export default function WorkPage() {
  return (
    <main className="agency-page">
      <AgencyHeader />
      <section className="agency-subpage-hero">
        <SectionEyebrow>Selected work</SectionEyebrow>
        <h1>Real products.<br /><span>Thoughtful details.</span></h1>
        <p>We share work we can stand behind. This is an in-house product; client projects will appear here only with permission and verified details.</p>
      </section>
      <section className="agency-section agency-work-list">
        <Link href={`/work/${featuredProject.slug}`} className="agency-case-card">
          <div className="agency-case-preview">
            <div className="agency-preview-window">
              <div className="agency-preview-bar"><span /><span /><span /><i>bugtracker / projects</i></div>
              <div className="agency-preview-app"><div className="agency-preview-sidebar"><b>BT</b><i /><i /><i /><i /></div><div className="agency-preview-content"><div className="agency-preview-kicker">WORKSPACE / OVERVIEW</div><strong>Engineering, in sync.</strong><div className="agency-preview-widgets"><i /><i /><i /></div><div className="agency-preview-task"><span /><i /><em /></div><div className="agency-preview-task"><span /><i /><em /></div><div className="agency-preview-task"><span /><i /><em /></div></div></div>
            </div>
            <span className="agency-preview-label">Interface preview · In-house product</span>
          </div>
          <div className="agency-case-info"><span className="agency-case-type">{featuredProject.type}</span><div className="agency-case-title"><h2>{featuredProject.name}</h2><span className="agency-round-arrow"><ArrowUpRight size={19} /></span></div><p>{featuredProject.description}</p><span className="agency-case-stack">{featuredProject.stack.map((item) => <i key={item}>{item}</i>)}</span></div>
        </Link>
        <p className="agency-work-disclaimer">No invented client logos, testimonials, or performance claims. Want to see a project relevant to your needs? <Link href="/contact">Ask us directly <ArrowRight size={14} /></Link>.</p>
      </section>
      <AgencyFooter />
    </main>
  );
}
