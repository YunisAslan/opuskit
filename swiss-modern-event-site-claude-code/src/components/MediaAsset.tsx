import Image from "next/image"
import { assets, type ImageKey } from "@/config/assets"
import { cn } from "@/lib/utils"

type Props = {
  id: ImageKey
  sizes: string
  className?: string
  priority?: boolean
  decorative?: boolean
}

// Renders any image from the asset layer as a cover-fit fill; the parent sets the ratio.
export function MediaAsset({ id, sizes, className, priority, decorative }: Props) {
  const a = assets[id]
  return (
    <>
      <Image
        src={a.src}
        alt={decorative ? "" : a.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
      {process.env.NODE_ENV === "development" && a.status === "temporary" && (
        <span className="type-utility pointer-events-none absolute top-2 left-2 z-10 bg-text px-2 py-1 text-background">
          Temporary
        </span>
      )}
    </>
  )
}
