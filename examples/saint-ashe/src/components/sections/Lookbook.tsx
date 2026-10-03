import type { ElementType } from 'react'
// OpusKit section — Lookbook: magazine spreads, a large and a small photo per look, with what is worn.
// Every photo opens like a curtain (data-curtain, see globals.css). A look marked `full` breaks the pattern:
// one full-height photo and a single line of text.
export type Look = { number: string; image: string; alt: string; detail?: string; detailAlt?: string; pieces: string; href?: string; full?: boolean; line?: string }

const Curtain = ({ src, alt, className, focus = '' }: { src: string; alt: string; className: string; focus?: string }) => (
  <div data-curtain className={`overflow-hidden rounded-(--radius-media) ${className}`}>
    <img src={src} alt={alt} loading="lazy" className={`size-full object-cover ${focus}`} />
  </div>
)

export function LookbookSection({ link: L = 'a', title, looks, id }: { link?: ElementType; title?: string; looks: Look[]; id?: string }) {
  return (
    <section id={id} className="scroll-mt-24 py-32 md:py-40">
      {title && <h2 className="type-heading mx-auto mb-16 max-w-[1440px] px-4 md:px-10">{title}</h2>}
      <div className="space-y-32 md:space-y-40">
        {looks.map((l, i) => l.full ? (
          <article key={l.number} className="relative">
            <Curtain src={l.image} alt={l.alt} className="h-svh w-full" focus="object-[50%_25%]" />
            <div className="mx-auto mt-8 grid max-w-[1440px] gap-4 px-4 md:grid-cols-12 md:px-10">
              <p className="type-display [font-size:clamp(2.5rem,5vw,4.5rem)] md:col-span-4">Look {l.number}</p>
              <div className="md:col-span-6 md:col-start-6">
                {l.line && <p className="type-body [font-size:1.15rem]">{l.line}</p>}
                <p className="type-body mt-2 text-(--color-muted)">{l.pieces}</p>
                {l.href && <L href={l.href} className="type-body mt-4 inline-flex min-h-11 items-center underline underline-offset-4">Shop the look</L>}
              </div>
            </div>
          </article>
        ) : (
          <article key={l.number} className={`mx-auto grid max-w-[1440px] items-end gap-8 px-4 md:grid-cols-12 md:gap-6 md:px-10 ${i % 2 ? 'md:[direction:rtl]' : ''}`}>
            <Curtain src={l.image} alt={l.alt} className="aspect-[4/5] w-full md:col-span-7 md:aspect-[3/4] [direction:ltr]" />
            <div className="md:col-span-4 [direction:ltr]">
              {l.detail && <Curtain src={l.detail} alt={l.detailAlt ?? ''} className="mb-8 aspect-[4/5] w-full md:w-2/3" />}
              <p className="type-display [font-size:clamp(2.5rem,5vw,4.5rem)]">Look {l.number}</p>
              <p className="type-body mt-3 text-(--color-muted)">{l.pieces}</p>
              {l.href && <L href={l.href} className="type-body mt-4 inline-flex min-h-11 items-center underline underline-offset-4">Shop the look</L>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
