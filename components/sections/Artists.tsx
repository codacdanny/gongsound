"use client";

import SectionHeading from "@/components/SectionHeading";
import { useReveal } from "@/lib/anim";
import { useEffect, useState } from "react";

interface Artist {
  id: number;
  name: string;
  image?: string;
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
        setArtists(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch artists", err);
        setArtists([]);
        setIsLoading(false);
      });
  }, []);

  // Don't render section if no artists available
  if (!isLoading && artists.length === 0) {
    return null;
  }

  return (
    <section id="artists" ref={ref} className="relative py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-5 md:px-8">
        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeading index="04" kicker="The roster" />
            <h2 className="reveal display mt-4 sm:mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory">
              The voices of the <span className="font-serif italic text-gold">movement.</span>
            </h2>
          </div>
          <p className="reveal max-w-xs text-xs sm:text-sm leading-relaxed text-ivory/60">
            ten artists. One sound rooted in culture, built to travel beyond
            home.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-12 sm:mt-16 text-center py-16 sm:py-20">
            <p className="text-ivory/60 text-sm">Loading artists...</p>
          </div>
        ) : (
          <ul className="mt-12 sm:mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg sm:rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
            {artists.map((artist, i) => (
              <li key={artist.id} style={{ transitionDelay: `${(i % 4) * 60}ms` }} className="reveal">
                <a
                  href="mailto:3point6@gongsoundentertainment.com"
                  data-cursor-label="View"
                  className="group relative flex aspect-4/5 flex-col justify-between overflow-hidden bg-bg p-3 sm:p-5 transition-colors hover:bg-bg-raise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
                >
                  <span className="font-mono text-xs text-muted">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>

                  {/* Artist Image or Monogram */}
                  {artist.image ? (
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="text-gold-grad pointer-events-none absolute inset-0 flex items-center justify-center font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold opacity-15 transition-all duration-500 group-hover:scale-110 group-hover:opacity-30"
                    >
                      {initials(artist.name)}
                    </span>
                  )}

                  <div className="relative">
                    <h3 className="font-display text-base sm:text-lg font-bold leading-tight text-ivory transition-colors group-hover:text-gold md:text-xl">
                      {artist.name}
                    </h3>
                    <span className="label mt-0.5 sm:mt-1 block text-[0.5rem] sm:text-[0.55rem] text-muted">
                      Artist
                    </span>
                  </div>

                  {/* hover underline */}
                  <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
