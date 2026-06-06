"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { prefersReducedMotion } from "@/lib/anim";

/**
 * Opening curtain: a gold counter races 0 → 100 over the wordmark, then the
 * black panel splits and lifts away to reveal the hero. Skipped (instant) for
 * reduced-motion users. Locks scroll while visible.
 */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDone(true);
      return;
    }
    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const DUR = 1900;
    let raf = 0;
    const loop = (now: number) => {
      const p = Math.min(1, (now - start) / DUR);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(loop);
      else setTimeout(() => setDone(true), 280);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!done) return;
    document.documentElement.classList.remove("lenis-stopped");
    document.body.style.overflow = "";
    // Let the hero begin its entrance the moment the curtain starts lifting.
    window.dispatchEvent(new Event("gs:revealed"));
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="label mb-6 text-gold">Gongsound Entertainment</span>
            <div className="display text-gold-grad text-[18vw] leading-none sm:text-[12vw] md:text-[8rem]">
              {count.toString().padStart(2, "0")}
            </div>
          </motion.div>

          <div className="mt-8 h-px w-56 overflow-hidden bg-line">
            <motion.div
              className="h-full bg-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              style={{ transformOrigin: "left" }}
              transition={{ ease: "linear" }}
            />
          </div>
          <span className="label mt-5 !text-[0.6rem] text-muted">
            We amplify culture
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
