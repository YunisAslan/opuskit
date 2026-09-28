import type { Metadata } from "next";
import Link from "next/link";
import { MediaAsset } from "@/components/MediaAsset";
import { PageIntro } from "@/components/Page";
import { ClipReveal, Reveal, RevealItem } from "@/components/Reveal";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <>
      <PageIntro word="US" title="About BUYTOLOSE" />
      <section aria-labelledby="about-statement" className="container-content grid gap-12 pb-32 md:grid-cols-12 md:gap-6 md:pb-40">
        <ClipReveal className="relative aspect-[4/5] rounded-3xl md:col-span-5">
          <MediaAsset id="aboutPortrait" fill sizes="(max-width: 767px) 100vw, 42vw" />
        </ClipReveal>
        <Reveal className="md:col-span-6 md:col-start-7 md:self-end">
          <RevealItem>
            <h2 id="about-statement" className="font-heading text-heading">
              We make the clothes you fall over in, and the bag you drop.
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-8 max-w-[52ch]">
              Inês Moura and Tomás Reis started BUYTOLOSE in 2023 from a basement on Rua do Almada. Inês cut
              patterns for a knitwear mill in Barcelos for nine years. Tomás ran a skate shop that closed.
            </p>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 max-w-[52ch]">
              Every run is two hundred pieces, sewn in Porto by two workshops we can walk to. We test each one
              on the street before it goes on sale, which is why most of our photos are taken on the ground.
            </p>
          </RevealItem>
          <RevealItem>
            <Link href="/shop" className="btn btn-primary mt-10">Shop the collection</Link>
          </RevealItem>
        </Reveal>
      </section>
    </>
  );
}
