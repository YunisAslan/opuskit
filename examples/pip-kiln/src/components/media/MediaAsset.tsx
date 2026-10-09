'use client'
import Image from 'next/image'
import { useState } from 'react'
import { media, type AssetKey } from '@/config/assets'
import { cn } from '@/lib/utils'

type Props = {
  id: AssetKey
  index?: number
  product?: string
  alt?: string
  /** classes for the frame: give it a size or an aspect ratio; the picture covers it */
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  /** keep the file's own ratio on the frame (default) — set false when the className sets the shape */
  ownRatio?: boolean
}

/**
 * Every picture on the site. Resolves the file from the asset layer, holds its space on the surface colour, fades it
 * in once loaded (the hero shows at once), falls back to a quiet block if the file is missing, and marks temporary
 * files with a small badge in development only.
 */
export function MediaAsset({ id, index, product, alt, className, imgClassName, sizes = '(min-width: 768px) 50vw, 100vw', priority, ownRatio = true }: Props) {
  const m = media(id, { index, product, alt })
  const [loaded, setLoaded] = useState(false)
  const [broken, setBroken] = useState(false)
  return (
    <div className={cn('relative overflow-hidden bg-(--color-surface)', className)} style={ownRatio ? { aspectRatio: `${m.width} / ${m.height}` } : undefined}>
      {broken ? (
        <span className="type-caption absolute inset-0 grid place-items-center p-4 text-center text-(--color-muted)">Photo on its way</span>
      ) : (
        <Image
          src={m.src} alt={m.alt} fill sizes={sizes} priority={priority}
          ref={(img) => { if (img?.complete && img.naturalWidth) setLoaded(true) }}
          onLoad={() => setLoaded(true)} onError={() => setBroken(true)}
          data-loaded={priority || loaded}
          className={cn('media-img object-cover', imgClassName)}
        />
      )}
      {m.temporary && process.env.NODE_ENV === 'development' && (
        <span aria-hidden className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-(--radius-button) bg-(--color-text) px-2 py-0.5 text-[11px] font-semibold text-(--color-background)">Temporary</span>
      )}
    </div>
  )
}
