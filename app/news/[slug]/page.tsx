"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
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

export default function ArticlePage() {
  const ref = useReveal<HTMLDivElement>();
  const [slug, setSlug] = useState("");
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pathSlug = window.location.pathname.split("/").pop() || "";
    setSlug(pathSlug);
  }, []);

  useEffect(() => {
    if (!slug) return;

    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/news");
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        const newsItems = Array.isArray(data) ? data : [];
        const foundArticle = newsItems.find(
          (a) => titleToSlug(a.title) === slug
        );
        setArticle(foundArticle || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-bg pt-32 pb-20 px-5 sm:px-8">
        <div className="mx-auto max-w-[1400px] text-center py-20">
          <p className="text-ivory/60">Loading article...</p>
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="min-h-screen bg-bg pt-32 pb-20 px-5 sm:px-8">
        <div className="mx-auto max-w-[1400px] text-center py-20">
          <h1 className="display text-4xl text-ivory mb-4">Story not found.</h1>
          <p className="text-ivory/60 mb-8">
            {error || "The story you're looking for doesn't exist."}
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

        {/* Feature Image */}
        {article.image && (
          <div className="reveal mb-12 rounded-2xl overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Divider */}
        <div className="reveal h-px bg-gradient-to-r from-gold/60 to-transparent mb-12" />

        {/* Body */}
        <article className="prose prose-invert max-w-none">
          <div className="space-y-6">
            {(article.body || article.excerpt).split("\n\n").map((paragraph: string, idx: number) => (
              <p
                key={`${article.id}-p-${idx}`}
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
