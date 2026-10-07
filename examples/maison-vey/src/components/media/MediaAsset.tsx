import Image, { getImageProps } from 'next/image'
import { assets, type AssetKey } from '@/config/assets'
import { cn } from '@/lib/utils'

const isDev = process.env.NODE_ENV === 'development'

/** Dev-only marker on temporary media, so nobody ships a placeholder by mistake. */
function TemporaryBadge({ id }: { id: AssetKey }) {
  if (!isDev || assets[id].status !== 'temporary') return null
  return (
    <span aria-hidden className="type-caption pointer-events-none absolute left-2 top-2 z-10 bg-(--color-background) px-2 py-0.5 text-(--color-muted)">
      Temporary
    </span>
  )
}

type Props = {
  id: AssetKey
  /** Classes for the frame (sets the ratio from the asset unless `fill` or a ratio class is given). */
  className?: string
  imgClassName?: string
  sizes: string
  /** Hero only: fetch first. Everything else lazy-loads. */
  preload?: boolean
  /** Fill the parent (parent must be positioned and sized). */
  fill?: boolean
  /** Decorative: empty alt. */
  decorative?: boolean
  alt?: string
}

/**
 * Renders any image from the asset layer by key. Width, height and alt come from src/config/assets.ts,
 * so every frame reserves its space (no layout shift) and every file stays replaceable.
 */
export function MediaAsset({ id, className, imgClassName, sizes, preload, fill, decorative, alt }: Props) {
  const a = assets[id]
  return (
    <span
      className={cn('relative block overflow-hidden bg-(--color-surface)', fill && 'absolute inset-0', className)}
      style={fill ? undefined : { aspectRatio: `${a.width} / ${a.height}` }}
    >
      <Image
        src={a.src}
        alt={decorative ? '' : (alt ?? a.alt)}
        fill
        sizes={sizes}
        preload={preload}
        className={cn('object-cover', imgClassName)}
      />
      <TemporaryBadge id={id} />
    </span>
  )
}

/** Art direction: one key for wide screens, another crop for phones (e.g. hero 16:9 and its 4:5 crop). */
export function ArtDirectedAsset({ desktop, mobile, breakpoint = 768, className, imgClassName, alt }: {
  desktop: AssetKey; mobile: AssetKey; breakpoint?: number; className?: string; imgClassName?: string; alt?: string
}) {
  const d = assets[desktop]
  const m = assets[mobile]
  const common = { alt: alt ?? d.alt, sizes: '100vw' }
  const { props: { srcSet: wide } } = getImageProps({ ...common, src: d.src, width: d.width, height: d.height })
  const { props: { srcSet: narrow, ...rest } } = getImageProps({ ...common, src: m.src, width: m.width, height: m.height })
  return (
    <span className={cn('relative block overflow-hidden bg-(--color-surface)', className)}>
      <picture>
        <source media={`(min-width: ${breakpoint}px)`} srcSet={wide} />
        <source media={`(max-width: ${breakpoint - 1}px)`} srcSet={narrow} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt arrives in rest */}
        <img {...rest} loading="eager" fetchPriority="high" className={cn('absolute inset-0 size-full object-cover', imgClassName)} />
      </picture>
      <TemporaryBadge id={desktop} />
    </span>
  )
}
