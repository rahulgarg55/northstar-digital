import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AgencyFooter, AgencyHeader, SectionEyebrow } from "@/components/agency/site";
import { agencyServices } from "@/lib/agency";

export const metadata = {
  title: "Services — Northstar Studio",
  description: "Explore web development, software, product design, mobile, SEO, content, and growth services.",
};

export default function ServicesPage() {
  return (
    <main className="agency-page">
      <AgencyHeader />
      <section className="agency-subpage-hero">
        <SectionEyebrow>Services</SectionEyebrow>
        <h1>Good work needs<br /><span>the right team.</span></h1>
        <p>From a single well-built website to a complete digital product, bring the right expertise together around what you actually need.</p>
        <Link className="agency-button agency-button-light" href="/contact">Get a tailored quote <ArrowRight size={17} /></Link>
      </section>
      <section className="agency-section agency-services-section">
        <div className="agency-service-grid">
          {agencyServices.map((service, index) => (
            <Link className="agency-service-card" href={`/services/${service.slug}`} key={service.slug}>
              <span className="agency-service-index">{String(index + 1).padStart(2, "0")} / {service.category}</span>
              <span className="agency-service-arrow"><ArrowUpRight size={18} /></span>
              <h2>{service.title}</h2><p>{service.description}</p>
              <span className="agency-card-more">View service <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>
      <section className="agency-cta-section">
        <SectionEyebrow>Custom scope, clear pricing</SectionEyebrow>
        <h2>Not sure where<br /><span>to begin?</span></h2>
        <p>Every project is different. Tell us what you have in mind and we&apos;ll put together a practical scope and quote.</p>
        <Link className="agency-button agency-button-light" href="/contact">Talk through your project <ArrowRight size={17} /></Link>
      </section>
      <AgencyFooter />
    </main>
  );
}
