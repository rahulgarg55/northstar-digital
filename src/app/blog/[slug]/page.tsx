import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react";
import { AgencyFooter, AgencyHeader, SectionEyebrow } from "@/components/agency/site";
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
          className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-8 font-medium"
          href="/blog"
        >
          <ArrowLeft size={14} /> Back to all articles
        </Link>

        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-slate-200 dark:border-white/10">
          <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-semibold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Clock size={13} /> {article.readTime}
            </span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span className="text-slate-500 dark:text-slate-400">{article.publishedAt}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
            {article.title}
          </h1>

          <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
            {article.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40 font-bold text-sm flex items-center justify-center">
                RG
              </span>
              <div>
                <strong className="text-slate-900 dark:text-white block text-sm font-semibold">{article.author.name}</strong>
                <span className="text-xs text-slate-500 dark:text-slate-400">{article.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Published by Northstar Engineering</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="max-w-none space-y-6 text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
          {article.content.split("\n\n").map((block, idx) => {
            const trimmed = block.trim();
            if (trimmed.startsWith("### ")) {
              return (
                <h2 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-6 pb-2 border-b border-slate-200 dark:border-white/5">
                  {trimmed.replace("### ", "")}
                </h2>
              );
            }
            if (trimmed.startsWith("```")) {
              const lines = trimmed.split("\n");
              const lang = lines[0].replace("```", "") || "code";
              const code = lines.slice(1, -1).join("\n");
              return (
                <div key={idx} className="my-6 rounded-xl border border-slate-800 dark:border-white/10 bg-slate-950 overflow-hidden shadow-2xl">
                  <div className="px-4 py-2 border-b border-slate-800 dark:border-white/10 bg-slate-900 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>{lang}</span>
                    <span>Snippet</span>
                  </div>
                  <pre className="p-4 text-xs sm:text-sm font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                    <code>{code}</code>
                  </pre>
                </div>
              );
            }
            if (trimmed.startsWith("1. ") || trimmed.startsWith("- ")) {
              const items = trimmed.split("\n").map((line) => line.replace(/^(\d+\.|\-)\s+/, ""));
              return (
                <ul key={idx} className="space-y-2 list-disc list-inside ml-2 text-slate-700 dark:text-slate-300">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-white/10">
          <span className="text-xs text-slate-500 dark:text-slate-400 block mb-3 uppercase tracking-wider font-semibold">
            Related Topics &amp; Technologies
          </span>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-medium"
              >
                <Tag size={12} className="text-emerald-600 dark:text-emerald-400" /> {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-10 border-t border-slate-200 dark:border-white/10">
            <SectionEyebrow>Continue Reading</SectionEyebrow>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">More from Northstar Engineering</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group rounded-xl p-6 border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/50 hover:border-emerald-500/40 hover:bg-white dark:hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between shadow-md dark:shadow-none"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mt-2 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{item.description}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-4">
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
