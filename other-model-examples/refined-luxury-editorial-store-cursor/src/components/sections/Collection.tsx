import type { ElementType } from 'react'
import type { AssetKey } from '@/config/assets'
import { MediaAsset } from '@/components/pieces/MediaAsset'
import { Reveal, RevealImage } from '@/components/pieces/Reveal'

// OpusKit section — Collection: a full-height picture with the season's title over a scrim, then its
// key pieces. Media is rendered through the asset layer; the scrim keeps text on the page ground.
export type Piece = { name: string; price: string; image: AssetKey; href: string }

export function CollectionSection({
  tone,
  link: L = 'a',
  season,
  title,
  text,
  image,
  pieces,
}: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'
  link?: ElementType
  season: string
  title: string
  text: string
  image: AssetKey
  pieces: Piece[]
}) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone}>
      <div className="relative min-h-[90svh] overflow-hidden">
        <RevealImage className="absolute inset-0">
          <MediaAsset id={image} alt="" className="size-full" />
        </RevealImage>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-(--color-background) via-(--color-background)/80 to-transparent px-(--gutter) pb-10 pt-32">
          <div className="mx-auto max-w-(--container)">
            <p className="type-utility">{season}</p>
            <h2 className="type-display mt-2 [font-size:clamp(2.5rem,8vw,7rem)]">{title}</h2>
            <p className="type-body mt-4 max-w-[48ch] opacity-90">{text}</p>
          </div>
        </div>
      </div>
      <ul data-tile-grid className="mx-auto grid max-w-(--container) grid-cols-2 gap-4 px-(--gutter) py-[calc(var(--section-y)*0.5)] md:grid-cols-3">
        {pieces.map((p) => (
          <li key={p.href}>
            <L href={p.href} className="group block">
              <div data-tile-media className="overflow-hidden rounded-(--radius-media) bg-(--color-surface)">
                <MediaAsset id={p.image} alt="" className="aspect-(--ratio-card) h-auto w-full" />
              </div>
              <p className="mt-3 flex justify-between gap-3">
                <span className="type-body group-hover:underline group-hover:underline-offset-4">{p.name}</span>
                <span className="type-body tabular-nums text-(--color-muted)">{p.price}</span>
              </p>
            </L>
          </li>
        ))}
      </ul>
    </section>
  )
}