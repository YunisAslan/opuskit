"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { assets, type AssetId } from "@/config/assets";
import { prefersReducedMotion } from "@/lib/motion";
import SectionHeader from "./SectionHeader";

const entries: { title: string; date: string; iso: string; category: string; image: AssetId }[] = [
  { title: "Photographing diamonds in low light", date: "12 Sep 2026", iso: "2026-09-12", category: "Behind the lens", image: "look1Small" },
  { title: "Why we set stones low", date: "28 Aug 2026", iso: "2026-08-28", category: "Craft", image: "look3Small" },
  { title: "Choosing a solitaire, without the jargon", date: "04 Aug 2026", iso: "2026-08-04", category: "Guide", image: "look2Small" },
];

// Editorial list. On fine pointers the hovered entry's image follows the
// cursor (0.15 lerp); with reduced motion it sits in a fixed slot instead.
export default function Journal() {
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = preview.current!;
    const still = prefersReducedMotion();
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.15;
      pos.y += (target.y - pos.y) * 0.15;
      el.style.translate = `${pos.x + 24}px ${pos.y - 120}px`;
      raf = requestAnimationFrame(tick);
    };
    if (!still) {
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(tick);
    }
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="journal" aria-label="Journal" className="container-inner pb-32 md:pb-40">
      <SectionHeader index="V" label="Journal" heading={["Notes from the bench"]} />

      <ul className="border-t border-border" onPointerLeave={() => setActive(null)}>
        {entries.map((e, i) => (
          <li key={e.title} className="border-b border-border">
            <a
              href="#journal"
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group grid min-h-11 grid-cols-12 items-baseline gap-x-6 gap-y-2 py-6 md:py-8"
            >
              <span className="t-utility col-span-12 text-accent md:col-span-3">{e.category}</span>
              <span className="col-span-12 font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.05] font-bold tracking-[-0.03em] md:col-span-7">
                <span className="link group-hover:bg-[length:100%_1px]">{e.title}</span>
              </span>
              <time dateTime={e.iso} className="t-utility col-span-12 text-muted md:col-span-2 md:text-right">
                {e.date}
              </time>
            </a>
          </li>
        ))}
      </ul>

      {/* Hover preview (fine pointers only). Fixed slot at right under reduced motion. */}
      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-40 hidden aspect-[4/5] w-56 overflow-hidden bg-surface transition-opacity duration-[250ms] ease-out pointer-fine:block motion-reduce:top-1/2 motion-reduce:right-12 motion-reduce:left-auto motion-reduce:-translate-y-1/2"
        style={{ opacity: active === null ? 0 : 1 }}
      >
        {entries.map((e, i) => {
          const a = assets[e.image];
          return (
            <Image
              key={e.title}
              src={a.src}
              alt=""
              fill
              sizes="224px"
              className="object-cover transition-opacity duration-[250ms] ease-out"
              style={{ objectPosition: a.focus, opacity: active === i ? 1 : 0 }}
            />
          );
        })}
      </div>
    </section>
  );
}
