import Image from "next/image";
import { assets, type AssetId } from "@/config/assets";
import LoopVideo from "./LoopVideo";

// Renders any image/video by key from config/assets.ts. The wrapper takes its
// size from `className` (set an aspect ratio or height); media fills it.
type Props = {
  id: AssetId;
  className?: string;
  sizes?: string;
  priority?: boolean;
  reveal?: boolean;
  /** decorative duplicates (e.g. hover alternates) get empty alt */
  decorative?: boolean;
  imgClassName?: string;
};

export default function MediaAsset({
  id,
  className = "",
  sizes = "100vw",
  priority,
  reveal = true,
  decorative,
  imgClassName = "",
}: Props) {
  const a = assets[id];
  const badge =
    process.env.NODE_ENV === "development" && a.temp ? (
      <span className="t-utility pointer-events-none absolute top-2 left-2 z-10 rounded bg-accent px-2 py-1 text-[10px] text-background">
        temp asset
      </span>
    ) : null;

  return (
    <div
      className={`relative overflow-hidden bg-surface ${className}`}
      data-reveal={reveal ? "clip" : undefined}
    >
      {a.kind === "image" ? (
        <Image
          src={a.src}
          alt={decorative ? "" : a.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
          style={{ objectPosition: a.focus }}
        />
      ) : (
        <LoopVideo src={a.src} poster={a.poster} label={a.alt} focus={a.focus} />
      )}
      {badge}
    </div>
  );
}
