import type { ElementType } from 'react'
// OpusKit section — Collection: a full-height image with the season's title, then its key pieces.
export type Piece = { name: string; price: string; image: string; alt: string; href: string }

export function CollectionSection({ tone, link: L = 'a', season, title, text, image, alt, pieces }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; link?: ElementType; season: string; title: string; text: string; image: string; alt: string; pieces: Piece[] }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone}>
      <div className="relative min-h-[90svh] overflow-hidden">
        <img src={image} alt={alt} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-(--gutter) pb-10 pt-32 text-white">
          <p className="type-utility">{season}</p>
          <h2 className="type-display mt-2 [font-size:clamp(2.5rem,8vw,7rem)]">{title}</h2>
          <p className="type-body mt-4 max-w-[48ch] opacity-90">{text}</p>
        </div>
      </div>
      <ul className="mx-auto grid max-w-(--container) grid-cols-2 gap-4 px-(--gutter) py-[calc(var(--section-y)*0.5)] md:grid-cols-3">
        {pieces.map((p) => (
          <li key={p.href}><L href={p.href} className="group block">
            <img src={p.image} alt={p.alt} loading="lazy" className="aspect-(--ratio-card) w-full rounded-(--radius-media) object-cover" />
            <p className="mt-3 flex justify-between gap-3"><span className="type-body group-hover:underline group-hover:underline-offset-4">{p.name}</span><span className="type-body tabular-nums text-(--color-muted)">{p.price}</span></p>
          </L></li>
        ))}
      </ul>
    </section>
  )
}
