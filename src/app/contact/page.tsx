import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { AgencyFooter, AgencyHeader, SectionEyebrow } from "@/components/agency/site";
import { ContactForm } from "@/components/agency/contact-form";
import { ScopeEstimator } from "@/components/agency/scope-estimator";
import { agencyServices } from "@/lib/agency";

export const metadata = {
  title: "Start a project — Northstar Studio",
  description: "Tell us about your project and get a thoughtful, no-pressure quote from Northstar Studio.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service: serviceSlug } = await searchParams;
  const initialService = agencyServices.find((service) => service.slug === serviceSlug)?.title ?? "";

  return (
    <main className="agency-page">
      <AgencyHeader />
      <section className="agency-contact-layout">
        <div className="agency-contact-intro">
          <SectionEyebrow>Start a project</SectionEyebrow>
          <h1>Tell us what<br /><span>you&apos;re dreaming up.</span></h1>
          <p>Share a few details and we&apos;ll get back to you with a thoughtful next step—no pressure, no generic pitch.</p>
          <div className="agency-contact-methods">
            <a href="mailto:rahul@northstardigital.com"><span><Mail size={17} /></span><div><small>Studio & Inquiries</small><strong>rahul@northstardigital.com</strong></div><ArrowUpRight size={15} /></a>
            <a href="mailto:gargr0109@gmail.com"><span><Mail size={17} /></span><div><small>Direct Engineering</small><strong>gargr0109@gmail.com</strong></div><ArrowUpRight size={15} /></a>
            <a href="tel:+917807221279"><span><Phone size={17} /></span><div><small>Call us</small><strong>+91 78072 21279</strong></div><ArrowUpRight size={15} /></a>
            <a href="https://wa.me/917807221279" target="_blank" rel="noreferrer"><span><MessageCircle size={17} /></span><div><small>WhatsApp</small><strong>Message us directly</strong></div><ArrowUpRight size={15} /></a>
          </div>
          <p className="agency-contact-note">Based in India · Working with teams worldwide</p>
          <p className="agency-contact-note"><Link href="/services">Browse services <ArrowUpRight size={13} /></Link></p>
        </div>
        <div className="agency-form-panel">
          <div className="agency-form-heading"><h2>A little about your project</h2><p>Fields marked with * are required.</p></div>
          <ScopeEstimator />
          <ContactForm initialService={initialService} />
        </div>
      </section>
      <AgencyFooter />
    </main>
  );
}
