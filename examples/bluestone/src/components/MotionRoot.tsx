"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

// Site-wide motion: smooth scroll (desktop pointer only, off for reduced motion)
// and one IntersectionObserver that flips [data-reveal] wrappers to .is-in once.
export default function MotionRoot() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.2 },
    );
    const observeAll = () =>
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    observeAll();
    // Catch nodes that mount later (e.g. client sections hydrating)
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    let lenis: Lenis | undefined;
    let raf: ((t: number) => void) | undefined;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (finePointer && !prefersReducedMotion()) {
      lenis = new Lenis({ lerp: 0.1, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      io.disconnect();
      mo.disconnect();
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
