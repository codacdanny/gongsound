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
  image?: string;
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
    <section id="news" ref={ref} className="relative py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-5 md:px-8">
        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeading index="02" kicker="News & updates" />
            <h2 className="reveal display mt-4 sm:mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory">
              Stories from the <span className="font-serif italic text-gold">culture.</span>
            </h2>
          </div>
          <Link
            href="/news"
            className="reveal link-sweep self-start text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-gold md:self-end"
          >
            Read more
          </Link>
        </div>

        <div className="mt-10 sm:mt-14 grid gap-4 sm:gap-6 md:grid-cols-3">
          {!isLoading && articles.map((n, i) => (
            <Link
              key={i}
              href={`/news/${titleToSlug(n.title)}`}
              data-cursor-label="Read"
              style={{ transitionDelay: `${i * 80}ms` }}
              className="reveal group flex flex-col rounded-2xl border border-line bg-bg-raise/40 overflow-hidden transition-colors hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {n.image && (
                <div className="relative h-32 sm:h-40 w-full overflow-hidden bg-bg">
                  <img
                    src={n.image}
                    alt={n.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              <div className="flex flex-col p-4 sm:p-6 lg:p-7">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-gold/40 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[0.6rem] sm:text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold">
                    {n.tag}
                  </span>
                  <span className="font-mono text-xs text-muted whitespace-nowrap">{n.date}</span>
                </div>

                <h3 className="mt-4 sm:mt-6 font-display text-lg sm:text-xl font-bold leading-snug text-ivory transition-colors group-hover:text-gold">
                  {n.title}
                </h3>
                <p className="mt-2 sm:mt-3 flex-1 text-xs sm:text-sm leading-relaxed text-ivory/60">
                  {n.excerpt}
                </p>

                <span className="mt-4 sm:mt-6 inline-flex items-center gap-1 sm:gap-1.5 text-[0.68rem] sm:text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold">
                  Read story
                  <ArrowUpRight className="h-3 sm:h-4 w-3 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
