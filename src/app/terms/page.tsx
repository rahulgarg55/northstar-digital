import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { AgencyFooter, AgencyHeader, SectionEyebrow } from "@/components/agency/site";

export const metadata: Metadata = {
  title: "Terms of Service — Northstar Studio",
  description: "Terms of service and commercial engagement standards for Northstar Studio.",
};

export default function TermsOfServicePage() {
  return (
    <main className="agency-page">
      <AgencyHeader />

      <section className="agency-subpage-hero">
        <Link className="agency-back-link" href="/">
          <ArrowLeft size={15} /> Back to Studio Home
        </Link>
        <SectionEyebrow>Legal Agreement</SectionEyebrow>
        <h1>Terms of Service<br /><span>engagement standards.</span></h1>
        <p>Last Updated: October 17, 2026 · Version 1.0</p>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-10 text-sm leading-relaxed" style={{ color: "var(--agency-copy)" }}>
        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--agency-ink)" }}>
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using the Northstar Studio website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--agency-ink)" }}>
            2. Scope of Services
          </h2>
          <p>
            Northstar Studio provides professional software engineering, system architecture, MERN stack development, SaaS product advisory, and UI/UX design. Specific deliverables, milestone schedules, and acceptance criteria are governed by dedicated Master Services Agreements (MSA) and Statements of Work (SOW) executed between the parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--agency-ink)" }}>
            3. Intellectual Property Rights
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>
              <strong style={{ color: "var(--agency-ink)" }}>Client Work:</strong> Upon full payment of all contractual fees, full ownership and intellectual property rights in bespoke deliverables transition to the Client according to the relevant SOW.
            </li>
            <li>
              <strong style={{ color: "var(--agency-ink)" }}>Studio IP:</strong> General architectural templates, reusable utility libraries, and open-source tooling developed independently by Northstar Studio remain the intellectual property of the Studio.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--agency-ink)" }}>
            4. Confidentiality &amp; Non-Disclosure
          </h2>
          <p>
            We uphold strict confidentiality regarding all proprietary business data, codebases, and trade secrets disclosed by our clients during the course of any discovery, proposal, or execution phase.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--agency-ink)" }}>
            5. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, Northstar Studio shall not be liable for indirect, incidental, special, consequential, or punitive damages resulting from your use of our website or services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3" style={{ color: "var(--agency-ink)" }}>
            6. Inquiries &amp; Legal Notices
          </h2>
          <p>
            For questions regarding these Terms or formal legal correspondence, please reach out to{" "}
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
