"use client";

import Image from "next/image";
import SoundWave from "@/components/SoundWave";
import { NAV, SITE } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative border-t border-line pt-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Big closing wordmark */}
        <div className="relative">
          <h2 className="display text-center text-[15vw] leading-none text-ivory/90 lg:text-[12rem]">
            <span className="text-gold-sheen">Amplify</span> culture.
          </h2>
          <div className="mx-auto mt-6 h-12 max-w-2xl opacity-70">
            <SoundWave bars={80} />
          </div>
        </div>

        {/* Columns */}
        <div className="mt-20 grid gap-12 border-t border-line py-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/brand/logo.jpg"
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover ring-1 ring-gold/30"
              />
              <span>
                <span className="block font-display text-base font-extrabold tracking-tight text-ivory">
                  GONGSOUND
                </span>
                <span className="label !text-[0.55rem] !tracking-[0.32em] text-gold">
                  Entertainment
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/55">
              A culturally rooted entertainment company. {SITE.location},{" "}
              {SITE.country}.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="label mb-5 text-muted">Explore</p>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="link-sweep text-sm text-ivory/70 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label mb-5 text-muted">Follow</p>
            <ul className="space-y-3">
              {SITE.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="link-sweep text-sm text-ivory/70 transition-colors hover:text-gold"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-line py-7 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.full}. All rights reserved.
          </p>
          <p className="font-serif italic text-gold/80">
            The journey begins at home.
          </p>
        </div>
      </div>
    </footer>
  );
}
