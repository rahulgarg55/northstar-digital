import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Code2, Layers3, MessageCircle, Smartphone, Sparkles } from "lucide-react";
import { AgencyFooter, AgencyHeader, SectionEyebrow } from "@/components/agency/site";
import { ProjectCaseCard } from "@/components/agency/project-case-card";
import { agencyServices, selectedProjects } from "@/lib/agency";

export const metadata = {
  title: "Northstar Studio — Thoughtful digital products, built to move you forward",
  description:
    "An independent digital studio for web development, SaaS products, e-commerce, mobile apps, product design, and custom software. Working worldwide.",
};

const capabilities = [
  { icon: Code2, title: "Web & software", detail: "Websites, full-stack apps, custom tools" },
  { icon: Layers3, title: "Product & design", detail: "SaaS, UI/UX, integrations" },
  { icon: Smartphone, title: "Growth & mobile", detail: "Mobile, SEO, content, marketing" },
];

export default function HomePage() {
  return (
    <main className="agency-page">
      <AgencyHeader />
      <section className="agency-hero">
        <div className="agency-hero-copy">
          <p className="agency-location"><span /> Independent digital studio <span className="agency-location-dot">·</span> Working worldwide</p>
          <h1>Good ideas,<br />built <span>to go further.</span></h1>
          <p className="agency-hero-description">
            We design and build digital products that make a real difference to your business—from the first clear idea to the details that make it work.
          </p>
          <div className="agency-hero-actions">
            <Link className="agency-button agency-button-light" href="/contact">Tell us what you&apos;re building <ArrowRight size={17} /></Link>
            <Link className="agency-text-link" href="/work">Explore selected work <ArrowUpRight size={16} /></Link>
          </div>
          <div className="agency-hero-proof">
            <span className="agency-proof-icon"><Check size={14} /></span>
            <span>Clear communication. Thoughtful execution. No inflated promises.</span>
          </div>
        </div>
        <div className="agency-hero-art" aria-label="A preview of a digital product interface">
          <div className="agency-orbit agency-orbit-one" />
          <div className="agency-orbit agency-orbit-two" />
          <div className="agency-product-card">
            <div className="agency-product-top"><span className="agency-product-dot" /><span>PRODUCT STUDIO</span><span>•••</span></div>
            <div className="agency-product-heading"><span>Project overview</span><span className="agency-live-dot">● LIVE</span></div>
            <div className="agency-product-stat"><strong>Ideas into impact.</strong><span>Thoughtful digital, from day one.</span></div>
            <div className="agency-product-lines"><i /><i /><i /></div>
            <div className="agency-product-bottom"><span><Check size={13} /> Strategy</span><span><Check size={13} /> Design</span><span><Check size={13} /> Build</span></div>
          </div>
          <div className="agency-float-chip agency-float-top"><Sparkles size={15} /> Made for what&apos;s next</div>
          <div className="agency-float-chip agency-float-bottom"><span className="agency-float-avatar">N.</span> One team, from idea to launch</div>
          <span className="agency-art-caption">Thoughtful by design · Built for real life</span>
        </div>
      </section>

      <section className="agency-capability-strip" aria-label="Studio capabilities">
        {capabilities.map(({ icon: Icon, title, detail }) => (
          <div className="agency-capability" key={title}>
            <span className="agency-capability-icon"><Icon size={19} /></span>
            <div><strong>{title}</strong><span>{detail}</span></div>
          </div>
        ))}
      </section>

      <section className="agency-section agency-services-section" id="services">
        <div className="agency-section-heading">
          <div><SectionEyebrow>What we do</SectionEyebrow><h2>Everything you need<br />to make it <span>happen.</span></h2></div>
          <p>One thoughtful partner across strategy, design, engineering, and growth—so good work doesn&apos;t get lost between handoffs.</p>
        </div>
        <div className="agency-service-grid">
          {agencyServices.map((service, index) => (
            <Link className="agency-service-card" href={`/services/${service.slug}`} key={service.slug}>
              <span className="agency-service-index">{String(index + 1).padStart(2, "0")} / {service.category}</span>
              <span className="agency-service-arrow"><ArrowUpRight size={18} /></span>
              <h3>{service.title}</h3><p>{service.description}</p>
            </Link>
          ))}
        </div>
        <Link className="agency-inline-link" href="/services">Explore all services <ArrowRight size={16} /></Link>
      </section>

      <section className="agency-work-section">
        <div className="agency-work-inner">
          <div className="agency-section-heading agency-work-heading">
            <div><SectionEyebrow>Selected work</SectionEyebrow><h2>Built with purpose.<br /><span>Made to work.</span></h2></div>
            <p>Explore two live products from our workbench, from engineering workflows to agency reporting.</p>
          </div>
          <div className="agency-project-grid">
            {selectedProjects.map((project) => (
              <ProjectCaseCard key={project.slug} project={project} />
            ))}
          </div>
          <Link className="agency-inline-link" href="/work">
            Explore all selected work <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="agency-section agency-approach" id="approach">
        <div className="agency-section-heading">
          <div><SectionEyebrow>How we work</SectionEyebrow><h2>Good work starts<br />with <span>good questions.</span></h2></div>
          <p>No cookie-cutter packages. We learn what matters, recommend the right-sized approach, and keep you involved all the way through.</p>
        </div>
        <div className="agency-steps">
          {[["01", "Get aligned", "We listen first—your goals, audience, constraints, and how you’ll know it’s working."], ["02", "Make a clear plan", "You get a considered scope, practical milestones, and a transparent quote before the build begins."], ["03", "Build together", "Frequent check-ins, thoughtful delivery, and a useful handoff. No black boxes."]].map(([number, title, description]) => (
            <article className="agency-step" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </section>

      <section className="agency-cta-section">
        <div className="agency-cta-orb" />
        <SectionEyebrow>A good place to start</SectionEyebrow>
        <h2>Have a big idea?<br /><span>Let&apos;s make it real.</span></h2>
        <p>Tell us where you want to go. We&apos;ll help you figure out the right next step.</p>
        <div className="agency-cta-actions">
          <Link className="agency-button agency-button-light" href="/contact">Start a conversation <ArrowRight size={17} /></Link>
          <a className="agency-button agency-button-outline" href="https://wa.me/917807221279" target="_blank" rel="noreferrer"><MessageCircle size={16} /> Chat on WhatsApp</a>
        </div>
      </section>
      <AgencyFooter />
    </main>
  );
}
