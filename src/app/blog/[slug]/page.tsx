import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react";
import { AgencyFooter, AgencyHeader, SectionEyebrow } from "@/components/agency/site";
import { ArticleShareBar } from "@/components/agency/article-share";
import { techArticles } from "@/lib/articles";

export function generateStaticParams() {
  return techArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = techArticles.find((item) => item.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} — Northstar Studio`,
    description: article.description,
    keywords: article.tags,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = techArticles.find((item) => item.slug === slug);
  if (!article) notFound();

  const relatedArticles = techArticles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Northstar Digital Studio",
      url: "https://northstardigital.studio",
    },
    keywords: article.tags.join(", "),
  };

  return (
    <main className="agency-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AgencyHeader />

      <article className="max-w-4xl mx-auto px-6 py-12">
        <Link
          className="agency-back-link"
          href="/blog"
        >
          <ArrowLeft size={14} /> Back to all articles
        </Link>

        {/* Article Header */}
        <header
          className="mb-10 pb-8"
          style={{ borderBottom: "1px solid var(--agency-line)" }}
        >
          <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
            <span
              className="px-3 py-1 rounded-full font-semibold uppercase tracking-wider text-xs border"
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.12)",
                color: "var(--agency-lime)",
                borderColor: "rgba(16, 185, 129, 0.3)",
              }}
            >
              {article.category}
            </span>
            <span className="flex items-center gap-1 font-medium" style={{ color: "var(--agency-muted)" }}>
              <Clock size={13} /> {article.readTime}
            </span>
            <span style={{ color: "var(--agency-muted)" }}>·</span>
            <span style={{ color: "var(--agency-muted)" }}>{article.publishedAt}</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight"
            style={{ color: "var(--agency-ink)" }}
          >
            {article.title}
          </h1>

          <p
            className="text-base sm:text-lg leading-relaxed mb-6 font-normal"
            style={{ color: "var(--agency-copy)" }}
          >
            {article.description}
          </p>

          <div
            className="flex flex-wrap items-center justify-between gap-4 pt-6"
            style={{ borderTop: "1px solid var(--agency-line)" }}
          >
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center border"
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.18)",
                  color: "var(--agency-lime)",
                  borderColor: "rgba(16, 185, 129, 0.35)",
                }}
              >
                RG
              </span>
              <div>
                <strong className="block text-sm font-bold" style={{ color: "var(--agency-ink)" }}>
                  {article.author.name}
                </strong>
                <span className="text-xs" style={{ color: "var(--agency-muted)" }}>
                  {article.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium" style={{ color: "var(--agency-muted)" }}>
                Published by Northstar Engineering
              </span>
            </div>
          </div>
        </header>

        <ArticleShareBar title={article.title} slug={article.slug} />

        {/* Article Body Content */}
        <div className="max-w-none space-y-6 text-sm sm:text-base leading-relaxed">
          {article.content.split("\n\n").map((block, idx) => {
            const trimmed = block.trim();
            if (trimmed.startsWith("### ")) {
              return (
                <h2
                  key={idx}
                  className="text-xl sm:text-2xl font-bold pt-6 pb-2"
                  style={{
                    color: "var(--agency-ink)",
                    borderBottom: "1px solid var(--agency-line)",
                  }}
                >
                  {trimmed.replace("### ", "")}
                </h2>
              );
            }
            if (trimmed.startsWith("```")) {
              const lines = trimmed.split("\n");
              const lang = lines[0].replace("```", "") || "code";
              const code = lines.slice(1, -1).join("\n");
              return (
                <div
                  key={idx}
                  className="my-6 rounded-xl overflow-hidden shadow-xl"
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backgroundColor: "#090e1a",
                  }}
                >
                  <div
                    className="px-4 py-2 flex items-center justify-between text-xs font-mono"
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      backgroundColor: "#060911",
                      color: "#94a3b8",
                    }}
                  >
                    <span>{lang}</span>
                    <span>Snippet</span>
                  </div>
                  <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed" style={{ color: "#34d399" }}>
                    <code>{code}</code>
                  </pre>
                </div>
              );
            }
            if (trimmed.startsWith("1. ") || trimmed.startsWith("- ")) {
              const items = trimmed.split("\n").map((line) => line.replace(/^(\d+\.|\-)\s+/, ""));
              return (
                <ul
                  key={idx}
                  className="space-y-2 list-disc list-inside ml-2"
                  style={{ color: "var(--agency-copy)" }}
                >
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p
                key={idx}
                className="leading-relaxed"
                style={{ color: "var(--agency-copy)" }}
              >
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div
          className="mt-12 pt-6"
          style={{ borderTop: "1px solid var(--agency-line)" }}
        >
          <span
            className="text-xs block mb-3 uppercase tracking-wider font-semibold"
            style={{ color: "var(--agency-muted)" }}
          >
            Related Topics &amp; Technologies
          </span>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="agency-tag-link"
                title={`Explore articles on ${tag}`}
              >
                <Tag size={12} style={{ color: "var(--agency-lime)" }} /> {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section
            className="mt-16 pt-10"
            style={{ borderTop: "1px solid var(--agency-line)" }}
          >
            <SectionEyebrow>Continue Reading</SectionEyebrow>
            <h3
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--agency-ink)" }}
            >
              More from Northstar Engineering
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="agency-blog-grid-card group"
                >
                  <div>
                    <span
                      className="text-[10px] uppercase font-bold tracking-wider"
                      style={{ color: "var(--agency-lime)" }}
                    >
                      {item.category}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-bold mt-4"
                    style={{ color: "var(--agency-lime)" }}
                  >
                    Read article <ArrowRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* CTA Section */}
      <section className="agency-cta-section">
        <SectionEyebrow>Architected for Reliability</SectionEyebrow>
        <h2>Need engineering guidance<br /><span>for your next SaaS?</span></h2>
        <p>Talk directly with our lead architects. We design and deliver high-performance production systems with zero fluff.</p>
        <Link className="agency-button agency-button-light" href="/contact">
          Schedule an Architecture Review <ArrowRight size={17} />
        </Link>
      </section>

      <AgencyFooter />
    </main>
  );
}
