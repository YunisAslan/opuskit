import type { ElementType } from 'react'
// OpusKit section — Product Highlight: one product (or feature) in depth — large media and 3–4 real details. `media`:
// side (media beside the details), full (the product across the page, name and details in a row beneath) or over (the
// product on its own colour field with the name set over it).
type P = { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; media?: 'side' | 'full' | 'over'; link?: ElementType; name: string; text: string; image: string; alt: string; details: { label: string; value: string }[]; action: { label: string; href: string } }
export function ProductHighlightSection({ tone, media = 'side', link: L = 'a', name, text, image, alt, details, action }: P) {
  const list = <dl className="divide-y divide-(--color-border) border-y border-(--color-border)">{details.map((d) => <div key={d.label} className="flex justify-between gap-4 py-3"><dt className="type-utility text-(--color-muted)">{d.label}</dt><dd className="type-body text-right">{d.value}</dd></div>)}</dl>
  const buy = <L href={action.href} className="type-body inline-block rounded-(--radius-button) bg-(--color-primary) px-6 py-3 text-(--color-on-primary,var(--color-background))">{action.label}</L>
  if (media === 'over') return (
    <section data-tone={tone === 'ground' ? 'surface' : tone ?? 'surface'} className="overflow-hidden px-(--gutter) py-(--section-y)">
      <div className="relative mx-auto max-w-(--container) text-center">
        <h2 className="type-display relative z-10 leading-[0.85] [font-size:clamp(3.5rem,13vw,12rem)]">{name}</h2>
        <img src={image} alt={alt} loading="lazy" className="relative z-20 mx-auto -mt-[6vw] aspect-square w-full max-w-xl object-contain" />
        <p className="type-body mx-auto mt-8 max-w-[52ch] text-(--color-muted)">{text}</p>
        <div className="mx-auto mt-8 max-w-xl text-left">{list}</div>
        <div className="mt-8">{buy}</div>
      </div>
    </section>
  )
  if (media === 'full') return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <img src={image} alt={alt} loading="lazy" className="aspect-(--ratio-media) w-full rounded-(--radius-media) bg-(--color-surface) object-cover" />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5"><h2 className="type-display [font-size:clamp(2.2rem,4.5vw,4rem)]">{name}</h2><p className="type-body mt-4 text-(--color-muted)">{text}</p><div className="mt-8">{buy}</div></div>
          <div className="md:col-span-6 md:col-start-7">{list}</div>
        </div>
      </div>
    </section>
  )
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) items-center gap-12 md:grid-cols-12">
        <img src={image} alt={alt} loading="lazy" className="aspect-square w-full rounded-(--radius-media) bg-(--color-surface) object-cover md:col-span-7" />
        <div className="md:col-span-4 md:col-start-9">
          <h2 className="type-display [font-size:clamp(2.2rem,4.5vw,4rem)]">{name}</h2>
          <p className="type-body mt-4 text-(--color-muted)">{text}</p>
          <div className="mt-8">{list}</div>
          <div className="mt-8">{buy}</div>
        </div>
      </div>
    </section>
  )
}
