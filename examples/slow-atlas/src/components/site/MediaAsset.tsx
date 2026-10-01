import { assets, type AssetKey } from '@/config/assets'

// Renders any photo from the asset layer by key. Lazy by default; pass priority for the one first-screen image.
export function MediaAsset({ id, className, priority = false, decorative = false }: { id: AssetKey; className?: string; priority?: boolean; decorative?: boolean }) {
  const a = assets[id]
  return (
    <img src={a.src} alt={decorative ? '' : a.alt} width={a.width} height={a.height} className={className}
      loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />
  )
}
