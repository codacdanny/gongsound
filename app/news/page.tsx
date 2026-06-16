"use client";

import { useState } from "react";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { NEWS } from "@/lib/content";
import { useReveal } from "@/lib/anim";
import { titleToSlug } from "@/lib/utils";

export default function NewsPage() {
  const ref = useReveal<HTMLDivElement>();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const uniqueTags = Array.from(new Set(NEWS.map((n) => n.tag)));
  const filteredNews = selectedTag ? NEWS.filter((n) => n.tag === selectedTag) : NEWS;

  return (
    <main ref={ref} className="min-h-screen bg-bg pt-32 pb-20 px-5 sm:px-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="#"
            scroll={false}
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-gold/70 transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </Link>
          <div>
            <span className="label text-gold">News & Updates</span>
            <h1 className="display text-4xl sm:text-5xl lg:text-6xl text-ivory mt-2">
              Stories from the <span className="font-serif italic text-gold">culture.</span>
            </h1>
          </div>
        </div>

        {/* Tag Filter */}
        <div className="reveal mb-12 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedTag(null)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] transition-all ${
              selectedTag === null
                ? "bg-gold text-bg"
                : "border border-gold/40 text-gold hover:border-gold hover:bg-gold/10"
            }`}
          >
            All stories
          </button>
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] transition-all ${
                selectedTag === tag
                  ? "bg-gold text-bg"
                  : "border border-gold/40 text-gold hover:border-gold hover:bg-gold/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((article, idx) => (
            <article
              key={idx}
              style={{ transitionDelay: `${(idx % 3) * 80}ms` }}
              className="reveal group flex flex-col rounded-2xl border border-gold/30 bg-bg-raise/50 p-8 hover:border-gold/60 transition-colors"
            >
              {/* Meta */}
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-gold/40 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold">
                  {article.tag}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted">
                  <Calendar className="h-3 w-3" aria-hidden />
                  {article.date}
                </span>
              </div>

              {/* Title */}
              <h2 className="display text-xl font-bold text-ivory mb-3 line-clamp-3 flex-1">
                {article.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm leading-relaxed text-ivory/60 mb-5 line-clamp-3">
                {article.excerpt}
              </p>

              {/* Author */}
              {article.author && (
                <p className="text-xs text-muted/70 mb-5 border-t border-line pt-4">
                  By {article.author}
                </p>
              )}

              {/* CTA */}
              <Link
                href={`/news/${titleToSlug(article.title)}`}
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold transition-all group-hover:translate-x-1"
              >
                Read story
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-20">
            <p className="label mb-4 text-gold">No stories found</p>
            <p className="text-ivory/60">
              Try a different filter to see more stories.
            </p>
          </div>
        )}

        {/* Subscribe CTA */}
        <div className="mt-20 rounded-2xl border border-gold/30 bg-gradient-to-b from-bg-raise/60 to-bg/40 p-10 text-center">
          <p className="label text-muted mb-3">Stay updated</p>
          <h3 className="display text-2xl text-ivory mb-4">
            Never miss a story.
          </h3>
          <p className="text-ivory/60 mb-6 max-w-md mx-auto">
            Get notified about releases, tours, and exclusive updates delivered
            to your inbox.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg"
          >
            Get updates
          </a>
        </div>
      </div>
    </main>
  );
}
