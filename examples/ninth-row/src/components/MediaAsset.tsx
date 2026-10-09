'use client'
// Renders any picture from the asset layer by key. The space is held by the asset's own ratio on --color-surface; the
// picture fades in over 350 ms once loaded — never pops. In development a temporary asset carries a small badge.
import Image from 'next/image'
import { useState } from 'react'
import { asset, type AssetKey } from '@/config/assets'
import { cn } from '@/lib/utils'

type Props = {
  id: AssetKey
  index?: number
  className?: string
  /** Classes for the <img> itself (object-position, scale…). */
  imgClassName?: string
  sizes?: string
  priority?: boolean
  /** Fill the parent (which sets the ratio) instead of using the file's own ratio. */
  fill?: boolean
  alt?: string
}

export function MediaAsset({ id, index = 0, className, imgClassName, sizes = '100vw', priority, fill, alt }: Props) {
  const a = asset(id, index)
  const [loaded, setLoaded] = useState(false)
  const img = (
    <Image
      src={a.src}
      alt={alt ?? a.alt}
      width={fill ? undefined : a.width}
      height={fill ? undefined : a.height}
      fill={fill}
      sizes={sizes}
      priority={priority}
      onLoad={() => setLoaded(true)}
      style={{ objectPosition: a.focus }}
      className={cn('block h-full w-full object-cover transition-opacity duration-[350ms] ease-(--ease-out) motion-reduce:transition-none', loaded || priority ? 'opacity-100' : 'opacity-0', imgClassName)}
    />
  )
  return (
    <div className={cn('relative overflow-hidden bg-(--color-surface)', className)}>
      {img}
      {process.env.NODE_ENV === 'development' && a.status === 'temporary' && (
        <span className="type-caption pointer-events-none absolute right-2 bottom-2 z-10 bg-(--color-background) px-2 py-1 text-(--color-muted)">Temporary</span>
      )}
    </div>
  )
}
