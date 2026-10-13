import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { AgencyFooter, AgencyHeader, SectionEyebrow } from "@/components/agency/site";
import { agencyServices } from "@/lib/agency";

export function generateStaticParams() {
  return agencyServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = agencyServices.find((item) => item.slug === slug);
  return service ? {
    title: `${service.title} — Northstar Studio`,
    description: service.description,
  } : {};
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = agencyServices.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <main className="agency-page">
      <AgencyHeader />
      <section className="agency-subpage-hero">
        <Link className="agency-back-link" href="/services"><ArrowLeft size={15} /> All services</Link>
        <SectionEyebrow>{service.category}</SectionEyebrow>
        <h1>{service.title}<br /><span>built around you.</span></h1>
        <p>{service.detail}</p>
        <Link className="agency-button agency-button-light" href={`/contact?service=${service.slug}`}>Request a quote <ArrowRight size={17} /></Link>
      </section>
      <section className="agency-detail-section">
        <div><SectionEyebrow>What to expect</SectionEyebrow><h2>Focused on what<br />moves you forward.</h2></div>
        <div className="agency-deliverables">
          {service.deliverables.map((deliverable) => (
            <div key={deliverable}><span><Check size={15} /></span>{deliverable}</div>
          ))}
          <p>We&apos;ll confirm the right scope, timeline, and pricing with you before any work begins.</p>
        </div>
      </section>
      <section className="agency-cta-section">
        <SectionEyebrow>Start with a conversation</SectionEyebrow>
        <h2>Let&apos;s talk about<br /><span>what you need.</span></h2>
        <p>We&apos;ll help you find the right next step and share a clear, no-pressure quote.</p>
        <Link className="agency-button agency-button-light" href={`/contact?service=${service.slug}`}>Get a project quote <ArrowRight size={17} /></Link>
      </section>
      <AgencyFooter />
    </main>
  );
}
