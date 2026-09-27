import type { Metadata } from "next";
import { ViewTransition } from "react";
import MediaAsset from "@/components/MediaAsset";
import SectionHeader from "@/components/SectionHeader";
import { ClipReveal, Lines, Reveal, RevealItem } from "@/components/Reveal";
import type { AssetKey } from "@/config/assets";

export const metadata: Metadata = { title: "Experiment", description: "Eight skies cut from one: the image set and the story behind it." };

type Frame = { id: AssetKey & `gallery${string}`; n: string; caption: string; aspect: string; place: string; shape?: string; sizes: string };

// Each frame composed individually on the 24-column grid; mobile falls back to two columns.
const frames: Frame[] = [
  { id: "gallery01", n: "01", caption: "Sunline", aspect: "aspect-[2/1]", place: "col-span-2 md:col-span-11 md:col-start-2", sizes: "(min-width: 768px) 46vw, 100vw" },
  { id: "gallery02", n: "02", caption: "Cumulus", aspect: "aspect-[3/4]", place: "md:col-span-5 md:col-start-15 md:mt-40", sizes: "(min-width: 768px) 21vw, 50vw" },
  { id: "gallery03", n: "03", caption: "Zenith", aspect: "aspect-square", place: "md:col-span-5 md:col-start-20 md:-mt-16", shape: "rounded-full", sizes: "(min-width: 768px) 21vw, 50vw" },
  { id: "gallery04", n: "04", caption: "Horizon, 1:10", aspect: "aspect-[10/1]", place: "col-span-2 md:col-span-22 md:col-start-3", sizes: "100vw" },
  { id: "gallery07", n: "05", caption: "Flare", aspect: "aspect-[3/4]", place: "md:col-span-5 md:col-start-2 md:-mt-8", shape: "rounded-t-full", sizes: "(min-width: 768px) 21vw, 50vw" },
  { id: "gallery08", n: "06", caption: "Mass", aspect: "aspect-[2/1]", place: "md:col-span-11 md:col-start-9 md:mt-24", sizes: "(min-width: 768px) 46vw, 50vw" },
  { id: "gallery05", n: "07", caption: "Underside", aspect: "aspect-[4/3]", place: "md:col-span-7 md:col-start-5", sizes: "(min-width: 768px) 29vw, 50vw" },
  { id: "gallery06", n: "08", caption: "Edge", aspect: "aspect-square", place: "md:col-span-5 md:col-start-17 md:mt-32", shape: "rounded-t-full", sizes: "(min-width: 768px) 21vw, 50vw" },
];

export default function Experiment() {
  return (
    <>
      <section aria-labelledby="gallery-title" className="px-4 pt-40 pb-40 lg:px-8">
        <div className="grid-24 mb-24">
          <SectionHeader index="01" label="Gallery" as="h1" className="col-span-24 md:col-span-11 md:col-start-2">
            <span id="gallery-title">Eight skies, cut from one.</span>
          </SectionHeader>
          <p className="col-span-24 mt-8 max-w-[44ch] text-muted md:col-span-5 md:col-start-17 md:mt-0 md:self-end">
            One skybox, cropped eight ways. Same light, same hour — only the frame changes.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-24 md:gap-x-[1vw] md:gap-y-24">
          {frames.map((f) => {
            const img = (
              <div className={`parallax relative h-full w-full overflow-hidden border border-border bg-surface ${f.shape ?? ""}`}>
                <MediaAsset id={f.id} fill sizes={f.sizes} />
              </div>
            );
            return (
              <li key={f.id} className={f.place}>
                <figure>
                  <div className={f.aspect}>
                    {f.id === "gallery01" ? (
                      <ViewTransition name="sky-window" share="auto" default="none">{img}</ViewTransition>
                    ) : (
                      img
                    )}
                  </div>
                  <figcaption className="t-utility mt-2 flex gap-2">
                    <span className="text-muted">{f.n}</span> {f.caption}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </section>

      <article aria-labelledby="story-title" className="grid-24 gap-y-12 border-t border-border px-4 pt-32 pb-60 lg:px-8">
        <div className="col-span-24 md:col-span-4 md:col-start-2">
          <SectionHeader index="02" label="Editorial story" />
        </div>
        <h2 id="story-title" className="t-display col-span-24 md:col-span-18 md:col-start-7">
          <Lines lines={["One sky,", "bent into", "a studio."]} />
        </h2>

        <ClipReveal className="col-span-24 aspect-[16/9] overflow-hidden border border-border md:col-span-11 md:col-start-14 md:row-span-3 md:mt-12">
          <MediaAsset id="editorial" fill sizes="(min-width: 768px) 46vw, 100vw" />
        </ClipReveal>

        <aside aria-label="Captions" className="t-utility col-span-24 flex flex-col gap-4 text-muted md:col-span-4 md:col-start-2 md:row-span-3 md:mt-12">
          <p>Fig. 1 — The source: one equirectangular sky, 4096 × 2048.</p>
          <p>Fig. 2 — Right: the sun breaking the horizon, cropped 16:9.</p>
          <p>Set in Syne, DM Sans and DM Mono.</p>
        </aside>

        <Reveal className="col-span-24 flex max-w-[65ch] flex-col gap-6 md:col-span-6 md:col-start-7 md:mt-12">
          <RevealItem>
            <p>
              This site began with a single file: a free skybox, one sphere painted with cloud, haze and a low sun. Most
              projects would hide it in the background. We made it the whole brief.
            </p>
          </RevealItem>
          <RevealItem>
            <p>
              Every image on this page is cut from that one sky. No new shoot, no stock library — just crops, chosen the
              way a picture editor chooses: where the tension sits, what the edge of the frame should cut off. A horizon
              becomes a thin strip. A flare becomes a portrait.
            </p>
          </RevealItem>
          <RevealItem>
            <p>
              The rules were short. Ink on cream, always. Acid yellow for the moments you should notice. One real-time
              scene, moved gently enough that you feel it before you see it. Type does the loud work; the sky does the
              quiet work.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal as="figure" className="col-span-24 border-y border-border py-12 md:col-span-16 md:col-start-5 md:mt-24">
          <RevealItem>
            <blockquote className="t-heading">
              “The limit wasn’t the sky. It was deciding what to leave out.”
            </blockquote>
          </RevealItem>
          <RevealItem>
            <figcaption className="t-utility mt-6 text-muted">— Studio notes, week one</figcaption>
          </RevealItem>
        </Reveal>

        <Reveal className="col-span-24 max-w-[65ch] md:col-span-6 md:col-start-13">
          <RevealItem>
            <p>
              What we learned: constraint reads as confidence. When a system grows from one source, every page looks
              related without looking repeated. Swap the sky and the studio changes weather — the structure holds.
            </p>
          </RevealItem>
        </Reveal>
      </article>
    </>
  );
}
