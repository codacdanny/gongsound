"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useReveal } from "@/lib/anim";
import { titleToSlug } from "@/lib/utils";
import { useEffect, useState } from "react";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
}

export default function News() {
  const ref = useReveal<HTMLDivElement>();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        console.log("Fetched news:", data);
        const articles = Array.isArray(data) ? data.slice(0, 3) : [];
        setArticles(articles);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch news", err);
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <section id="news" ref={ref} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeading index="06" kicker="News & updates" />
            <h2 className="reveal display mt-6 max-w-2xl text-4xl text-ivory sm:text-5xl lg:text-6xl">
              Stories from the <span className="font-serif italic text-gold">culture.</span>
            </h2>
          </div>
          <Link
            href="/news"
            className="reveal link-sweep self-start text-sm font-semibold uppercase tracking-[0.16em] text-gold md:self-end"
          >
            Read more
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {!isLoading && articles.map((n, i) => (
            <Link
              key={i}
              href={`/news/${titleToSlug(n.title)}`}
              data-cursor-label="Read"
              style={{ transitionDelay: `${i * 80}ms` }}
              className="reveal group flex flex-col rounded-2xl border border-line bg-bg-raise/40 p-7 transition-colors hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-gold/40 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold">
                  {n.tag}
                </span>
                <span className="font-mono text-xs text-muted">{n.date}</span>
              </div>

              <h3 className="mt-6 font-display text-xl font-bold leading-snug text-ivory transition-colors group-hover:text-gold">
                {n.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory/60">
                {n.excerpt}
              </p>

              <span className="mt-6 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold">
                Read story
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
