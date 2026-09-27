import Link from "next/link";
import { ViewTransition } from "react";
import MediaAsset from "@/components/MediaAsset";
import HeroScene from "@/components/scene/HeroScene";

const desktop = ["Limits are", "a horizon", "line."];
const mobile = ["Limits", "are a", "horizon", "line."];

function HeroLines({ lines, className }: { lines: string[]; className: string }) {
  return (
    <span className={className}>
      {lines.map((l) => (
        <span key={l} className="hero-line pb-[0.04em]">
          <span>{l}</span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative h-svh min-h-[640px] overflow-hidden">
      {/* Sky window: bleeds off the right edge; its name lets it morph into the inner-page sky band */}
      <ViewTransition name="sky-window" share="auto" default="none">
        <div className="absolute top-16 right-0 bottom-[34%] left-0 overflow-hidden border-b border-border md:top-24 md:bottom-44 md:left-[21%] md:border-l">
          <MediaAsset id="preRenderedPoster" fill priority sizes="(min-width: 768px) 80vw, 100vw" className="object-[72%_50%] md:object-center" />
          <HeroScene />
        </div>
      </ViewTransition>

      <p className="t-utility absolute top-24 left-4 z-10 hidden max-w-[16ch] md:block lg:left-8">
        <span className="bg-secondary px-1">(01)</span> Art direction studio, working with the ceiling removed
      </p>

      <p className="t-utility absolute top-36 right-8 z-10 hidden -rotate-6 border border-border bg-secondary px-3 py-2 [@media(min-width:768px)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:block">
        Move your cursor — the sky follows
      </p>

      <h1 id="hero-title" className="t-display absolute bottom-[calc(34%-0.55em)] left-4 z-10 md:bottom-28 lg:left-8">
        <HeroLines lines={desktop} className="hidden md:block" />
        <HeroLines lines={mobile} className="md:hidden" />
      </h1>

      <div className="absolute right-4 bottom-8 left-4 z-10 flex flex-col gap-4 md:left-auto md:w-[34%] lg:w-[28%] lg:right-8">
        <p className="max-w-[40ch]">
          SKYISTHELIMIT is an art direction studio for type, depth and motion — work that makes people look up.
        </p>
        <Link
          href="/experiment"
          className="t-utility inline-flex min-h-11 items-center self-start border border-border bg-primary px-4 text-background hover:bg-secondary hover:text-text"
        >
          See the archive
        </Link>
      </div>
    </section>
  );
}
