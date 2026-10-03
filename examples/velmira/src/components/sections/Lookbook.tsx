import type { ElementType } from 'react'
import { Chapter } from '@/components/site/Motif'

// OpusKit section — Lookbook: magazine spreads, a large and a small photo per look, with what it holds. Every third
// look breaks the pattern: one full-height photo and a single line. Each spread opens as a pair (clip reveal).
// Phone: one photo per screen, in the same order.
export type Look = { number: string; image: string; alt: string; detail?: string; detailAlt?: string; pieces: string; line?: string; href?: string; linkLabel?: string; id?: string }

const img = 'size-full object-cover'

export function LookbookSection({ link: L = 'a', title, looks }: { link?: ElementType; title?: string; looks: Look[] }) {
  return (
    <section className="py-32 md:py-40">
      {title && <div className="shell"><Chapter><h2 className="type-heading">{title}</h2></Chapter></div>}
      <div className="mt-16 space-y-24 md:mt-24 md:space-y-40">
        {looks.map((l, i) => {
          const words = (
            <>
              <p data-rise className="type-display [font-size:clamp(2.25rem,4.4vw,4rem)]">{l.number}</p>
              <p data-rise style={{ '--i': 1 } as React.CSSProperties} className="type-body mt-4 max-w-[38ch] text-(--color-muted)">{l.pieces}</p>
              {l.href && <L data-rise style={{ '--i': 2 }} href={l.href} className="type-body mt-6 inline-flex min-h-11 items-center underline decoration-current/40 underline-offset-[6px] transition-[text-decoration-color] duration-150 hover:decoration-current">{l.linkLabel ?? 'Book this room'}</L>}
            </>
          )
          if (i % 3 === 2) return (
            <article key={l.number} id={l.id} data-reveal className="relative flex min-h-svh items-end overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div data-clip className="absolute inset-0"><img src={l.image} alt={l.alt} loading="lazy" decoding="async" className={img} /></div>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-(--color-background) from-25% via-(--color-background)/75 to-transparent" />
              <div className="shell relative pb-16 md:pb-24">
                <div className="md:max-w-[50%]">{words}</div>
                {l.line && <p data-rise style={{ '--i': 3 } as React.CSSProperties} className="type-heading mt-10 max-w-[30ch] text-balance">{l.line}</p>}
              </div>
            </article>
          )
          const flip = i % 2 === 1
          return (
            <article key={l.number} id={l.id} data-reveal className="shell grid gap-6 md:min-h-svh md:grid-cols-12 md:items-center">
              <div data-clip className={`h-[82svh] overflow-hidden rounded-(--radius-media) md:col-span-7 md:h-auto md:aspect-[4/5] ${flip ? 'md:order-2 md:col-start-6' : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.image} alt={l.alt} loading="lazy" decoding="async" className={img} />
              </div>
              <div className={`md:col-span-4 ${flip ? 'md:order-1 md:col-start-1' : 'md:col-start-9'}`}>
                {l.detail && (
                  <div data-clip className="mb-8 h-[82svh] overflow-hidden rounded-(--radius-media) md:mb-10 md:h-auto md:w-4/5 md:aspect-[4/5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.detail} alt={l.detailAlt ?? ''} loading="lazy" decoding="async" className={img} />
                  </div>
                )}
                {words}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
