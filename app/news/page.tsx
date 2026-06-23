"use client";

import { useState, useEffect } from "react";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useReveal } from "@/lib/anim";
import { titleToSlug } from "@/lib/utils";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  body?: string;
  tag: string;
  date: string;
  author?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function NewsPage() {
  const ref = useReveal<HTMLDivElement>();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/news");
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const uniqueTags = Array.from(new Set(news.map((n) => n.tag)));
  const filteredNews = selectedTag ? news.filter((n) => n.tag === selectedTag) : news;

  return (
    <main ref={ref} className="min-h-screen bg-bg pt-32 pb-20 px-5 sm:px-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <p className="text-ivory/60">Loading news...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="label mb-4 text-gold">Error</p>
            <p className="text-ivory/60">{error}</p>
          </div>
        )}

        {/* Tag Filter */}
        {!loading && !error && (
        <div className="reveal mb-12 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedTag(null)}
            className={`rounded-full px-5 py-3 sm:py-2.5 text-sm font-semibold uppercase tracking-[0.14em] transition-all ${
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
              className={`rounded-full px-5 py-3 sm:py-2.5 text-sm font-semibold uppercase tracking-[0.14em] transition-all ${
                selectedTag === tag
                  ? "bg-gold text-bg"
                  : "border border-gold/40 text-gold hover:border-gold hover:bg-gold/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        )}

        {/* News Grid */}
        {!loading && !error && (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((article, idx) => (
                <article
                  key={article.id}
                  style={{ transitionDelay: `${(idx % 3) * 80}ms` }}
                  className="reveal group flex flex-col rounded-2xl border border-gold/30 bg-bg-raise/50 overflow-hidden hover:border-gold/60 transition-colors"
                >
                  {/* Image */}
                  {article.image && (
                    <div className="relative h-40 w-full overflow-hidden bg-bg">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex flex-col p-8">
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
                      className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold transition-all hover:bg-gold hover:text-bg"
                    >
                      Read story
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
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
          </>
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
            href="mailto:3point6@gongsoundentertainment.com"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg"
          >
            Get updates
          </a>
        </div>
      </div>
    </main>
  );
}
