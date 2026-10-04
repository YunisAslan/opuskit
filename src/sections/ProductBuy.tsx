'use client'
// OpusKit section — Product buy box: everything needed to buy one product on its own page — the pictures, the name and
// price, one choice (colour or size) as buttons, how many, the button, and the details people check before paying, each
// opening in place. Two designs:
//   sticky — the pictures stacked down the left; the buy column stays in view beside them as you scroll.
//   mosaic — the pictures as a mosaic (the first one large); the buy column beside it.
import { useState, type ElementType } from 'react'

type Img = { src: string; alt: string }
export type BuyDetail = { title: string; text: string }

export function ProductBuySection({ tone, variant = 'sticky', link: L = 'a', name, price, line, images, option, details = [], action, note }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'sticky' | 'mosaic'; link?: ElementType
  name: string; price: string; line?: string; images: Img[]
  /** One choice, e.g. { label: 'Colour', values: ['Oat', 'Ink'] }. */ option?: { label: string; values: string[] }
  details?: BuyDetail[]; action: { label: string; href: string }; note?: string
}) {
  const [pick, setPick] = useState(0)
  const [qty, setQty] = useState(1)
  const [open, setOpen] = useState<number | null>(0)
  const pics = variant === 'mosaic' ? (
    <div className="grid grid-cols-2 gap-3 md:col-span-7">
      {images.map((m, i) => <img key={m.src + i} src={m.src} alt={m.alt} loading={i ? 'lazy' : undefined} className={`w-full rounded-(--radius-media) object-cover ${i === 0 ? 'col-span-2 aspect-(--ratio-media)' : 'aspect-(--ratio-card)'}`} />)}
    </div>
  ) : (
    <div className="space-y-3 md:col-span-7">
      {images.map((m, i) => <img key={m.src + i} src={m.src} alt={m.alt} loading={i ? 'lazy' : undefined} className="aspect-(--ratio-card) w-full rounded-(--radius-media) object-cover" />)}
    </div>
  )
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-[calc(var(--section-y)*0.6)]">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12">
        {pics}
        <div className={`md:col-span-5 ${variant === 'sticky' ? 'self-start md:sticky md:top-24' : ''}`}>
          <h1 className="type-heading [font-size:clamp(1.8rem,3vw,2.8rem)]">{name}</h1>
          <p className="type-heading mt-3 tabular-nums [font-size:1.4rem]">{price}</p>
          {line && <p className="type-body mt-4 max-w-[48ch] text-(--color-muted)">{line}</p>}
          {option && (
            <div className="mt-8">
              <p className="type-utility text-(--color-muted)">{option.label}: <span className="text-(--color-text)">{option.values[pick]}</span></p>
              <div role="radiogroup" aria-label={option.label} className="mt-3 flex flex-wrap gap-2">
                {option.values.map((v, i) => (
                  <button key={v} type="button" role="radio" aria-checked={i === pick} onClick={() => setPick(i)}
                    className={`type-body rounded-(--radius-button) border px-4 py-2 ${i === pick ? 'border-(--color-text)' : 'border-(--color-border) text-(--color-muted) hover:border-(--color-text)'}`}>{v}</button>
                ))}
              </div>
            </div>
          )}
          <div className="mt-8 flex gap-3">
            <div className="type-body flex items-center rounded-(--radius-button) border border-(--color-border)">
              <button type="button" aria-label="One fewer" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3">−</button>
              <span aria-live="polite" className="w-8 text-center tabular-nums">{qty}</span>
              <button type="button" aria-label="One more" onClick={() => setQty((q) => q + 1)} className="px-4 py-3">+</button>
            </div>
            <L href={action.href} className="type-body flex-1 rounded-(--radius-button) bg-(--color-primary) px-6 py-3 text-center text-(--color-background)">{action.label}</L>
          </div>
          {note && <p className="type-utility mt-3 text-(--color-muted)">{note}</p>}
          {details.length > 0 && (
            <ul className="mt-10 border-t border-(--color-border)">
              {details.map((d, i) => (
                <li key={d.title} className="border-b border-(--color-border)">
                  <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="type-body flex w-full items-center justify-between py-4 text-left">
                    {d.title}<span aria-hidden className="text-(--color-muted)">{open === i ? '−' : '+'}</span>
                  </button>
                  {open === i && <p className="type-body pb-5 text-(--color-muted)">{d.text}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
