import Image, { getImageProps } from 'next/image'
import { assets, type AssetKey } from '@/config/assets'

// Renders any picture from the asset layer by key. `fill` covers a sized parent; otherwise the picture keeps its own
// shape at full width. Everything lazy-loads except the hero (`eager`).
export function MediaAsset({ id, sizes, className = '', fill = false, eager = false, alt }: {
  id: AssetKey; sizes: string; className?: string; fill?: boolean; eager?: boolean; alt?: string
}) {
  const a = assets[id]
  const load = eager ? ({ loading: 'eager', fetchPriority: 'high' } as const) : {}
  const img = fill
    ? <Image src={a.src} alt={alt ?? a.alt} fill sizes={sizes} {...load} className={`object-cover ${className}`} />
    : <Image src={a.src} alt={alt ?? a.alt} width={a.width} height={a.height} sizes={sizes} {...load} className={`h-auto w-full ${className}`} />
  return <>{img}{a.status === 'temporary' && process.env.NODE_ENV === 'development' && <TemporaryBadge />}</>
}

/** One picture, two crops (art direction): `wide` from 768px up, `narrow` below. Only the matching file loads. */
export function ArtDirected({ wide, narrow, sizes, className = '' }: { wide: AssetKey; narrow: AssetKey; sizes: string; className?: string }) {
  const w = assets[wide]
  const n = assets[narrow]
  const { props: { srcSet: wideSet } } = getImageProps({ src: w.src, alt: w.alt, fill: true, sizes })
  const { props: { srcSet: narrowSet, ...rest } } = getImageProps({ src: n.src, alt: w.alt, fill: true, sizes: '100vw', loading: 'eager', fetchPriority: 'high' })
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={wideSet} sizes={sizes} />
      <source srcSet={narrowSet} sizes="100vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img {...rest} className={`object-cover ${className}`} />
    </picture>
  )
}

const TemporaryBadge = () => <span className="type-utility absolute left-2 top-2 z-10 rounded-button bg-background px-2 py-1">Temporary</span>
