import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { AgencyFooter, AgencyHeader, SectionEyebrow } from "@/components/agency/site";
import { featuredProject } from "@/lib/agency";

export function generateStaticParams() {
  return [{ slug: featuredProject.slug }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return slug === featuredProject.slug ? { title: `${featuredProject.name} — Northstar Studio` } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== featuredProject.slug) notFound();

  return (
    <main className="agency-page">
      <AgencyHeader />
      <article className="agency-project-page">
        <Link className="agency-back-link" href="/work"><ArrowLeft size={15} /> Selected work</Link>
        <SectionEyebrow>{featuredProject.type}</SectionEyebrow>
        <h1>{featuredProject.name}<br /><span>Engineering, in sync.</span></h1>
        <p className="agency-project-lede">{featuredProject.description}</p>
        <div className="agency-case-preview agency-case-preview-large">
          <div className="agency-preview-window">
            <div className="agency-preview-bar"><span /><span /><span /><i>bugtracker / projects</i></div>
            <div className="agency-preview-app"><div className="agency-preview-sidebar"><b>BT</b><i /><i /><i /><i /></div><div className="agency-preview-content"><div className="agency-preview-kicker">WORKSPACE / OVERVIEW</div><strong>Engineering, in sync.</strong><div className="agency-preview-widgets"><i /><i /><i /></div><div className="agency-preview-task"><span /><i /><em /></div><div className="agency-preview-task"><span /><i /><em /></div><div className="agency-preview-task"><span /><i /><em /></div></div></div>
          </div>
          <span className="agency-preview-label">Interface preview · In-house product</span>
        </div>
        <div className="agency-project-details">
          <div><SectionEyebrow>About the product</SectionEyebrow><h2>Less friction between<br />report and resolution.</h2></div>
          <div><p>BugTracker is an engineering management SaaS product for teams that want their issue tracking, project work, and release planning in one place. This listing describes the capabilities in the repository; it does not claim client results or a public production deployment.</p><ul>{featuredProject.capabilities.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div>
        </div>
        <div className="agency-project-meta"><div><span>Built with</span><strong>{featuredProject.stack.join(" · ")}</strong></div><a href={featuredProject.sourceUrl} target="_blank" rel="noreferrer">Explore the source repository <ArrowUpRight size={15} /></a></div>
      </article>
      <section className="agency-cta-section"><SectionEyebrow>Your product could be next</SectionEyebrow><h2>Let&apos;s build<br /><span>something useful.</span></h2><p>Tell us about the product you have in mind. We&apos;ll help turn the idea into a practical plan.</p><Link className="agency-button agency-button-light" href="/contact">Start a conversation <ArrowUpRight size={16} /></Link></section>
      <AgencyFooter />
    </main>
  );
}
