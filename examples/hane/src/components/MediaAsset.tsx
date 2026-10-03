import { assets, type AssetKey } from '@/config/assets'

// Renders any photo from the asset layer: WebP copies at 800/1600px plus the original, real width/height (no layout
// shift), lazy unless it is the first screen's photo.
export function MediaAsset({ id, className, sizes = '100vw', priority = false }: { id: AssetKey; className?: string; sizes?: string; priority?: boolean }) {
  const a = assets[id]
  const base = a.src.replace(/\.jpg$/, '')
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export: next/image has no optimiser here, so the sizes are pre-made
    <img src={a.src} srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w, ${a.src} ${a.width}w`} sizes={sizes}
      width={a.width} height={a.height} alt={a.alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined}
      decoding="async" className={className} />
  )
}
