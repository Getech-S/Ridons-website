"use client";

import { useEffect } from "react";

/**
 * Page-wide motion:
 * - [data-reveal="…"]  → gets [data-revealed] once it scrolls into view (styles in globals.css)
 * - [data-parallax="n"] → drifts vertically at n × its distance from the viewport centre
 * Everything is skipped when the visitor prefers reduced motion.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = (el: Element) => el.setAttribute("data-revealed", "");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          reveal(e.target);
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    // Turns on the reveal styles (see globals.css). Until this runs, everything is visible.
    if (!reduce) document.documentElement.classList.add("motion");

    const observe = (root: ParentNode) =>
      root.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => (reduce ? reveal(el) : io.observe(el)));
    observe(document);

    // Elements rendered later (e.g. extra FAQ questions) get picked up too.
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && observe(n.parentNode ?? n));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    let frame = 0;
    const parallax = () => {
      frame = 0;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = Number(el.dataset.parallax) || 0;
        const offset = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(parallax);
    };
    if (!reduce) {
      parallax();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      document.documentElement.classList.remove("motion");
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
