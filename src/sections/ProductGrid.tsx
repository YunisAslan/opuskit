import type { ElementType } from 'react'
// OpusKit section — Product Grid: browse and choose; second photo on hover, honest availability. Three designs:
//   grid      — even tiles, one ratio.
//   editorial — the first product large across two columns and two rows, the rest even around it.
//   shelf     — a ruled list: a small photo, the name set large, the price at the end of the line.
export type Product = { name: string; price: string; image: string; alt: string; hoverImage?: string; href: string; soldOut?: boolean }

export function ProductGridSection({ tone, variant = 'grid', link: L = 'a', title, products }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'grid' | 'editorial' | 'shelf'; link?: ElementType; title: string; products: Product[] }) {
  const t = tone === 'ground' ? undefined : tone
  const sold = (p: Product) => p.soldOut && <span className="type-utility absolute left-3 top-3 rounded-(--radius-button) bg-(--color-background) px-2 py-1">Sold out</span>
  if (variant === 'shelf') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        <ul className="mt-10 border-t border-(--color-text)">
          {products.map((p) => (
            <li key={p.href} className="border-b border-(--color-border)"><L href={p.href} className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-5 py-4 md:grid-cols-[6rem_1fr_auto] md:gap-8">
              <span className="relative block overflow-hidden rounded-(--radius-media) bg-(--color-surface)"><img src={p.image} alt={p.alt} loading="lazy" className="aspect-square w-full object-cover" />{p.hoverImage && <img src={p.hoverImage} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />}</span>
              <span className="type-display text-balance [font-size:clamp(1.3rem,3vw,2.6rem)] leading-[1.05] group-hover:underline group-hover:underline-offset-4">{p.name}{p.soldOut && <span className="type-utility ml-3 align-middle text-(--color-muted)">Sold out</span>}</span>
              <span className="type-body tabular-nums">{p.price}</span>
            </L></li>
          ))}
        </ul>
      </div>
    </section>
  )
  return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        <ul className={`mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 ${variant === 'editorial' ? 'md:grid-flow-dense' : 'xl:grid-cols-4'}`}>
          {products.map((p, i) => { const lead = variant === 'editorial' && i === 0; return (
            <li key={p.href} className={lead ? 'col-span-2 md:row-span-2' : undefined}>
              <L href={p.href} className={lead ? 'group flex h-full flex-col' : 'group block'}>
                <div className={`relative overflow-hidden rounded-(--radius-media) bg-(--color-surface) ${lead ? 'md:flex-1' : ''}`}>
                  {/* the lead fills both rows: its picture takes the height the even tiles beside it give */}
                  <img src={p.image} alt={p.alt} loading="lazy" className={`w-full object-cover ${lead ? 'aspect-square md:absolute md:inset-0 md:aspect-auto md:h-full' : 'aspect-(--ratio-card)'}`} />
                  {p.hoverImage && <img src={p.hoverImage} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />}
                  {sold(p)}
                </div>
                <p className="mt-3 flex justify-between gap-3"><span className="type-body group-hover:underline group-hover:underline-offset-4">{p.name}</span><span className="type-body tabular-nums text-(--color-muted)">{p.price}</span></p>
              </L>
            </li>
          ) })}
        </ul>
      </div>
    </section>
  )
}
