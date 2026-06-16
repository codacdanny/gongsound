"use client";

import { use } from "react";
import { ArrowLeft, MapPin, Calendar, Clock, Ticket } from "lucide-react";
import Link from "next/link";
import { TOURS } from "@/lib/content";
import { getTourBySlug } from "@/lib/utils";
import { useReveal } from "@/lib/anim";

export default function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const ref = useReveal<HTMLDivElement>();
  const tour = getTourBySlug(resolvedParams.slug, TOURS);

  if (!tour) {
    return (
      <main className="min-h-screen bg-bg pt-32 pb-20 px-5 sm:px-8">
        <div className="mx-auto max-w-[1400px] text-center py-20">
          <h1 className="display text-4xl text-ivory mb-4">Tour not found.</h1>
          <p className="text-ivory/60 mb-8">
            The tour you're looking for doesn't exist.
          </p>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to tours
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main ref={ref} className="min-h-screen bg-bg pt-32 pb-20 px-5 sm:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back button */}
        <Link
          href="/"
          className="reveal inline-flex items-center gap-2 text-sm text-gold/70 transition-colors hover:text-gold mb-12"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>

        {/* Date badge */}
        <div className="reveal mb-8 inline-flex items-center gap-3 rounded-full border border-gold/40 px-5 py-3">
          <Calendar className="h-5 w-5 text-gold" aria-hidden />
          <span className="text-base font-semibold text-gold">
            {tour.month} {tour.day}, 2025
          </span>
        </div>

        {/* Headline */}
        <h1 className="reveal display text-5xl sm:text-6xl lg:text-7xl text-ivory leading-tight mb-12">
          {tour.title}
        </h1>

        {/* Location section */}
        <div className="reveal grid gap-8 md:grid-cols-2 mb-16">
          {/* Venue details */}
          <div className="space-y-6">
            <div>
              <p className="label mb-2 text-muted">Location</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-gold mt-0.5 shrink-0" aria-hidden />
                  <div>
                    <p className="font-display text-2xl font-bold text-ivory">
                      {tour.place}
                    </p>
                    {tour.venue && (
                      <p className="text-base text-ivory/70 mt-1">{tour.venue}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {tour.time && (
              <div>
                <p className="label mb-2 text-muted">Time</p>
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-gold shrink-0" aria-hidden />
                  <p className="text-lg text-ivory/80">{tour.time}</p>
                </div>
              </div>
            )}

            {tour.note && (
              <div className="rounded-lg border border-gold/30 bg-bg-raise/50 p-5">
                <p className="font-serif text-base italic text-gold/80">
                  "{tour.note}"
                </p>
              </div>
            )}
          </div>

          {/* Booking section */}
          <div className="rounded-2xl border border-gold/40 bg-gradient-to-b from-bg-raise/60 to-bg/40 p-8 backdrop-blur-sm h-fit">
            <p className="label text-muted mb-4">Ready to join?</p>
            <h3 className="display text-2xl text-ivory mb-6">Get your tickets.</h3>
            <p className="text-sm text-ivory/60 mb-8">
              Limited capacity. Secure your spot now for an unforgettable night
              of culture, sound, and legacy.
            </p>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 w-full rounded-full bg-gold px-6 py-4 text-base font-semibold uppercase tracking-[0.14em] text-bg transition-transform hover:scale-105"
            >
              <Ticket className="h-5 w-5" aria-hidden />
              Book now
            </a>
            <p className="text-xs text-ivory/50 text-center mt-4">
              or email us for group rates & partnerships
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="reveal h-px bg-gradient-to-r from-gold/60 via-gold/30 to-transparent mb-12" />

        {/* About the experience */}
        <div className="reveal space-y-8">
          <div>
            <h2 className="display text-3xl text-ivory mb-4">What to expect</h2>
            <p className="text-lg leading-relaxed text-ivory/75">
              Gongsound brings curated live experiences that celebrate culture,
              identity, and the power of sound. Expect an immersive evening with
              live performances from our roster of world-class artists,
              professional production design, and a sonic landscape built on
              intention and artistry. This is more than a concert — it's a
              movement.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "🎵",
                title: "Curated lineup",
                desc: "The finest artists from the Gongsound roster",
              },
              {
                icon: "🌟",
                title: "Premium production",
                desc: "Visuals, sound design, and experience design",
              },
              {
                icon: "🏛️",
                title: "Cultural celebration",
                desc: "A movement that amplifies who we are",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-gold/30 bg-bg-raise/50 p-6"
              >
                <p className="text-3xl mb-3">{item.icon}</p>
                <h4 className="font-display font-bold text-ivory mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-ivory/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact section */}
        <div className="reveal mt-16 rounded-2xl border border-gold/30 bg-bg-raise/50 p-10 text-center">
          <p className="label text-muted mb-3">Questions?</p>
          <h3 className="display text-2xl text-ivory mb-4">Get in touch.</h3>
          <p className="text-ivory/60 mb-8 max-w-lg mx-auto">
            Have questions about the event, tickets, or partnerships? Our team
            is here to help.
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
