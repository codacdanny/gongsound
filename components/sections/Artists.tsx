"use client";

import SectionHeading from "@/components/SectionHeading";
import { useReveal } from "@/lib/anim";
import { useEffect, useState } from "react";

interface Artist {
  id: number;
  name: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Artists() {
  const ref = useReveal<HTMLDivElement>();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/artists")
      .then((res) => res.json())
      .then((data) => {
        setArtists(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch artists", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="artists" ref={ref} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeading index="03" kicker="The roster" />
            <h2 className="reveal display mt-6 max-w-2xl text-4xl text-ivory sm:text-5xl lg:text-6xl">
              The voices of the <span className="font-serif italic text-gold">movement.</span>
            </h2>
          </div>
          <p className="reveal max-w-xs text-sm leading-relaxed text-ivory/60">
            Twelve artists. One sound rooted in culture, built to travel beyond
            home.
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
          {!isLoading && artists.map((artist, i) => (
            <li key={artist.id} style={{ transitionDelay: `${(i % 4) * 60}ms` }} className="reveal">
              <a
                href="#contact"
                data-cursor-label="View"
                className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden bg-bg p-5 transition-colors hover:bg-bg-raise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
              >
                <span className="font-mono text-xs text-muted">
                  {(i + 1).toString().padStart(2, "0")}
                </span>

                {/* Monogram */}
                <span
                  aria-hidden
                  className="text-gold-grad pointer-events-none absolute inset-0 flex items-center justify-center font-display text-6xl font-extrabold opacity-15 transition-all duration-500 group-hover:scale-110 group-hover:opacity-30 sm:text-7xl"
                >
                  {initials(artist.name)}
                </span>

                <div className="relative">
                  <h3 className="font-display text-lg font-bold leading-tight text-ivory transition-colors group-hover:text-gold sm:text-xl">
                    {artist.name}
                  </h3>
                  <span className="label mt-1 block !text-[0.55rem] text-muted">
                    Artist
                  </span>
                </div>

                {/* hover underline */}
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
