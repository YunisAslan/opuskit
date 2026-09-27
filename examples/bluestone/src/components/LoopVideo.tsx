"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// Muted ambient loop: plays only while on screen, stays paused for reduced
// motion until the visitor asks, and always offers a pause control.
export default function LoopVideo({
  src,
  poster,
  label,
  focus,
}: {
  src: string;
  poster: string;
  label: string;
  focus?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  // Whether the visitor wants it playing; off-screen pauses don't change this.
  const wanted = useRef(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current!;
    wanted.current = !prefersReducedMotion();
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && wanted.current) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v.parentElement!); // wrapper: the video itself may be clip-revealed
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current!;
    wanted.current = v.paused;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: focus }}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        className="t-utility absolute right-4 bottom-4 z-10 min-h-11 min-w-11 rounded-full bg-text/60 px-4 text-background backdrop-blur-sm transition-colors hover:bg-text/80"
      >
        {playing ? "Pause film" : "Play film"}
      </button>
    </>
  );
}
