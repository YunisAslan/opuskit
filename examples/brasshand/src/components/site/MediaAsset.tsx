import { assets, type AssetKey } from '@/config/assets'

/** Renders any image from the asset config layer by key. Lazy unless it is the first screen's media. */
export function MediaAsset({ id, className, priority = false }: { id: AssetKey; className?: string; priority?: boolean }) {
  const a = assets[id]
  return <img src={a.src} alt={a.alt} loading={priority ? 'eager' : 'lazy'} decoding="async" className={`rounded-(--radius-media) object-cover ${className ?? ''}`} />
}
