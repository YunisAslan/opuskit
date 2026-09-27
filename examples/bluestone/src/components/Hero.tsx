"use client";

import { useEffect, useRef, useState } from "react";
import { assets } from "@/config/assets";
import { gsap } from "@/lib/motion";

const film = assets.heroVideo;

// Pinned 100svh stage (CSS sticky) inside a 300vh section (180vh mobile).
// Scroll progress scrubs video.currentTime; type enters at chapter points and
// the frame closes to a 2.39:1 letterbox for the closing title card.
export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = video.current!;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // iOS Safari only paints seeks after the element has played once.
      const prime = () => v.play().then(() => v.pause()).catch(() => {});
      window.addEventListener("touchstart", prime, { once: true, passive: true });

      const playhead = { p: 0 };
      let pending = false;
      const seek = () => {
        pending = false;
        if (!v.duration) return;
        const t = playhead.p * (v.duration - 0.05);
        if (Math.abs(v.currentTime - t) > 0.01) v.currentTime = t;
      };

      // Letterbox bars as a clip inset in px: 2.39:1 on desktop; portrait
      // screens close to 4:5, since 2.39:1 would leave a sliver.
      const bar = () => {
        const ratio = window.innerWidth < 768 ? 0.8 : 2.39;
        return Math.max(0, (window.innerHeight - window.innerWidth / ratio) / 2);
      };

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        playhead,
        {
          p: 1,
          duration: 1,
          ease: "none",
          onUpdate: () => {
            // Coalesce to one seek per frame; seeking faster than decode janks.
            if (!pending) {
              pending = true;
              requestAnimationFrame(seek);
            }
          },
        },
        0,
      )
        .to(".hero-ch1", { autoAlpha: 0, y: -24, duration: 0.1 }, 0.2)
        .fromTo(".hero-ch2", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.36)
        .to(".hero-ch2", { autoAlpha: 0, y: -24, duration: 0.08 }, 0.6)
        .fromTo(
          frame.current,
          { clipPath: "inset(0px 0px 0px 0px)" },
          { clipPath: () => `inset(${bar()}px 0px ${bar()}px 0px)`, duration: 0.14, ease: "power2.inOut" },
          0.66,
        )
        .fromTo(".hero-ch3", { autoAlpha: 0, scale: 0.97 }, { autoAlpha: 1, scale: 1, duration: 0.12 }, 0.78)
        .to({}, { duration: 0.06 }); // hold the title card before release

      return () => window.removeEventListener("touchstart", prime);
    }, section.current!);

    return () => mm.revert();
  }, []);

  // Reduced motion: poster by default; the film plays only on request.
  const toggleFilm = () => {
    const v = video.current!;
    if (v.paused) {
      v.loop = true;
      v.play().catch(() => {});
    } else v.pause();
  };

  return (
    <section id="hero" ref={section} className="hero relative bg-text text-background" aria-label="Introduction">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div ref={frame} className="absolute inset-0 will-change-[clip-path]">
          <video
            ref={video}
            className="h-full w-full object-cover"
            style={{ objectPosition: film.focus }}
            poster={film.poster}
            muted
            playsInline
            preload="auto"
            aria-label={film.alt}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src={film.src} type="video/mp4" />
          </video>
          {/* Legibility scrim, warm-tinted rather than black */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(43,38,32,0.85)_0%,rgba(43,38,32,0.25)_45%,rgba(43,38,32,0)_70%)]" />
        </div>

        {/* Chapter 1 — headline, supporting line, one action */}
        <div className="hero-ch1 absolute inset-x-0 bottom-0 pb-[max(3rem,env(safe-area-inset-bottom))] md:pb-16">
          <div className="container-inner grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-7">
              <p className="t-utility mb-6 text-secondary">Collection 07 · Emberstone</p>
              <h1 className="t-display mb-6">
                <span className="block">Light,</span>
                <span className="block">found in</span>
                <span className="block">stone</span>
              </h1>
              <p className="measure mb-8 max-w-[38ch] text-background/85">
                Diamond rings and earrings, set by hand for the hours between firelight and dawn.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a href="#collection" className="t-utility link link-static">
                  Discover the collection
                </a>
                <button type="button" onClick={toggleFilm} className="hero-play t-utility link link-static min-h-11 items-center">
                  {playing ? "Pause the film" : "View the film"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter 2 — statement */}
        <div className="hero-ch2 hero-chapter-later absolute inset-x-0 bottom-0 pb-16" aria-hidden="true">
          <div className="container-inner grid grid-cols-12 gap-6">
            <p className="t-heading col-span-12 max-w-[16ch] md:col-span-6 md:text-[clamp(2.5rem,5vw,4.5rem)]">
              Formed over centuries. Worn for decades.
            </p>
          </div>
        </div>

        {/* Chapter 3 — centred title card inside the letterbox */}
        <div className="hero-ch3 hero-chapter-later absolute inset-0 grid place-items-center text-center" aria-hidden="true">
          <div>
            <p className="t-utility mb-4 text-secondary">Chapter I</p>
            <p className="font-display text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] font-extrabold tracking-[-0.045em]">
              Emberstone
            </p>
            <p className="t-utility mt-4 text-background/70">Autumn / Winter 2026</p>
          </div>
        </div>

        <p className="hero-ch1 t-utility pointer-events-none absolute top-24 right-6 hidden text-background/60 md:block motion-reduce:hidden">
          Scroll to move through the scene
        </p>
      </div>
    </section>
  );
}
