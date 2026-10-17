import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Northstar Studio",
  description: "Terms of service and commercial engagement standards for Northstar Studio.",
};

export default function TermsOfServicePage() {
  return (
    <main className="agency-main py-16 px-6 max-w-4xl mx-auto text-slate-200">
      <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors mb-8 inline-block">
        ← Back to Studio Home
      </Link>

      <div className="border-b border-white/10 pb-8 mb-10">
        <span className="text-xs uppercase tracking-widest text-slate-400">Legal Agreement</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">Terms of Service</h1>
        <p className="text-sm text-slate-400 mt-2">Last Updated: October 17, 2026 · Version 1.0</p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-white mb-2">1. Agreement to Terms</h2>
          <p>
            By accessing or using the Northstar Studio website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">2. Scope of Services</h2>
          <p>
            Northstar Studio provides professional software engineering, system architecture, MERN stack development, SaaS product advisory, and UI/UX design. Specific deliverables, milestone schedules, and acceptance criteria are governed by dedicated Master Services Agreements (MSA) and Statements of Work (SOW) executed between the parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">3. Intellectual Property Rights</h2>
          <ul className="list-disc list-inside space-y-1.5 ml-2">
            <li><strong className="text-white">Client Work:</strong> Upon full payment of all contractual fees, full ownership and intellectual property rights in bespoke deliverables transition to the Client according to the relevant SOW.</li>
            <li><strong className="text-white">Studio IP:</strong> General architectural templates, reusable utility libraries, and open-source tooling developed independently by Northstar Studio remain the intellectual property of the Studio.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">4. Confidentiality & Non-Disclosure</h2>
          <p>
            We uphold strict confidentiality regarding all proprietary business data, codebases, and trade secrets disclosed by our clients during the course of any discovery, proposal, or execution phase.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, Northstar Studio shall not be liable for indirect, incidental, special, consequential, or punitive damages resulting from your use of our website or services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">6. Inquiries & Legal Notices</h2>
          <p>
            For questions regarding these Terms or formal legal correspondence, please reach out to{" "}
            <a href="mailto:gargr0109@gmail.com" className="text-emerald-400 hover:underline">
              gargr0109@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
