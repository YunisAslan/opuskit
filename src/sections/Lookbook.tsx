import type { ElementType } from 'react'
// OpusKit section — Lookbook: magazine spreads, a large and a small photo per look, with what is worn.
export type Look = { number: string; image: string; alt: string; detail?: string; detailAlt?: string; pieces: string; href?: string }

export function LookbookSection({ tone, link: L = 'a', title, looks }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; link?: ElementType; title?: string; looks: Look[] }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container) space-y-24">
        {title && <h2 className="type-heading">{title}</h2>}
        {looks.map((l, i) => (
          <article key={l.number} className={`grid items-end gap-6 md:grid-cols-12 ${i % 2 ? 'md:[direction:rtl]' : ''}`}>
            <img src={l.image} alt={l.alt} loading="lazy" className="aspect-[3/4] w-full rounded-(--radius-media) object-cover md:col-span-7 [direction:ltr]" />
            <div className="md:col-span-4 [direction:ltr]">
              {l.detail && <img src={l.detail} alt={l.detailAlt ?? ''} loading="lazy" className="mb-6 aspect-square w-2/3 rounded-(--radius-media) object-cover" />}
              <p className="type-display [font-size:clamp(2rem,4vw,3.5rem)]">Look {l.number}</p>
              <p className="type-body mt-3 text-(--color-muted)">{l.pieces}</p>
              {l.href && <L href={l.href} className="type-body mt-4 inline-block underline underline-offset-4">Shop the look</L>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
