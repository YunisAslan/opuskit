import type { ElementType } from 'react'
// OpusKit section — Collection: a full-height image with the season's title, then its key pieces.
export type Piece = { name: string; price: string; image: string; alt: string; href: string }

export function CollectionSection({ link: L = 'a', season, title, text, image, alt, pieces }: { link?: ElementType; season: string; title: string; text: string; image: string; alt: string; pieces: Piece[] }) {
  return (
    <section>
      <div className="relative min-h-[90svh] overflow-hidden">
        <img src={image} alt={alt} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-5 pb-10 pt-32 text-white md:px-10">
          <p className="type-utility">{season}</p>
          <h2 className="type-display mt-2 [font-size:clamp(2.5rem,8vw,7rem)]">{title}</h2>
          <p className="type-body mt-4 max-w-[48ch] opacity-90">{text}</p>
        </div>
      </div>
      <ul className="mx-auto grid max-w-[1440px] grid-cols-2 gap-4 px-5 py-16 md:grid-cols-3 md:px-10">
        {pieces.map((p) => (
          <li key={p.href}><L href={p.href} className="group block">
            <img src={p.image} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full rounded-(--radius-media) object-cover" />
            <p className="mt-3 flex justify-between gap-3"><span className="type-body group-hover:underline group-hover:underline-offset-4">{p.name}</span><span className="type-body tabular-nums text-(--color-muted)">{p.price}</span></p>
          </L></li>
        ))}
      </ul>
    </section>
  )
}
