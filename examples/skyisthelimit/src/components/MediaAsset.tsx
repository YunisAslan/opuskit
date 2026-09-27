import Image from "next/image";
import { assets, type AssetKey } from "@/config/assets";

type ImageKey = { [K in AssetKey]: (typeof assets)[K] extends { width: number } ? K : never }[AssetKey];

type Props = {
  id: ImageKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Fill the (positioned) parent and crop with object-cover. */
  fill?: boolean;
};

export default function MediaAsset({ id, className = "", sizes = "100vw", priority, fill }: Props) {
  const a = assets[id];
  return (
    <>
      <Image
        src={a.src}
        alt={a.alt}
        sizes={sizes}
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
        {...(fill ? { fill: true } : { width: a.width, height: a.height })}
        className={`${fill ? "object-cover" : "h-auto w-full"} ${className}`}
      />
      {process.env.NODE_ENV === "development" && a.status === "temporary" && (
        <span className="t-utility pointer-events-none absolute top-2 left-2 z-10 bg-secondary px-2 py-1">Temporary</span>
      )}
    </>
  );
}
