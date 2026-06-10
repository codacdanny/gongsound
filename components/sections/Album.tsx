"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import SoundWave from "@/components/SoundWave";
import Marquee from "@/components/Marquee";
import SectionHeading from "@/components/SectionHeading";
import { ALBUM } from "@/lib/content";
import { useReveal } from "@/lib/anim";

export default function Album() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      {/* warm radial backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[60vh] w-[90vw] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(169,120,28,0.18), transparent 65%)",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading index="04" kicker={ALBUM.badge} />

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Stylised album cover */}
          <div className="reveal group relative mx-auto w-full max-w-md">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-gold/30 bg-bg-raise">
              {/* metallic field */}
              <div
                className="absolute inset-0 opacity-90"
                style={{
                  background:
                    "radial-gradient(120% 120% at 30% 20%, rgba(247,216,119,0.18), transparent 55%), radial-gradient(100% 100% at 80% 90%, rgba(169,120,28,0.25), transparent 60%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <Image
                  src="/brand/logo.jpg"
                  alt=""
                  width={320}
                  height={320}
                  className="mix-blend-screen transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-between p-7">
                <div className="flex items-center justify-between">
                  <span className="label text-gold">{ALBUM.subtitle}</span>
                  <span className="font-mono text-xs text-muted">GS—001</span>
                </div>
                <div>
                  <p className="font-serif text-lg italic text-ivory/80">
                    {ALBUM.artist}
                  </p>
                  <h3 className="display text-gold-sheen text-5xl sm:text-6xl">
                    {ALBUM.title}
                  </h3>
                </div>
              </div>

              {/* play button */}
              <button
                type="button"
                aria-label={`Play ${ALBUM.title} by ${ALBUM.artist}`}
                data-cursor-label="Play"
                className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-bg shadow-[0_0_40px_rgba(230,184,76,0.4)] transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <Play className="h-6 w-6 translate-x-0.5 fill-bg" aria-hidden />
              </button>
            </div>
            <div className="mt-4 h-10 px-1 opacity-80">
              <SoundWave bars={48} />
            </div>
          </div>

          {/* Copy + featuring */}
          <div>
            <p className="reveal font-serif text-lg italic text-gold">
              {ALBUM.artist} — {ALBUM.title}
            </p>
            <h2 className="reveal display mt-2 text-4xl text-ivory sm:text-5xl lg:text-6xl">
              The debut album.
            </h2>
            <p className="reveal mt-6 max-w-lg text-base leading-relaxed text-ivory/70">
              {ALBUM.blurb}
            </p>

            <a
              href="#contact"
              data-cursor-label="Listen"
              className="reveal mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-bg transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <Play className="h-4 w-4 fill-bg" aria-hidden />
              {ALBUM.cta}
            </a>

            <p className="reveal mt-10 label text-muted">Featuring</p>
            <div className="reveal mt-3 flex flex-wrap gap-2">
              {ALBUM.featuring.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-line px-3.5 py-1.5 text-xs text-ivory/75 transition-colors hover:border-gold/50 hover:text-gold"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Big album-title marquee */}
      <div className="mt-20 border-y border-line py-5">
        <Marquee
          items={["3Point6 — Legendary", "Out Now", "The Debut Album"]}
          reverse
          duration={30}
          separator="•"
        />
      </div>
    </section>
  );
}
