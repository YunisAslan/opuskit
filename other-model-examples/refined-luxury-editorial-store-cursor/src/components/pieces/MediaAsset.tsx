import { getAsset, type AssetKey } from '@/config/assets'
import { cn } from '@/lib/utils'

// Every picture on the site is rendered through this component, reading src/config/assets.ts.
// Swap a temporary file for the owner's own photography with no change here.
export function MediaAsset({
  id,
  className,
  alt,
  priority = false,
  sizes = '100vw',
}: {
  id: AssetKey
  className?: string
  /** Override the alt text; pass '' for a decorative picture. */
  alt?: string
  /** Only the hero uses priority loading; everything else lazy-loads. */
  priority?: boolean
  sizes?: string
}) {
  const asset = getAsset(id)
  const resolvedAlt = alt !== undefined ? alt : asset.alt
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset.src}
      alt={resolvedAlt}
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      draggable={false}
      className={cn('block h-full w-full object-cover', className)}
    />
  )
}