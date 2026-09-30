import type { ElementType } from 'react'
// OpusKit section — Product Grid: browse and choose. Even tiles, one ratio, second photo on hover, honest availability.
export type Product = { name: string; price: string; image: string; alt: string; hoverImage?: string; href: string; soldOut?: boolean }

export function ProductGridSection({ link: L = 'a', title, products }: { link?: ElementType; title: string; products: Product[] }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-heading">{title}</h2>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <li key={p.href}>
              <L href={p.href} className="group block">
                <div className="relative overflow-hidden rounded-(--radius-media) bg-(--color-surface)">
                  <img src={p.image} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                  {p.hoverImage && <img src={p.hoverImage} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />}
                  {p.soldOut && <span className="type-utility absolute left-3 top-3 rounded-(--radius-button) bg-(--color-background) px-2 py-1">Sold out</span>}
                </div>
                <p className="mt-3 flex justify-between gap-3"><span className="type-body group-hover:underline group-hover:underline-offset-4">{p.name}</span><span className="type-body tabular-nums text-(--color-muted)">{p.price}</span></p>
              </L>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
