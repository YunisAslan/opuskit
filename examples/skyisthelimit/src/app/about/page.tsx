import type { Metadata } from "next";
import { ViewTransition } from "react";
import MediaAsset from "@/components/MediaAsset";
import SectionHeader from "@/components/SectionHeader";
import { Lines, Reveal, RevealItem } from "@/components/Reveal";

export const metadata: Metadata = { title: "About", description: "Who is behind SKYISTHELIMIT and how the studio works." };

// Names and history in [brackets] are placeholders — replace with the real people behind the studio.
export default function About() {
  return (
    <section aria-labelledby="about-title" className="grid-24 gap-y-12 px-4 pt-32 pb-40 lg:px-8 md:pt-40">
      <ViewTransition name="sky-window" share="auto" default="none">
        <div className="relative col-span-24 aspect-[3/4] overflow-hidden rounded-t-full border border-border md:col-span-7 md:col-start-2 md:row-span-2">
          <MediaAsset id="portrait" fill priority sizes="(min-width: 768px) 29vw, 100vw" />
        </div>
      </ViewTransition>

      <div className="col-span-24 md:col-span-15 md:col-start-10 md:-ml-[6vw] md:self-end">
        <SectionHeader index="01" label="About" className="mb-8" />
        <h1 id="about-title" className="t-display">
          <Lines lines={["People who", "look up", "for a living."]} className="hidden md:block" />
          <Lines lines={["People", "who look up", "for a", "living."]} className="md:hidden" />
        </h1>
      </div>

      <Reveal className="col-span-24 flex max-w-[65ch] flex-col gap-6 md:col-span-7 md:col-start-11">
        <RevealItem>
          <p>
            SKYISTHELIMIT is [Founder name], an art director who spent [ten] years building identities for galleries,
            record labels and a planetarium, and [Collaborator name], a creative technologist who writes the shaders.
          </p>
        </RevealItem>
        <RevealItem>
          <p>
            We started the studio in [2026] after one too many projects ended as a template. Now we take fewer briefs and
            design each one from a blank sky: type first, then depth, then motion — and only the motion that earns it.
          </p>
        </RevealItem>
        <RevealItem>
          <p className="t-utility text-muted">[City] · Working worldwide · Two people, one long table</p>
        </RevealItem>
      </Reveal>
    </section>
  );
}
