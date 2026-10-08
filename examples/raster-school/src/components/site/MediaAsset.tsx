'use client'
// Every picture on the site comes through here: the asset key resolves src, size, ratio and alt from config/assets.ts.
// The space is held at the asset's own ratio on the surface colour; the picture fades in once loaded; a missing file
// leaves a calm block with its key instead of a broken image. A key with several files takes the alt of the file shown
// (alts[index]). Only a temporary asset gets the small badge, and only in development.
import Image from 'next/image'
import { useState } from 'react'
import { assets, type Asset, type AssetKey } from '@/config/assets'
import { cn } from '@/lib/utils'

type Props = {
  id: AssetKey
  index?: number
  alt?: string
  sizes: string
  className?: string
  /** Override the frame ratio (CSS aspect-ratio value); the file's own ratio otherwise. */
  ratio?: string
  eager?: boolean
}

export function MediaAsset({ id, index = 0, alt, sizes, className, ratio, eager }: Props) {
  const a: Asset = assets[id]
  const src = a.files?.[index] ?? a.src
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading')
  const temporary = a.status === 'temporary'

  return (
    <div
      className={cn('relative overflow-hidden rounded-(--radius-media) bg-(--color-surface)', className)}
      style={{ aspectRatio: ratio ?? `${a.width} / ${a.height}` }}
    >
      {state === 'error' ? (
        <span className="type-caption absolute inset-0 grid place-items-center p-2 text-center text-(--color-muted)">{src.split('/').pop()}</span>
      ) : (
        <Image
          src={src}
          alt={alt ?? a.alts?.[index] ?? a.alt}
          width={a.width}
          height={a.height}
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
          className={cn(
            'absolute inset-0 size-full object-cover transition-opacity duration-[360ms] ease-(--ease-out)',
            state === 'loaded' ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
      {temporary && process.env.NODE_ENV === 'development' && (
        <span className="type-utility pointer-events-none absolute right-1 bottom-1 bg-(--color-background) px-1 [font-size:10px] text-(--color-text)">Temp</span>
      )}
    </div>
  )
}
