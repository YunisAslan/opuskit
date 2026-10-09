'use client'
// <MediaAsset id="hero" /> — every picture on the site comes through here. It resolves the file from the asset layer,
// holds the space at the asset's own ratio (or the frame's crop) on --color-surface, fades the picture in once it has
// loaded, and can open with the image clip reveal. `mobile` swaps in a dedicated phone crop (art direction through
// getImageProps). A missing file leaves a calm surface block with its alt, never a broken icon.
import { getImageProps } from 'next/image'
import { useState, type CSSProperties } from 'react'
import { asset, type AssetKey } from '@/config/assets'
import { cn } from '@/lib/utils'

type Props = {
  id: AssetKey
  index?: number
  alt?: string
  /** CSS aspect-ratio of the frame, e.g. "3 / 4" or "var(--ratio-media)". Defaults to the file's own ratio. */
  ratio?: string
  /** a different crop on phones (< 768px), e.g. "4 / 5" */
  mobileRatio?: string
  mobile?: AssetKey
  sizes?: string
  preload?: boolean
  reveal?: 'clip' | 'horizon'
  className?: string
  imgClassName?: string
  style?: CSSProperties
  /** focal point, kept inside the centre 60% for safe crops */
  position?: string
  rounded?: boolean
}

const DEV = process.env.NODE_ENV !== 'production'

export function MediaAsset({ id, index = 0, alt, ratio, mobileRatio, mobile, sizes = '100vw', preload, reveal, className, imgClassName, style, position = '50% 50%', rounded = true }: Props) {
  const a = asset(id, index)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const label = alt ?? a.alt
  // the hero is the LCP: fetched first, eager, and shown at once (it fades up with the first screen instead)
  const common = { alt: label, sizes, fill: true, quality: 75, ...(preload ? { loading: 'eager' as const, fetchPriority: 'high' as const } : {}) }
  const { props: desk } = getImageProps({ ...common, src: a.src })
  const m = mobile ? asset(mobile) : null
  const phone = m ? getImageProps({ ...common, src: m.src }).props : null
  const own = `${a.width} / ${a.height}`

  return (
    <div
      data-clip={reveal === 'horizon' ? 'horizon' : reveal ? '' : undefined}
      className={cn('media-frame relative isolate overflow-hidden bg-(--color-surface)', rounded && 'rounded-(--radius-media)', className)}
      style={{ ['--r' as string]: ratio ?? own, ['--rm' as string]: mobileRatio ?? ratio ?? own, ...style }}
    >
      <div data-clip-inner className="absolute inset-0">
        {!failed && (
          <picture>
            {phone && <source media="(max-width: 767px)" srcSet={phone.srcSet} sizes={phone.sizes} />}
            {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
            <img
              {...desk}
              ref={(el) => { if (el?.complete && el.naturalWidth > 0) setLoaded(true) }}
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              data-loaded={loaded || preload ? '' : undefined}
              className={cn('media-img h-full w-full object-cover', imgClassName)}
              // a temporary placeholder keeps its corner (the key) in view whatever the crop; real photos use their focal point
              style={{ ...desk.style, objectPosition: a.temporary ? '0% 0%' : position }}
            />
          </picture>
        )}
        {failed && <span className="type-caption absolute inset-0 grid place-items-center p-6 text-center text-(--color-muted)">{label}</span>}
      </div>
      {DEV && a.temporary && <span className="type-caption pointer-events-none absolute right-2 top-2 rounded-(--radius-button) bg-(--color-background) px-2 py-0.5 text-(--color-text)">Temporary</span>}
    </div>
  )
}
