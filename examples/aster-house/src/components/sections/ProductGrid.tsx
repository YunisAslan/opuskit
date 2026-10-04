import type { ElementType, ReactNode } from 'react'
// OpusKit section — Product Grid: browse and choose. Even tiles, one ratio, second photo on hover, honest availability.
// The hovered tile stays sharp while the others dim slightly (focus cards).
export type Product = { name: string; price: string; image: string; alt: string; hoverImage?: string; href: string; status?: ReactNode; details?: string[] }

export function ProductGridSection({ link: L = 'a', title, level: H = 'h2', intro, filters, more, products }: { link?: ElementType; title: ReactNode; level?: 'h1' | 'h2'; intro?: string; filters?: ReactNode; more?: ReactNode; products: Product[] }) {
  return (
    <section className="px-5 py-30 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <H className={`type-display flex items-center gap-5 md:col-span-7 ${H === "h1" ? "[font-size:clamp(3.25rem,8vw,7.5rem)]" : "[font-size:clamp(2.4rem,5vw,4.5rem)]"}`}>{title}</H>
          {intro && <p className="type-body text-(--color-muted) md:col-span-4 md:col-start-9">{intro}</p>}
        </div>
        {filters && <div className="mt-10">{filters}</div>}
        <ul data-reveal="rise" className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4 [&:has(a:hover)>li:not(:hover)]:opacity-60 [&>li]:transition-opacity [&>li]:duration-300">
          {products.map((p) => (
            <li key={p.href}>
              <L href={p.href} className="group block focus-visible:no-underline">
                <div className="relative overflow-hidden rounded-(--radius-media) bg-(--color-surface)">
                  <img src={p.image} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  {p.hoverImage && <img src={p.hoverImage} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />}
                  {p.status && <span className="absolute left-3 top-3">{p.status}</span>}
                </div>
                <p className="mt-4 flex items-baseline justify-between gap-3 border-t border-(--color-border) pt-3"><span className="type-heading [font-size:1.3rem] group-hover:underline group-hover:underline-offset-4 group-focus-visible:underline">{p.name}</span><span className="type-utility tabular-nums text-(--color-muted)">{p.price}</span></p>
                {p.details && <ul className="type-utility mt-2 space-y-0.5 text-(--color-muted)">{p.details.map((d) => <li key={d}>{d}</li>)}</ul>}
              </L>
            </li>
          ))}
        </ul>
        {more && <div className="mt-16">{more}</div>}
      </div>
    </section>
  )
}
