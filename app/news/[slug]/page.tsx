"use client";

import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { NEWS } from "@/lib/content";
import { getArticleBySlug } from "@/lib/utils";
import { useReveal } from "@/lib/anim";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const ref = useReveal<HTMLDivElement>();
  const article = getArticleBySlug(resolvedParams.slug, NEWS);

  if (!article) {
    return (
      <main className="min-h-screen bg-bg pt-32 pb-20 px-5 sm:px-8">
        <div className="mx-auto max-w-[1400px] text-center py-20">
          <h1 className="display text-4xl text-ivory mb-4">Story not found.</h1>
          <p className="text-ivory/60 mb-8">
            The story you're looking for doesn't exist.
          </p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to news
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main ref={ref} className="min-h-screen bg-bg pt-32 pb-20 px-5 sm:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Back button */}
        <Link
          href="/"
          className="reveal inline-flex items-center gap-2 text-sm text-gold/70 transition-colors hover:text-gold mb-12"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>

        {/* Meta */}
        <div className="reveal mb-8 flex flex-wrap items-center gap-4">
          <span className="rounded-full border border-gold/40 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            {article.tag}
          </span>
          <div className="flex items-center gap-2 text-sm text-muted">
            <Calendar className="h-4 w-4" aria-hidden />
            {article.date}
          </div>
          {article.author && <p className="text-sm text-muted">By {article.author}</p>}
        </div>

        {/* Headline */}
        <h1 className="reveal display text-5xl sm:text-6xl lg:text-7xl text-ivory leading-tight mb-8">
          {article.title}
        </h1>

        {/* Excerpt */}
        <p className="reveal text-xl text-ivory/70 leading-relaxed mb-12 max-w-2xl">
          {article.excerpt}
        </p>

        {/* Divider */}
        <div className="reveal h-px bg-gradient-to-r from-gold/60 to-transparent mb-12" />

        {/* Body */}
        <article className="prose prose-invert max-w-none">
          <div className="space-y-6">
            {(article.body || article.excerpt).split("\n\n").map((paragraph: string, idx: number) => (
              <p
                key={idx}
                style={{ transitionDelay: `${idx * 80}ms` }}
                className="reveal text-lg leading-relaxed text-ivory/75"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* CTA */}
        <div className="reveal mt-16 rounded-2xl border border-gold/30 bg-bg-raise/50 p-10 text-center">
          <p className="label text-muted mb-3">More stories</p>
          <h3 className="display text-2xl text-ivory mb-4">Keep reading.</h3>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg"
          >
            View all articles
          </Link>
        </div>
      </div>
    </main>
  );
}
