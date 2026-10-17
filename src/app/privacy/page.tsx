import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Northstar Studio",
  description: "Privacy policy, data protection, and GDPR compliance details for Northstar Studio.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="agency-main py-16 px-6 max-w-4xl mx-auto text-slate-200">
      <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors mb-8 inline-block">
        ← Back to Studio Home
      </Link>

      <div className="border-b border-white/10 pb-8 mb-10">
        <span className="text-xs uppercase tracking-widest text-slate-400">Compliance & Trust</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">Privacy Policy</h1>
        <p className="text-sm text-slate-400 mt-2">Effective Date: October 17, 2026 · Version 1.0 (GDPR & CCPA Compliant)</p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-white mb-2">1. Overview & Commitment</h2>
          <p>
            Northstar Studio (&quot;we&quot;, &quot;our&quot;, or &quot;the Studio&quot;) provides bespoke digital engineering, web architecture, and UI/UX design services. We are dedicated to respecting your privacy, protecting your personal data, and complying with global privacy regulations including the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">2. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1.5 ml-2">
            <li><strong className="text-white">Contact & Inquiry Information:</strong> Name, work email address, company name, project scope, and budget information submitted via our project inquiry form.</li>
            <li><strong className="text-white">Technical & Usage Data:</strong> Anonymized server logs, browser type, device information, and IP address collected strictly for security monitoring and rate limiting.</li>
            <li><strong className="text-white">Cookie Preferences:</strong> Stored locally in your browser to remember your consent preferences.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">3. Lawful Basis & Use of Data</h2>
          <p>
            We process your data exclusively under the following legal bases:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
            <li>To respond to your inquiries and enter into contract negotiations (Legitimate Interest / Contractual necessity).</li>
            <li>To safeguard our infrastructure against spam, abuse, and DDoS attacks (Legitimate Interest).</li>
            <li>We do <strong>not</strong> sell, rent, or monetize your contact or business information to third-party data brokers.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">4. Third-Party Service Providers</h2>
          <p>
            We utilize secure, SOC2 / ISO27001-certified infrastructure vendors to deliver our services:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
            <li><strong>Resend / AWS:</strong> For transactional inquiry delivery over encrypted TLS 1.3 channels.</li>
            <li><strong>Vercel:</strong> For CDN edge routing and secure HTTPS delivery with automated DDoS shielding.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">5. Your Rights (GDPR & CCPA)</h2>
          <p>
            Depending on your jurisdiction, you possess the right to:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
            <li>Request access to the personal data we hold about you.</li>
            <li>Request correction or complete erasure (&quot;Right to be Forgotten&quot;) of your personal data.</li>
            <li>Object to or restrict our processing of your personal information.</li>
            <li>Lodge a complaint with a competent Data Protection Authority.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">6. Data Retention & Security</h2>
          <p>
            We enforce strict encryption in transit (HTTPS / HSTS) and at rest. Project inquiries are retained only for the duration required to evaluate and execute commercial proposals, after which they are securely archived or purged.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">7. Contact Data Controller</h2>
          <p>
            To exercise any privacy rights or submit a Data Subject Request, please contact our privacy desk at{" "}
            <a href="mailto:gargr0109@gmail.com" className="text-emerald-400 hover:underline">
              gargr0109@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
