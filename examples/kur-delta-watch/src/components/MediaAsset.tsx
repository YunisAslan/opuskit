import { assets, type AssetKey } from '@/config/assets'

// Every photo goes through the asset layer: <MediaAsset id="delta1" />. Lazy unless it's the page's lead media.
export function MediaAsset({ id, className, priority = false, alt }: { id: AssetKey; className?: string; priority?: boolean; alt?: string }) {
  const a = assets[id]
  return <img src={a.src} alt={alt ?? a.alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" className={className} />
}
