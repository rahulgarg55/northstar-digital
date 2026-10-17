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
              className="block group rounded-2xl p-8 border border-white/10 bg-slate-900/60 backdrop-blur-xl hover:border-emerald-500/40 hover:bg-slate-900/80 transition-all duration-300 shadow-2xl"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold uppercase tracking-wider">
                  Featured · {featuredArticle.category}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock size={13} /> {featuredArticle.readTime}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">{featuredArticle.publishedAt}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-3 leading-tight">
                {featuredArticle.title}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
                {featuredArticle.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-xs flex items-center justify-center">
                    RG
                  </span>
                  <span className="text-xs text-slate-300 font-medium">{featuredArticle.author.name}</span>
                </div>

                <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  Read full article <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {remainingArticles.map((article) => (
            <article
              key={article.slug}
              className="group rounded-xl p-6 border border-white/10 bg-slate-900/50 backdrop-blur-lg hover:border-emerald-500/35 hover:bg-slate-900/75 transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-emerald-400 border border-white/10 font-medium">
                    {article.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> {article.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2 leading-snug">
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {article.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5"
                    >
                      <Tag size={10} /> {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs">
                  <span className="text-slate-400">{article.publishedAt}</span>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
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
        <div className="rounded-2xl p-6 border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <BookOpen size={24} />
            </span>
            <div>
              <strong className="text-white block font-semibold text-base mb-1">
                Automated Daily Tech Publishing Pipeline
              </strong>
              <p className="text-slate-300 text-xs leading-relaxed max-w-xl">
                Every day at 06:00 UTC, our automated engineering cron analyzes trending developer topics, generates an in-depth architectural breakdown, and auto-publishes it to Northstar Digital.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Request Topic
          </Link>
        </div>
      </section>

      <AgencyFooter />
    </main>
  );
}
