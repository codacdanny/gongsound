"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, Ticket } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { TOURS } from "@/lib/content";
import { useReveal } from "@/lib/anim";
import { titleToSlug } from "@/lib/utils";

export default function Tours() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="tours" ref={ref} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeading index="05" kicker="Events & tours" />
            <h2 className="reveal display mt-6 max-w-2xl text-4xl text-ivory sm:text-5xl lg:text-6xl">
              The movement <span className="text-gold-grad">begins at home.</span>
            </h2>
          </div>
        </div>

        {TOURS.length > 0 ? (
          <div className="mt-14 flex flex-col gap-4">
            {TOURS.map((t, i) => (
              <Link
                key={i}
                href={`/tours/${titleToSlug(t.title)}`}
                style={{ transitionDelay: `${i * 80}ms` }}
                className="reveal group grid grid-cols-1 items-center gap-6 rounded-2xl border border-line bg-bg-raise/40 p-6 transition-colors hover:border-gold/40 sm:grid-cols-[auto_1fr_auto] sm:p-8"
              >
                {/* Date block */}
                <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-0">
                  <span className="text-gold-grad font-display text-5xl font-extrabold leading-none sm:text-6xl">
                    {t.day}
                  </span>
                  <span className="label text-gold">{t.month} 2025</span>
                </div>

                <div className="sm:border-l sm:border-line sm:pl-8">
                  <h3 className="font-display text-2xl font-bold text-ivory transition-colors group-hover:text-gold sm:text-3xl">
                    {t.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-ivory/60">
                    <MapPin className="h-4 w-4 text-gold" aria-hidden />
                    {t.place}
                  </p>
                  <p className="mt-1 font-serif text-sm italic text-gold/90">
                    {t.note}
                  </p>
                </div>

                <div
                  data-cursor-label="View details"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold pointer-events-none"
                >
                  <Ticket className="h-4 w-4" aria-hidden />
                  View details
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-14 flex flex-col items-center justify-center rounded-2xl border border-line/50 bg-bg-raise/30 py-20 text-center">
            <span className="label mb-4 text-gold">Coming soon</span>
            <h3 className="display text-3xl text-ivory">Dates coming soon.</h3>
            <p className="mt-3 max-w-md text-sm text-ivory/60">
              Tours and events are being planned. Sign up for updates and be
              the first to know when we announce our next stop.
            </p>
            <a
              href="#contact"
              className="reveal mt-8 inline-flex items-center gap-3 rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold transition-all hover:border-gold hover:bg-gold hover:text-bg"
            >
              Get updates
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
