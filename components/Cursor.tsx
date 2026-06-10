"use client";

import { useEffect, useRef } from "react";
import { lerp, prefersReducedMotion } from "@/lib/anim";

/**
 * Two-part custom cursor: a small gold dot that tracks 1:1 and a larger ring
 * that trails with inertia and expands over interactive elements. Pointer-fine
 * devices only; native cursor is hidden via body[data-cursor="on"].
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;

    document.body.setAttribute("data-cursor", "on");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };

    const tick = () => {
      rx = lerp(rx, mx, 0.18);
      ry = lerp(ry, my, 0.18);
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const setHover = (on: boolean, text = "") => {
      ring.dataset.hover = on ? "1" : "0";
      label.textContent = text;
      ring.dataset.label = text ? "1" : "0";
    };

    const onOver = (e: PointerEvent) => {
      const t = (e.target as HTMLElement)?.closest?.(
        "a, button, [data-cursor-label]",
      ) as HTMLElement | null;
      if (!t) return setHover(false);
      setHover(true, t.getAttribute("data-cursor-label") ?? "");
    };
    const onOut = () => setHover(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      document.body.removeAttribute("data-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={dotRef}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold-bright"
      />
      <div
        ref={ringRef}
        data-hover="0"
        data-label="0"
        className="group absolute flex h-9 w-9 -ml-[18px] -mt-[18px] items-center justify-center rounded-full border border-gold/60 transition-[width,height,background-color,border-color] duration-300 ease-out data-[hover=1]:h-14 data-[hover=1]:w-14 data-[hover=1]:border-gold data-[hover=1]:bg-gold/10 data-[label=1]:h-16 data-[label=1]:w-16 data-[label=1]:bg-gold data-[label=1]:border-gold"
      >
        <span
          ref={labelRef}
          className="label !text-[0.5rem] !tracking-[0.2em] !text-bg text-center opacity-0 transition-opacity duration-200 group-data-[label=1]:opacity-100"
        />
      </div>
    </div>
  );
}
