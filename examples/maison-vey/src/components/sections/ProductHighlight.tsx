'use client'
// OpusKit section — Product Highlight (media: side): one product in depth, large media beside 3–4 real details.
// Fitted to Maison Vey: the picture opens with the image clip reveal; the size is chosen in place (radio group)
// and the action adds it to the bag.
import { useState } from 'react'
import type { AssetKey } from '@/config/assets'
import { MediaAsset } from '@/components/media/MediaAsset'
import { FadeRise, ImageReveal, Lines, RevealGroup } from '@/components/motion/Reveal'
import { RadioChoice, RadioGroup } from '@/components/ui/radio-group'
import { AddToBag } from '@/components/site/AddToBag'
import { formatPrice, type Size } from '@/content/products'

type P = {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'
  slug: string; name: string; text: string; image: AssetKey; alt?: string
  details: { label: string; value: string }[]; sizes: Size[]; defaultSize?: string; action: string
  as?: 'h2' | 'h3'
}

export function ProductHighlightSection({ tone, slug, name, text, image, alt, details, sizes, defaultSize, action }: P) {
  const [size, setSize] = useState(defaultSize ?? sizes[Math.min(1, sizes.length - 1)].label)
  const price = sizes.find((s) => s.label === size)?.price ?? sizes[0].price
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) items-center gap-x-(--grid-gap) gap-y-12 md:grid-cols-12">
        <ImageReveal className="md:col-span-7">
          <MediaAsset id={image} alt={alt} sizes="(min-width: 768px) 58vw, 100vw" />
        </ImageReveal>
        <RevealGroup className="md:col-span-4 md:col-start-9">
          <Lines as="h2" standalone={false} lines={[name]} className="type-display [font-size:clamp(2.75rem,5vw,4.5rem)]" />
          <FadeRise as="p" i={1} className="type-body mt-6 text-(--color-muted)">{text}</FadeRise>
          <FadeRise i={2} className="mt-10">
            <dl className="divide-y divide-(--color-border) border-y border-(--color-border)">
              {details.map((d) => (
                <div key={d.label} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="type-caption text-(--color-muted)">{d.label}</dt>
                  <dd className="type-body text-right">{d.value}</dd>
                </div>
              ))}
            </dl>
          </FadeRise>
          {sizes.length > 1 && (
            <FadeRise i={3} className="mt-8">
              <p id={`${slug}-hl-size`} className="type-caption text-(--color-muted)">Size</p>
              <RadioGroup aria-labelledby={`${slug}-hl-size`} value={size} onValueChange={setSize} className="mt-3 flex flex-wrap gap-2">
                {sizes.map((s) => <RadioChoice key={s.label} value={s.label}>{s.label}</RadioChoice>)}
              </RadioGroup>
            </FadeRise>
          )}
          <FadeRise i={4} className="mt-8 flex items-center gap-6">
            <AddToBag slug={slug} size={size} label={action} />
            <span className="type-body tabular-nums">{formatPrice(price)}</span>
          </FadeRise>
        </RevealGroup>
      </div>
    </section>
  )
}
