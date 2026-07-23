"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/anim";

/**
 * Animated gold frequency bars — a living echo of the waveform in the logo.
 * Pure canvas, DPR-aware, paused when off-screen or for reduced-motion users.
 */
export default function SoundWave({
  bars = 64,
  className = "",
}: {
  bars?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Per-bar phase + speed so the waveform feels organic, not uniform.
    const seeds = Array.from({ length: bars }, (_, i) => ({
      phase: (i / bars) * Math.PI * 2,
      speed: 0.6 + (i % 5) * 0.18,
      base: 0.25 + Math.random() * 0.3,
    }));

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !reduced) raf = requestAnimationFrame(draw);
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const draw = (t = 0) => {
      ctx.clearRect(0, 0, w, h);
      // Shrink the inter-bar gap on narrow canvases so bar width can never go
      // negative (a negative roundRect radius throws and crashes the render).
      const gap = Math.min(3, w / (bars * 2));
      const bw = Math.max(0.5, (w - gap * (bars - 1)) / bars);
      const time = t * 0.001;
      for (let i = 0; i < bars; i++) {
        const s = seeds[i];
        const osc = reduced
          ? s.base
          : s.base +
            Math.abs(Math.sin(time * s.speed + s.phase)) * (1 - s.base) * 0.95;
        // Center-weighted envelope so the middle bars are tallest (logo-like).
        const env = Math.sin((i / (bars - 1)) * Math.PI);
        const bh = Math.max(2, osc * h * (0.35 + env * 0.65));
        const x = i * (bw + gap);
        const y = (h - bh) / 2;
        const grad = ctx.createLinearGradient(0, y, 0, y + bh);
        grad.addColorStop(0, "rgba(247,216,119,0.95)");
        grad.addColorStop(1, "rgba(169,120,28,0.55)");
        ctx.fillStyle = grad;
        const r = Math.max(0, Math.min(bw / 2, 2));
        ctx.beginPath();
        ctx.roundRect(x, y, bw, bh, r);
        ctx.fill();
      }
      if (visible && !reduced) raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [bars]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
