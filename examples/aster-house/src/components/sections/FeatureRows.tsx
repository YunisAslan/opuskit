import type { ElementType, ReactNode } from 'react'
// OpusKit section — Feature rows: one capability or offer per row, picture beside words, sides alternating on desktop.
export function FeatureRowsSection({ link: L = 'a', title, intro, rows }: { link?: ElementType; title?: ReactNode; intro?: string; rows: { name: string; kicker?: string; text: string; image?: string; alt?: string; link?: { label: string; href: string } }[] }) {
  return (
    <section className="px-5 py-30 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        {title && <h2 className="type-display mb-6 flex items-center gap-5 [font-size:clamp(2.4rem,5vw,4.5rem)]">{title}</h2>}
        {intro && <p data-reveal="rise" className="type-body mb-16 max-w-[52ch] text-(--color-muted) md:mb-24">{intro}</p>}
        <ul className="space-y-20 md:space-y-32">
          {rows.map((r, i) => (
            <li key={r.name} className="grid items-end gap-8 md:grid-cols-12 md:gap-6">
              {r.image && (
                <div className={`overflow-hidden rounded-(--radius-media) bg-(--color-surface) md:col-span-5 ${i % 2 ? 'md:order-2 md:col-start-8' : 'md:col-start-1'}`}>
                  <img data-reveal="clip" src={r.image} alt={r.alt ?? ''} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                </div>
              )}
              <div data-reveal="rise" className={!r.image ? 'md:col-span-8' : i % 2 ? 'md:order-1 md:col-span-4 md:col-start-2' : 'md:col-span-4 md:col-start-7'}>
                {r.kicker && <p className="type-utility mb-3 text-(--color-muted)">{r.kicker}</p>}
                <h3 className="type-heading text-balance [font-size:clamp(1.6rem,2.8vw,2.6rem)]">{r.name}</h3>
                <p className="type-body mt-4 max-w-[46ch] text-(--color-muted)">{r.text}</p>
                {r.link && <L href={r.link.href} className="type-body mt-6 inline-block">{r.link.label}</L>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
