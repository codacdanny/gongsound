"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import Marquee from "@/components/Marquee";
import SectionHeading from "@/components/SectionHeading";
import { ABOUT, PILLARS_WORDS } from "@/lib/content";
import { useReveal } from "@/lib/anim";

export default function About() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" ref={ref} className="relative py-16 sm:py-24 md:py-32">
      {/* Pillars marquee divider */}
      <div className="border-y border-line py-3 sm:py-5">
        <Marquee items={[...PILLARS_WORDS]} duration={26} />
      </div>

      <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 grid max-w-[1400px] gap-8 sm:gap-12 px-4 sm:px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* CEO portrait */}
        <div className="reveal relative flex flex-col gap-6 sm:gap-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/brand/ceo.jpg"
              alt={`${ABOUT.ceoName}, ${ABOUT.ceoRole} of Gongsound Entertainment`}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-display text-2xl font-bold text-ivory">
                {ABOUT.ceoName}
              </p>
              <p className="label mt-1 text-gold">{ABOUT.ceoRole}</p>
            </div>
          </div>

          {/* Floating quote card */}
          <div className="reveal relative sm:absolute max-w-[16rem] rounded-xl border border-gold/30 bg-bg-raise/90 p-5 backdrop-blur-md sm:-right-8 sm:-bottom-12">
            <Quote className="mb-2 h-5 w-5 text-gold" aria-hidden />
            <p className="font-serif text-sm italic leading-relaxed text-ivory/90">
              {ABOUT.ceoQuote}
            </p>
          </div>
        </div>

        {/* Manifesto */}
        <div className="flex flex-col justify-center">
          <SectionHeading index="01" kicker={ABOUT.kicker} />

          <h2 className="reveal display mt-5 sm:mt-7 text-balance text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] text-ivory">
            {ABOUT.headline}
          </h2>

          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
            {ABOUT.body.map((p, i) => (
              <p
                key={i}
                className="reveal max-w-xl text-sm sm:text-base leading-relaxed text-ivory/70"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Stats */}
          <dl className="mt-8 sm:mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg sm:rounded-xl border border-line bg-line sm:grid-cols-4">
            {ABOUT.stats.map((s, i) => (
              <div
                key={i}
                className="reveal bg-bg p-3 sm:p-5"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <dt className="text-gold-grad font-display text-xl sm:text-2xl md:text-3xl font-extrabold">
                  {s.value}
                </dt>
                <dd className="mt-1 sm:mt-2 text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
