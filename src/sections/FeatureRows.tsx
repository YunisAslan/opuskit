import type { ElementType } from 'react'
// OpusKit section — Feature rows: one capability or offer per row, picture beside words, sides alternating on desktop.
export function FeatureRowsSection({ link: L = 'a', title, rows }: { link?: ElementType; title?: string; rows: { name: string; text: string; image?: string; alt?: string; link?: { label: string; href: string } }[] }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        {title && <h2 className="type-heading mb-16 max-w-[24ch] md:mb-24">{title}</h2>}
        <ul className="space-y-20 md:space-y-32">
          {rows.map((r, i) => (
            <li key={r.name} className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
              {r.image && <img src={r.image} alt={r.alt ?? ''} loading="lazy" className={`aspect-[4/3] w-full rounded-(--radius-media) bg-(--color-surface) object-cover md:col-span-7 ${i % 2 ? 'md:order-2 md:col-start-6' : ''}`} />}
              <div className={!r.image ? 'md:col-span-8' : i % 2 ? 'md:order-1 md:col-span-4 md:col-start-1' : 'md:col-span-4 md:col-start-9'}>
                <h3 className="type-heading text-balance [font-size:clamp(1.5rem,2.6vw,2.4rem)]">{r.name}</h3>
                <p className="type-body mt-4 max-w-[46ch] text-(--color-muted)">{r.text}</p>
                {r.link && <L href={r.link.href} className="type-body mt-6 inline-block underline underline-offset-4">{r.link.label}</L>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
