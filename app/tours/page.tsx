"use client";

import { MapPin, Calendar, Clock, Ticket, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TOURS, SITE } from "@/lib/content";
import { useReveal } from "@/lib/anim";
import { titleToSlug } from "@/lib/utils";

export default function ToursPage() {
  const ref = useReveal<HTMLDivElement>();

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
            <span className="label text-gold">Events & Tours</span>
            <h1 className="display text-4xl sm:text-5xl lg:text-6xl text-ivory mt-2">
              The <span className="text-gold-grad">Movement</span> on the road.
            </h1>
          </div>
        </div>

        {/* Tours Grid */}
        {TOURS.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TOURS.map((tour, idx) => (
              <div
                key={idx}
                style={{ transitionDelay: `${idx * 80}ms` }}
                className="reveal rounded-2xl border border-gold/30 bg-bg-raise/50 p-8 backdrop-blur-sm hover:border-gold/60 transition-colors"
              >
                {/* Date Badge */}
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/40 px-4 py-2">
                  <Calendar className="h-4 w-4 text-gold" aria-hidden />
                  <span className="text-sm font-semibold text-gold">
                    {tour.month} {tour.day}
                  </span>
                </div>

                {/* Title & Location */}
                <h2 className="display text-2xl text-ivory mb-4 line-clamp-2">
                  {tour.title}
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gold mt-0.5 shrink-0" aria-hidden />
                    <div>
                      <p className="font-semibold text-ivory">{tour.place}</p>
                      {tour.venue && (
                        <p className="text-sm text-ivory/60">{tour.venue}</p>
                      )}
                    </div>
                  </div>
                  {tour.time && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gold shrink-0" aria-hidden />
                      <p className="text-sm text-ivory/70">{tour.time}</p>
                    </div>
                  )}
                </div>

                {/* Tagline */}
                {tour.note && (
                  <p className="font-serif text-sm italic text-gold/80 mb-6 border-t border-line pt-4">
                    {tour.note}
                  </p>
                )}

                {/* CTA */}
                <Link
                  href={`/tours/${titleToSlug(tour.title)}`}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-gold transition-all hover:bg-gold hover:text-bg"
                >
                  <Ticket className="h-4 w-4" aria-hidden />
                  View details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="label mb-4 text-gold">Coming soon</p>
            <h2 className="display text-3xl text-ivory mb-4">Tours announced soon.</h2>
            <p className="max-w-md mx-auto text-ivory/60">
              We're planning exciting experiences across the region. Sign up for
              updates to be the first to know when tours are announced.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg"
            >
              Get notified
            </a>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-20 rounded-2xl border border-gold/30 bg-gradient-to-b from-bg-raise/60 to-bg/40 p-10 text-center">
          <p className="label text-muted mb-3">Questions?</p>
          <h3 className="display text-2xl text-ivory mb-4">
            Get in touch with our team.
          </h3>
          <p className="text-ivory/60 mb-6 max-w-md mx-auto">
            Have questions about tours, tickets, or partnerships? We'd love to
            hear from you.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg"
          >
            Contact us
          </a>
        </div>
      </div>
    </main>
  );
}
