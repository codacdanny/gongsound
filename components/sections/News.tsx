"use client";

import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { NEWS } from "@/lib/content";
import { useReveal } from "@/lib/anim";

export default function News() {
  const ref = useReveal<HTMLDivElement>();

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
          <a
            href="#contact"
            className="reveal link-sweep self-start text-sm font-semibold uppercase tracking-[0.16em] text-gold md:self-end"
          >
            Read more
          </a>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {NEWS.map((n, i) => (
            <a
              key={i}
              href="#contact"
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
