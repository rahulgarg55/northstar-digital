import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import { AgencyFooter, AgencyHeader, SectionEyebrow } from "@/components/agency/site";
import { techArticles } from "@/lib/articles";

export const metadata = {
  title: "Tech Articles & Engineering Insights — Northstar Studio",
  description:
    "In-depth articles, architectural blueprints, and engineering standards for building scalable SaaS, enterprise telemetry, performance optimization, and cybersecurity.",
};

export default function BlogIndexPage() {
  const featuredArticle = techArticles[0];
  const remainingArticles = techArticles.slice(1);

  return (
    <main className="agency-page">
      <AgencyHeader />

      <section className="agency-subpage-hero">
        <SectionEyebrow>Engineering Knowledge Base</SectionEyebrow>
        <h1>Articles &amp;<br /><span>technical insights.</span></h1>
        <p>
          Architectural blueprints, performance benchmarks, and deep dives into building scalable SaaS, enterprise telemetry, and modern cloud architectures.
        </p>
      </section>

      <section className="agency-section agency-work-list">
        {/* Featured Article Card */}
        {featuredArticle && (
          <div className="mb-12">
            <Link
              href={`/blog/${featuredArticle.slug}`}
              className="agency-blog-featured-card group"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
                <span className="px-3 py-1 rounded-full font-semibold uppercase tracking-wider text-xs border"
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.12)",
                    color: "var(--agency-lime)",
                    borderColor: "rgba(16, 185, 129, 0.3)",
                  }}
                >
                  Featured · {featuredArticle.category}
                </span>
                <span className="flex items-center gap-1 font-medium" style={{ color: "var(--agency-muted)" }}>
                  <Clock size={13} /> {featuredArticle.readTime}
                </span>
                <span style={{ color: "var(--agency-muted)" }}>·</span>
                <span style={{ color: "var(--agency-muted)" }}>{featuredArticle.publishedAt}</span>
              </div>

              <h2>{featuredArticle.title}</h2>

              <p>{featuredArticle.description}</p>

              <div
                className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-6"
                style={{ borderTop: "1px solid var(--agency-line)" }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.18)",
                      color: "var(--agency-lime)",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                    }}
                  >
                    RG
                  </span>
                  <span className="text-xs font-semibold" style={{ color: "var(--agency-ink)" }}>
                    {featuredArticle.author.name}
                  </span>
                  <span className="text-xs" style={{ color: "var(--agency-muted)" }}>
                    · {featuredArticle.author.role}
                  </span>
                </div>

                <span
                  className="inline-flex items-center gap-2 text-xs font-bold group-hover:translate-x-1 transition-transform"
                  style={{ color: "var(--agency-lime)" }}
                >
                  Read full article <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {remainingArticles.map((article) => (
            <article key={article.slug} className="agency-blog-grid-card group">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span
                    className="px-2.5 py-0.5 rounded-full font-medium border text-[11px]"
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      color: "var(--agency-lime)",
                      borderColor: "rgba(16, 185, 129, 0.25)",
                    }}
                  >
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 font-medium" style={{ color: "var(--agency-muted)" }}>
                    <Clock size={12} /> {article.readTime}
                  </span>
                </div>

                <h3>
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </h3>

                <p>{article.description}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded font-mono border"
                      style={{
                        backgroundColor: "var(--agency-paper)",
                        color: "var(--agency-muted)",
                        borderColor: "var(--agency-line)",
                      }}
                    >
                      <Tag size={10} style={{ color: "var(--agency-lime)" }} /> {tag}
                    </span>
                  ))}
                </div>

                <div
                  className="flex items-center justify-between pt-4 text-xs font-medium"
                  style={{ borderTop: "1px solid var(--agency-line)" }}
                >
                  <span style={{ color: "var(--agency-muted)" }}>{article.publishedAt}</span>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1 font-bold"
                    style={{ color: "var(--agency-lime)" }}
                  >
                    Read article <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Daily Automation Announcement Banner */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="agency-automation-banner shadow-sm">
          <div className="flex items-center gap-4">
            <span
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.18)",
                color: "var(--agency-lime)",
                borderColor: "rgba(16, 185, 129, 0.35)",
              }}
            >
              <BookOpen size={24} />
            </span>
            <div>
              <strong>Automated Daily Tech Publishing Pipeline</strong>
              <p>
                Every day at 06:00 UTC, our automated engineering cron analyzes trending developer topics, generates an in-depth architectural breakdown, and auto-publishes it to Northstar Digital.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="agency-button agency-button-light shrink-0"
            style={{ minHeight: "40px", padding: "0 18px", fontSize: "12px" }}
          >
            Request Topic
          </Link>
        </div>
      </section>

      <AgencyFooter />
    </main>
  );
}
