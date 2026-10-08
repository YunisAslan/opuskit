// Renders any picture from the asset layer (src/config/assets.ts) through next/image.
// `fit="intrinsic"` keeps the file's own ratio (works are never cropped); `fit="cover"` fills a frame the parent sizes.
// Temporary files show a small badge in development only.
import Image from 'next/image'
import { type AssetKey, type Media, media as resolve } from '@/config/assets'
import { cn } from '@/lib/utils'

type P = {
  /** A resolved file, or a key (+ index) to resolve. */
  m?: Media
  id?: AssetKey
  index?: number
  alt?: string
  sizes: string
  priority?: boolean
  /** The lead picture of a page that has no hero: fetched first, never lazy, without a preload link. */
  eager?: boolean
  fit?: 'intrinsic' | 'cover'
  className?: string
}

export function MediaAsset({ m, id, index = 0, alt, sizes, priority, eager, fit = 'intrinsic', className }: P) {
  const lead = eager ? { loading: 'eager' as const, fetchPriority: 'high' as const } : {}
  const file = m ?? resolve(id!, index, alt)
  const badge = process.env.NODE_ENV === 'development' && file.temporary && (
    <span className="type-caption pointer-events-none absolute bottom-2 right-2 z-10 bg-(--color-surface) px-2 py-0.5 text-(--color-text)">Temporary: {file.key}</span>
  )
  if (fit === 'cover') return (
    <>
      <Image src={file.src} alt={alt ?? file.alt} fill sizes={sizes} preload={priority} {...lead} className={cn('object-cover', className)} />
      {badge}
    </>
  )
  return (
    <span className="relative block">
      <Image src={file.src} alt={alt ?? file.alt} width={file.width} height={file.height} sizes={sizes} preload={priority} {...lead} className={cn('block h-auto w-full', className)} />
      {badge}
    </span>
  )
}
