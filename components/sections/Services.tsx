"use client";

import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { SERVICES } from "@/lib/content";
import { useReveal } from "@/lib/anim";

export default function Services() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="music" ref={ref} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeading index="03" kicker="What we do" />
            <h2 className="reveal display mt-6 max-w-2xl text-4xl text-ivory sm:text-5xl lg:text-6xl">
              Five ways we <span className="text-gold-grad">amplify</span> the
              sound.
            </h2>
          </div>
          <p className="reveal max-w-sm text-sm leading-relaxed text-ivory/60">
            One house, end to end — from discovering an artist to filling a room.
            Every pillar feeds the next.
          </p>
        </div>

        <div className="mt-16 border-t border-line">
          {SERVICES.map((s, i) => (
            <div
              key={s.no}
              style={{ transitionDelay: `${i * 60}ms` }}
              className="reveal relative grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-2 border-b border-line py-7 sm:grid-cols-[5rem_1fr_auto] sm:py-9"
            >
              <span className="font-mono text-sm text-gold-deep">
                {s.no}
              </span>

              <h3 className="display text-3xl text-ivory sm:text-4xl lg:text-5xl">
                {s.title}
              </h3>

              <p className="col-span-2 max-w-md text-sm leading-relaxed text-ivory/55 sm:col-span-1 sm:col-start-2 sm:max-w-lg">
                {s.desc}
              </p>

              <span className="col-start-2 mt-1 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold sm:col-start-3 sm:row-span-2 sm:row-start-1 sm:mt-0 sm:self-center">
                {s.cta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
