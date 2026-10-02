// Renders any photo from the asset layer by key: src, alt and size come from src/config/assets.ts. Temporary assets
// get a small badge in development so they're easy to spot and replace.
import { assets, type AssetKey } from '@/config/assets'

export function MediaAsset({ id, className = '', priority = false }: { id: AssetKey; className?: string; priority?: boolean }) {
  const a = assets[id]
  const temp = (a.status as string) === 'temporary' && process.env.NODE_ENV === 'development'
  return (
    <>
      <img src={a.src} alt={a.alt} width={a.width} height={a.height} loading={priority ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : undefined} className={className} />
      {temp && <span className="type-utility absolute top-2 left-2 bg-(--color-text) px-2 text-(--color-background)">Temporary</span>}
    </>
  )
}
