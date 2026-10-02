// Renders any photo from the asset layer by key: responsive .webp sizes, intrinsic size (no layout shift), lazy unless
// it is the hero. reveal="clip" opens the frame like a curtain as it enters (CSS in globals.css, driven by Reveals).
import { assets, srcSetOf, type AssetKey } from '@/config/assets'

export function MediaAsset({ id, className, frameClassName, sizes = '(min-width: 1024px) 50vw, 100vw', priority = false, reveal = 'none', alt }: {
  id: AssetKey; className?: string; frameClassName?: string; sizes?: string; priority?: boolean; reveal?: 'clip' | 'none'; alt?: string
}) {
  const a = assets[id]
  const temporary = process.env.NODE_ENV === 'development' && (a.status as string) === 'temporary'
  return (
    <div data-clip={reveal === 'clip' ? '' : undefined} className={`relative overflow-hidden rounded-(--radius-media) bg-(--color-surface) ${frameClassName ?? ''}`}>
      {/* plain <img>: a static export has no image optimiser; the .webp sizes are pre-made next to each photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={a.src} srcSet={srcSetOf(id)} sizes={sizes} width={a.width} height={a.height} alt={alt ?? a.alt}
        loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async"
        className={`h-full w-full object-cover ${className ?? ''}`} />
      {temporary && <span className="type-utility absolute left-3 top-3 rounded-full bg-(--color-text) px-2 py-1 text-(--color-background)">Temporary</span>}
    </div>
  )
}
