import MediaAsset from "./MediaAsset";
import type { AssetId } from "@/config/assets";

export type Look = {
  number: string;
  title: string;
  pieces: string[];
  large: AssetId;
  small: AssetId;
};

// One look as a magazine spread: large + small image, look number, credits.
export default function LookbookSpread({ look, flip }: { look: Look; flip?: boolean }) {
  return (
    <article
      className="look-spread grid min-h-svh shrink-0 grid-cols-12 content-center gap-6 px-6 py-16 lg:min-h-0 lg:w-[88vw] lg:px-12 lg:py-0"
      aria-label={`Look ${look.number}`}
    >
      <MediaAsset
        id={look.large}
        className={`col-span-12 aspect-[4/5] lg:col-span-7 lg:aspect-[16/10] ${flip ? "lg:order-2" : ""}`}
        sizes="(min-width: 1024px) 60vw, 100vw"
      />
      <div className={`col-span-12 flex flex-col justify-between gap-8 lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <div data-reveal="fade">
          <p className="font-display text-[clamp(4rem,8vw,8rem)] leading-[0.85] font-extrabold tracking-[-0.045em] text-accent">{look.number}</p>
          <h3 className="t-heading mt-4">{look.title}</h3>
        </div>
        <MediaAsset id={look.small} className="aspect-[4/5] w-2/3 max-w-[300px] self-end" sizes="(min-width: 1024px) 20vw, 60vw" />
        <div data-reveal="fade">
          <p className="t-utility mb-2 text-muted">Worn</p>
          <ul className="mb-4 space-y-1 text-sm">
            {look.pieces.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <a href="#shop" className="t-utility link link-static text-primary">
            Shop the look
          </a>
        </div>
      </div>
    </article>
  );
}
