"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import LookbookSpread, { type Look } from "./LookbookSpread";
import SectionHeader from "./SectionHeader";

const looks: Look[] = [
  {
    number: "01",
    title: "First light",
    pieces: ["Ember Solitaire ring, 0.5 ct", "Halo Stud earrings"],
    large: "look1Large",
    small: "look1Small",
  },
  {
    number: "02",
    title: "Warm metal",
    pieces: ["Dune Pavé ring, 18k yellow gold", "Halo Stud earrings"],
    large: "look2Large",
    small: "look2Small",
  },
  {
    number: "03",
    title: "Held between",
    pieces: ["Tension Solitaire ring", "Halo Drop studs"],
    large: "look3Large",
    small: "look3Small",
  },
  {
    number: "04",
    title: "After the fire",
    pieces: ["Marquise Pavé ring", "Solace Halo ring, 18k yellow gold"],
    large: "look4Large",
    small: "look4Small",
  },
];

// Desktop: pinned horizontal scroll through the spreads.
// Mobile and reduced motion: vertical stack, one look per screen.
export default function Lookbook() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="lookbook" aria-label="Lookbook" className="bg-surface">
      <SectionHeader card index="II" label="Lookbook" heading={["Four looks,", "one ember"]} />
      <div ref={pin} className="overflow-hidden lg:flex lg:h-svh lg:items-center">
        <div ref={track} className="flex flex-col lg:flex-row lg:items-center">
          {looks.map((look, i) => (
            <LookbookSpread key={look.number} look={look} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
