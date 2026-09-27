"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

const SkyScene = dynamic(() => import("./SkyScene"), { ssr: false });

/** Mounts the WebGL sky over the poster on desktop with motion allowed; mobile and reduced motion keep the poster. */
export default function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    return () => {
      mq.removeEventListener("change", update);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
      {enabled && <SkyScene active={active} onReady={onReady} />}
    </div>
  );
}
