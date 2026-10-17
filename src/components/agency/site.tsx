import Link from "next/link";
import { ArrowDownRight, ArrowRight, Asterisk } from "lucide-react";

export function AgencyHeader() {
  return (
    <header className="agency-header">
      <nav className="agency-nav" aria-label="Main navigation">
        <Link className="agency-brand" href="/" aria-label="Northstar Studio home">
          <span className="agency-brand-mark">N.</span>
          <span>north<span className="agency-brand-light">star</span></span>
        </Link>
        <div className="agency-nav-links">
          <Link href="/services">Services</Link>
          <Link href="/work">Selected work</Link>
          <Link href="/blog">Articles</Link>
          <Link href="/#approach">Approach</Link>
        </div>
        <Link className="agency-nav-cta" href="/contact">
          Let&apos;s talk <ArrowRight size={15} />
        </Link>
        <details className="agency-mobile-menu">
          <summary aria-label="Open navigation menu"><span /><span /></summary>
          <div className="agency-mobile-links">
            <Link href="/services">Services</Link>
            <Link href="/work">Selected work</Link>
            <Link href="/blog">Articles</Link>
            <Link href="/#approach">Approach</Link>
            <Link href="/contact">Start a project <ArrowRight size={15} /></Link>
          </div>
        </details>
      </nav>
    </header>
  );
}

export function AgencyFooter() {
  return (
    <footer className="agency-footer">
      <div className="agency-footer-main">
        <div>
          <Link className="agency-brand" href="/">
            <span className="agency-brand-mark">N.</span>
            <span>north<span className="agency-brand-light">star</span></span>
          </Link>
          <p>Good ideas deserve thoughtful execution.</p>
        </div>
        <div className="agency-footer-links">
          <a href="mailto:gargr0109@gmail.com">Email</a>
          <a href="https://wa.me/917807221279" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="tel:+917807221279">Call</a>
          <Link href="/services">Services</Link>
          <Link href="/work">Work</Link>
          <Link href="/blog">Articles</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
      <div className="agency-footer-bottom">
        <span>© {new Date().getFullYear()} Northstar Studio</span>
        <span>Independent digital studio · Working worldwide · GDPR & CCPA Compliant</span>
      </div>
    </footer>
  );
}

export function ArrowLabel({ children }: { children: React.ReactNode }) {
  return <span className="agency-arrow-label">{children}<ArrowDownRight size={15} /></span>;
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="agency-eyebrow"><Asterisk size={15} strokeWidth={2.5} />{children}</p>
  );
}
