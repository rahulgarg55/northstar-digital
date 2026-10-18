"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

interface ArticleShareProps {
  title: string;
  slug: string;
}

export function ArticleShareBar({ title, slug }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);
  const articleUrl = `https://northstardigital.studio/blog/${slug}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${title} by @rahulgarg55`
  )}&url=${encodeURIComponent(articleUrl)}`;

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    articleUrl
  )}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-5 rounded-xl border bg-white/[0.02] border-white/10 my-8">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Share2 size={14} className="text-emerald-400" />
        <span>Share Architecture Note</span>
      </div>

      <div className="flex items-center gap-3">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-colors flex items-center gap-1.5 text-zinc-300 hover:text-white"
        >
          <span>Post on 𝕏</span>
        </a>

        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-colors flex items-center gap-1.5 text-zinc-300 hover:text-white"
        >
          <span>Share on LinkedIn</span>
        </a>

        <button
          onClick={handleCopy}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 hover:bg-white/5 transition-colors flex items-center gap-1.5 text-zinc-300 hover:text-white"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
