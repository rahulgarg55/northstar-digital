import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { AgencyFooter, AgencyHeader, SectionEyebrow } from "@/components/agency/site";

export const metadata: Metadata = {
  title: "Privacy Policy — Northstar Studio",
  description: "Privacy policy, data protection, and GDPR compliance details for Northstar Studio.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="agency-page">
      <AgencyHeader />

      <section className="agency-subpage-hero">
        <Link className="agency-back-link" href="/">
          <ArrowLeft size={15} /> Back to Studio Home
        </Link>
        <SectionEyebrow>Compliance &amp; Trust</SectionEyebrow>
        <h1>Privacy Policy<br /><span>data protection &amp; GDPR.</span></h1>
        <p>Effective Date: October 17, 2026 · Version 1.0 (GDPR &amp; CCPA Compliant)</p>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-sm leading-relaxed" style={{ color: "var(--agency-copy)" }}>
        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--agency-ink)" }}>
            1. Overview &amp; Commitment
          </h2>
          <p>
            Northstar Studio (&quot;we&quot;, &quot;our&quot;, or &quot;the Studio&quot;) provides bespoke digital engineering, web architecture, and UI/UX design services. We are dedicated to respecting your privacy, protecting your personal data, and complying with global privacy regulations including the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--agency-ink)" }}>
            2. Information We Collect
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>
              <strong style={{ color: "var(--agency-ink)" }}>Contact &amp; Inquiry Information:</strong> Name, work email address, company name, project scope, and budget information submitted via our project inquiry form.
            </li>
            <li>
              <strong style={{ color: "var(--agency-ink)" }}>Technical &amp; Usage Data:</strong> Anonymized server logs, browser type, device information, and IP address collected strictly for security monitoring and rate limiting.
            </li>
            <li>
              <strong style={{ color: "var(--agency-ink)" }}>Cookie Preferences:</strong> Stored locally in your browser to remember your consent preferences.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--agency-ink)" }}>
            3. Lawful Basis &amp; Use of Data
          </h2>
          <p>We process your data exclusively under the following legal bases:</p>
          <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
            <li>To respond to your inquiries and enter into contract negotiations (Legitimate Interest / Contractual necessity).</li>
            <li>To safeguard our infrastructure against spam, abuse, and DDoS attacks (Legitimate Interest).</li>
            <li>We do <strong>not</strong> sell, rent, or monetize your contact or business information to third-party data brokers.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--agency-ink)" }}>
            4. Third-Party Service Providers
          </h2>
          <p>We utilize secure, SOC2 / ISO27001-certified infrastructure vendors to deliver our services:</p>
          <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
            <li>
              <strong style={{ color: "var(--agency-ink)" }}>Resend / AWS:</strong> For transactional inquiry delivery over encrypted TLS 1.3 channels.
            </li>
            <li>
              <strong style={{ color: "var(--agency-ink)" }}>Vercel:</strong> For CDN edge routing and secure HTTPS delivery with automated DDoS shielding.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--agency-ink)" }}>
            5. Your Rights (GDPR &amp; CCPA)
          </h2>
          <p>Depending on your jurisdiction, you possess the right to:</p>
          <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
            <li>Request access to the personal data we hold about you.</li>
            <li>Request correction or complete erasure (&quot;Right to be Forgotten&quot;) of your personal data.</li>
            <li>Object to or restrict our processing of your personal information.</li>
            <li>Lodge a complaint with a competent Data Protection Authority.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--agency-ink)" }}>
            6. Data Retention &amp; Security
          </h2>
          <p>
            We enforce strict encryption in transit (HTTPS / HSTS) and at rest. Project inquiries are retained only for the duration required to evaluate and execute commercial proposals, after which they are securely archived or purged.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--agency-ink)" }}>
            7. Contact Data Controller
          </h2>
          <p>
            To exercise any privacy rights or submit a Data Subject Request, please contact our privacy desk at{" "}
            <a href="mailto:gargr0109@gmail.com" className="font-semibold underline" style={{ color: "var(--agency-lime)" }}>
              gargr0109@gmail.com
            </a>.
          </p>
        </section>
      </div>

      <AgencyFooter />
    </main>
  );
}
