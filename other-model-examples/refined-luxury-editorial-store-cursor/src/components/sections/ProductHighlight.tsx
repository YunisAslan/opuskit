import type { ElementType } from 'react'
import type { AssetKey } from '@/config/assets'
import { MediaAsset } from '@/components/pieces/MediaAsset'
import { Reveal, RevealImage } from '@/components/pieces/Reveal'

// OpusKit section — Product Highlight: one product (or feature) in depth — large media and 3–4 real
// details. media: side (media beside the details), full (across the page, details beneath) or over
// (the product on its own colour field with the name set over it).
type P = {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'
  media?: 'side' | 'full' | 'over'
  link?: ElementType
  name: string
  text: string
  image: AssetKey
  details: { label: string; value: string }[]
  action: { label: string; href: string }
}

export function ProductHighlightSection({ tone, media = 'side', link: L = 'a', name, text, image, details, action }: P) {
  const list = (
    <dl className="divide-y divide-(--color-border) border-y border-(--color-border)">
      {details.map((d) => (
        <div key={d.label} className="flex justify-between gap-4 py-3">
          <dt className="type-utility text-(--color-muted)">{d.label}</dt>
          <dd className="type-body text-right">{d.value}</dd>
        </div>
      ))}
    </dl>
  )
  const buy = (
    <L href={action.href} className="type-body inline-block rounded-(--radius-button) bg-(--color-primary) px-6 py-3 text-(--color-background)">
      {action.label}
    </L>
  )

  if (media === 'over') {
    return (
      <section data-tone={tone === 'ground' ? 'surface' : tone ?? 'surface'} className="overflow-hidden px-(--gutter) py-(--section-y)">
        <div className="relative mx-auto max-w-(--container) text-center">
          <h2 className="type-display relative z-10 leading-[0.85] [font-size:clamp(3.5rem,13vw,12rem)]">{name}</h2>
          <RevealImage className="relative z-20 mx-auto -mt-[6vw] max-w-xl">
            <MediaAsset id={image} alt="" className="mx-auto aspect-square w-full object-contain" />
          </RevealImage>
          <p className="type-body mx-auto mt-8 max-w-[52ch] text-(--color-muted)">{text}</p>
          <div className="mx-auto mt-8 max-w-xl text-left">{list}</div>
          <div className="mt-8">{buy}</div>
        </div>
      </section>
    )
  }

  if (media === 'full') {
    return (
      <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
        <div className="mx-auto max-w-(--container)">
          <RevealImage>
            <MediaAsset id={image} alt="" className="aspect-(--ratio-media) w-full bg-(--color-surface)" />
          </RevealImage>
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="type-display [font-size:clamp(2.2rem,4.5vw,4rem)]">{name}</h2>
              <p className="type-body mt-4 text-(--color-muted)">{text}</p>
              <div className="mt-8">{buy}</div>
            </div>
            <div className="md:col-span-6 md:col-start-7">{list}</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) items-center gap-12 md:grid-cols-12">
        <RevealImage className="md:col-span-7">
          <MediaAsset id={image} alt="" className="aspect-square w-full bg-(--color-surface)" />
        </RevealImage>
        <Reveal className="md:col-span-4 md:col-start-9" delay={0.1}>
          <h2 className="type-display [font-size:clamp(2.2rem,4.5vw,4rem)]">{name}</h2>
          <p className="type-body mt-4 text-(--color-muted)">{text}</p>
          <div className="mt-8">{list}</div>
          <div className="mt-8">{buy}</div>
        </Reveal>
      </div>
    </section>
  )
}