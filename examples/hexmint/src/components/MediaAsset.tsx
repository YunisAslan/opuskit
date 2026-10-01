import { assets, type Asset, type AssetKey } from '@/config/assets'

// Renders any image from the asset layer: fixed width/height (no layout shift), a mobile crop when the asset has
// one, lazy unless it is the hero. Temporary assets carry a dev-only badge so they are not forgotten.
export function MediaAsset({ id, className, priority = false }: { id: AssetKey; className?: string; priority?: boolean }) {
  const a: Asset = assets[id]
  const img = (
    <img src={a.src} alt={a.alt} width={a.width} height={a.height} className={className} decoding="async"
      loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} />
  )
  return (
    <>
      {a.mobile ? <picture><source media="(max-width: 639px)" srcSet={a.mobile} />{img}</picture> : img}
      {process.env.NODE_ENV !== 'production' && a.status === 'temporary' && (
        <span className="type-utility absolute left-3 top-3 z-10 rounded-(--radius-button) bg-(--color-accent) px-2 py-1 text-(--color-background)">Temporary</span>
      )}
    </>
  )
}
