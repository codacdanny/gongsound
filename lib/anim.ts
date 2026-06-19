"use client";

import { useEffect, useRef } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Attach a scroll-reveal observer to a container. Any descendant carrying the
 * `.reveal` class fades/rises in when it enters the viewport. Stagger children
 * by giving them inline `style={{ transitionDelay }}`.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Disconnect existing observer if any
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const setupObserver = () => {
      const targets = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
      if (!targets.length) return;

      if (prefersReducedMotion()) {
        targets.forEach((t) => t.classList.add("is-in"));
        return;
      }

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
      );

      targets.forEach((t) => io.observe(t));

      // Immediately reveal elements already in view
      io.takeRecords().forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });

      observerRef.current = io;
    };

    // Initial setup
    setupObserver();

    // Watch for DOM changes and re-observe new elements
    const mutationObserver = new MutationObserver(() => {
      setupObserver();
    });

    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observerRef.current?.disconnect();
    };
  }, []);

  return ref;
}

/** Smoothly track a value toward a target (used by the custom cursor). */
export function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}
