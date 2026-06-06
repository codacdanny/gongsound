"use client";

/**
 * Seamless CSS marquee. Renders the items twice and translates -50% so the loop
 * is invisible. Pauses on hover; respects reduced motion via globals.css.
 */
export default function Marquee({
  items,
  reverse = false,
  duration = 32,
  separator = "✦",
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
  separator?: string;
}) {
  return (
    <div className="group relative flex overflow-hidden">
      <div
        className={`marquee group-hover:[animation-play-state:paused] ${reverse ? "reverse" : ""}`}
        style={{ "--marquee-dur": `${duration}s` } as React.CSSProperties}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items.map((item, i) => (
              <span key={`${dup}-${i}`} className="flex items-center">
                <span className="display whitespace-nowrap px-6 text-[8vw] uppercase leading-none text-ivory/90 sm:text-5xl">
                  {item}
                </span>
                <span className="px-1 text-gold" aria-hidden>
                  {separator}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
