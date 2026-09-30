// Renders any image from the asset config layer. Temporary assets get a dev-only badge.
import { assets, type Asset, type AssetKey } from '@/config/assets'

export function MediaAsset({ id, className, alt, thumb = false, priority = false }: { id: AssetKey; className?: string; alt?: string; thumb?: boolean; priority?: boolean }) {
  const a: Asset = assets[id]
  const src = (thumb && a.thumb) || a.src
  const img = (
    // eslint-disable-next-line @next/next/no-img-element -- static stills; sizes are fixed and small
    <img src={src} alt={alt ?? a.alt} width={a.width} height={a.height}
      loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" className={className} />
  )
  if (process.env.NODE_ENV !== 'development' || a.status !== 'temporary') return img
  return (
    <span className="relative block h-full w-full">
      {img}
      <span className="type-utility pointer-events-none absolute top-2 left-2 border-2 border-(--color-text) bg-(--color-surface) px-1.5 py-0.5 [font-size:0.7rem]">Temporary</span>
    </span>
  )
}

/** Plain src/alt for kit pieces that take strings (TiltedGrid). */
export const media = (id: AssetKey, thumb = false) => {
  const a: Asset = assets[id]
  return { src: (thumb && a.thumb) || a.src, alt: a.alt }
}
