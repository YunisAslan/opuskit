import { assets, type AssetKey } from '@/config/assets'

// Renders any image from the asset layer by key: src, alt and intrinsic size (no layout shift) come from config.
// A temporary asset shows a small badge in development.
export function MediaAsset({ id, className, priority = false, sizes }: { id: AssetKey; className?: string; priority?: boolean; sizes?: string }) {
  const a = assets[id]
  return (
    <span className="relative block">
      <img src={a.src} alt={a.alt} width={a.width} height={a.height} sizes={sizes} className={className}
        loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />
      {process.env.NODE_ENV === 'development' && (a.status as string) === 'temporary' && (
        <span className="type-utility absolute left-2 top-2 rounded-(--radius-button) bg-(--color-background) px-2 py-1 text-(--color-accent)">Temporary</span>
      )}
    </span>
  )
}
