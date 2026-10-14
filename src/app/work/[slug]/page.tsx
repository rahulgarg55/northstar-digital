import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { AgencyFooter, AgencyHeader, SectionEyebrow } from "@/components/agency/site";
import { selectedProjects } from "@/lib/agency";

export function generateStaticParams() {
  return selectedProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = selectedProjects.find((item) => item.slug === slug);
  return project ? { title: `${project.name} — Northstar Studio` } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = selectedProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main className="agency-page">
      <AgencyHeader />
      <article className="agency-project-page">
        <Link className="agency-back-link" href="/work"><ArrowLeft size={15} /> Selected work</Link>
        <SectionEyebrow>{project.type}</SectionEyebrow>
        <h1>{project.name}<br /><span>{project.headline}</span></h1>
        <p className="agency-project-lede">{project.description}</p>
        <div className="agency-project-live-panel">
          <span className="agency-project-mark">{project.mark}</span>
          <div>
            <strong>{project.name} is live</strong>
            <p>Visit the product to explore it for yourself.</p>
          </div>
          <a className="agency-button agency-button-light" href={project.liveUrl} target="_blank" rel="noreferrer">
            {project.liveLinkLabel} <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="agency-project-details">
          <div><SectionEyebrow>About the product</SectionEyebrow><h2>{project.headline}</h2></div>
          <div><p>{project.detail}</p><ul>{project.capabilities.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div>
        </div>
        <p className="agency-work-disclaimer">This overview summarizes the product and its public website. It does not claim independently verified performance, customer results, or outcomes.</p>
        {(project.stack.length > 0 || project.sourceUrl) && (
          <div className="agency-project-meta">
            {project.stack.length > 0 && <div><span>Built with</span><strong>{project.stack.join(" · ")}</strong></div>}
            {project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noreferrer">Explore the source repository <ArrowUpRight size={15} /></a>}
          </div>
        )}
      </article>
      <section className="agency-cta-section"><SectionEyebrow>Your product could be next</SectionEyebrow><h2>Let&apos;s build<br /><span>something useful.</span></h2><p>Tell us about the product you have in mind. We&apos;ll help turn the idea into a practical plan.</p><Link className="agency-button agency-button-light" href="/contact">Start a conversation <ArrowUpRight size={16} /></Link></section>
      <AgencyFooter />
    </main>
  );
}
