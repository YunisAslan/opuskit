'use client'
// Renders any picture from the asset layer (src/config/assets.ts). The space is held by the frame the parent gives
// (fill) or by the asset's own ratio; it sits on --color-surface and fades in over 350ms once loaded — never pops,
// never jumps. Temporary assets wear a small "Temporary" tag in development only.
import Image from 'next/image'
import { useState } from 'react'
import { media, type MediaId } from '@/config/assets'

type P = {
  id: MediaId
  alt?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  className?: string
  /** Classes for the <img> itself (object-position, scale…). */ imgClassName?: string
}

export function MediaAsset({ id, alt, fill = false, sizes = '100vw', priority = false, className = '', imgClassName = '' }: P) {
  const a = media(id)
  const [loaded, setLoaded] = useState(false)
  const img = (
    <Image src={a.src} alt={alt ?? a.alt} sizes={sizes} priority={priority} quality={75}
      {...(fill ? { fill: true } : { width: a.width, height: a.height })}
      onLoad={() => setLoaded(true)}
      ref={(el) => { if (el?.complete && el.naturalWidth) setLoaded(true) }} // already in the cache before hydration
      style={a.position ? { objectPosition: a.position } : undefined}
      className={`object-cover transition-opacity duration-350 ease-(--ease-out) motion-reduce:duration-200 ${fill ? '' : 'h-auto w-full'} ${loaded || priority ? 'opacity-100' : 'opacity-0'} ${imgClassName}`} />
  )
  const tag = process.env.NODE_ENV !== 'production' && a.status === 'temporary'
    ? <span className="type-caption pointer-events-none absolute left-2 top-2 z-10 rounded-(--radius-button) bg-(--color-text) px-2 py-0.5 text-(--color-background)">Temporary</span>
    : null
  if (fill) return <span className={`absolute inset-0 block overflow-hidden bg-(--color-surface) ${className}`}>{img}{tag}</span>
  return <span className={`relative block overflow-hidden bg-(--color-surface) ${className}`}>{img}{tag}</span>
}
