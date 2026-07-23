"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { gsap } from "gsap";
import SoundWave from "@/components/SoundWave";
import { HERO, PILLARS_WORDS } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/anim";

const ease = [0.22, 1, 0.36, 1] as const;

function PillarsBadge() {
  return (
    <div className="relative h-32 w-32 sm:h-40 sm:w-40">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin_28s_linear_infinite] motion-reduce:animate-none">
        <defs>
          <path
            id="circlePath"
            d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
          />
        </defs>
        <text className="fill-gold" style={{ fontSize: 13, letterSpacing: 6 }}>
          <textPath href="#circlePath" startOffset="0">
            {PILLARS_WORDS.map((w) => `${w.toUpperCase()}  •  `).join("")}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-serif text-2xl italic text-gold-bright">G</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const [ready, setReady] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal as the preloader curtain lifts. A fallback guarantees the hero
    // never stays hidden if the preloader was skipped or its event missed.
    const onReveal = () => setReady(true);
    window.addEventListener("gs:revealed", onReveal);
    const fb = setTimeout(() => setReady(true), 2600);
    return () => {
      window.removeEventListener("gs:revealed", onReveal);
      clearTimeout(fb);
    };
  }, []);

  // Scroll parallax on the glow, logo watermark and soundwave.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(logoRef.current, {
        yPercent: 22,
        ease: "none",
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(waveRef.current, {
        yPercent: 40,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(glowRef.current, {
        scale: 1.25,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  const v = ready ? "show" : "hide";

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 pb-12 pt-20 sm:px-5 sm:pb-16 sm:pt-24 md:px-8 md:pb-24 md:pt-28"
      style={{ minHeight: "100dvh" }}
    >
      {/* Ambient gold glow — capped on mobile to avoid GPU memory crashes */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[55vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 md:h-[80vh] md:w-[80vh] md:blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(230,184,76,0.22) 0%, rgba(169,120,28,0.08) 40%, transparent 70%)",
        }}
      />

      {/* Giant logo watermark */}
      <div
        ref={logoRef}
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-1/2 -z-10 hidden -translate-y-1/2 opacity-[0.12] md:block"
      >
        <Image
          src="/brand/logo.jpg"
          alt=""
          width={620}
          height={620}
          className="mix-blend-screen"
          priority
        />
      </div>

      <div className="mx-auto w-full max-w-[1400px]">
        {/* Eyebrow */}
        <motion.div
          initial="hide"
          animate={v}
          variants={{ hide: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-gold" />
          <span className="label text-gold">{HERO.eyebrow}</span>
        </motion.div>

        {/* Headline */}
        <h1 className="display text-ivory">
          <span className="block overflow-hidden">
            <motion.span
              initial="hide"
              animate={v}
              variants={{ hide: { y: "110%" }, show: { y: 0 } }}
              transition={{ duration: 1, ease, delay: 0.05 }}
              className="block text-[clamp(2rem,14vw,15rem)] leading-[0.86] sm:text-[clamp(2.5rem,13vw,15rem)] md:text-[clamp(3rem,15vw,15rem)] lg:text-[clamp(3.5rem,12vw,15rem)]"
            >
              {HERO.line1}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial="hide"
              animate={v}
              variants={{ hide: { y: "110%" }, show: { y: 0 } }}
              transition={{ duration: 1, ease, delay: 0.16 }}
              className="block text-gold-sheen text-[clamp(2rem,14vw,15rem)] leading-[0.86] sm:text-[clamp(2.5rem,13vw,15rem)] md:text-[clamp(3rem,15vw,15rem)] lg:text-[clamp(3.5rem,12vw,15rem)]"
            >
              {HERO.line2}.
            </motion.span>
          </span>
        </h1>

        {/* Soundwave strip under headline */}
        <div ref={waveRef} className="mt-6 h-16 w-full max-w-3xl sm:h-20">
          <SoundWave bars={72} />
        </div>

        {/* Lower grid: intro + meta */}
        <div className="mt-6 sm:mt-10 grid gap-4 sm:gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <motion.p
            initial="hide"
            animate={v}
            variants={{ hide: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="max-w-xl text-balance text-base leading-relaxed text-ivory/75 sm:text-lg"
          >
            {HERO.intro}
          </motion.p>

          <motion.div
            initial="hide"
            animate={v}
            variants={{ hide: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease, delay: 0.42 }}
            className="flex flex-col items-start gap-4 sm:gap-6 md:items-end"
          >
            <div className="flex items-start gap-2.5 text-left md:text-right">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
              <div>
                <p className="label mb-1 text-muted">{HERO.firstTourLabel}</p>
                <p className="font-display text-lg font-bold text-ivory">
                  {HERO.firstTour}
                </p>
                <p className="font-serif text-sm italic text-gold">
                  {HERO.firstTourNote}
                </p>
              </div>
            </div>

            <a
              href="#about"
              data-cursor-label="Scroll"
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-bg transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {HERO.cta}
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Floating pillars badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={ready ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.9, ease, delay: 0.6 }}
        className="pointer-events-none absolute bottom-10 right-5 hidden lg:block xl:right-12"
      >
        <PillarsBadge />
      </motion.div>
    </section>
  );
}
