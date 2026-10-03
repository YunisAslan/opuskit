import type { ElementType, ReactNode } from 'react'
// OpusKit section — Collection: a full-height image with the season's title, then its key pieces.
export type Piece = { name: string; price: string; image: string; alt: string; href: string }

export function CollectionSection({ link: L = 'a', as: H = 'h2', season, title, text, image, alt, pieces = [], children, id }: { link?: ElementType; as?: 'h1' | 'h2'; season: string; title: ReactNode; text: string; image: string; alt: string; pieces?: Piece[]; children?: ReactNode; id?: string }) {
  return (
    <section id={id}>
      <div data-curtain className="relative min-h-svh overflow-hidden">
        <img src={image} alt={alt} className="absolute inset-0 size-full object-cover object-[50%_22%]" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-(--color-background)/85 to-transparent px-4 pb-12 pt-40 text-(--color-text) md:px-10 md:pb-16">
          <p className="type-utility">{season}</p>
          <H className="type-display mt-2 [font-size:clamp(5rem,16vw,15rem)]">{title}</H>
          <p className="type-body mt-6 max-w-[48ch]">{text}</p>
        </div>
      </div>
      {children ?? <ul data-reveal className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-6 gap-y-10 px-4 py-24 md:grid-cols-3 md:px-10 md:py-32">
        {pieces.map((p) => (
          // an odd count on phones' two columns: the first piece goes full width, so no piece sits alone on the last row
          <li key={p.href} className={pieces.length % 2 ? 'first:col-span-2 md:first:col-span-1' : undefined}><L href={p.href} className="group block">
            <img src={p.image} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full rounded-(--radius-media) object-cover" />
            <p className="mt-3 flex justify-between gap-3"><span className="type-body group-hover:underline group-hover:underline-offset-4">{p.name}</span><span className="type-body tabular-nums text-(--color-muted)">{p.price}</span></p>
          </L></li>
        ))}
      </ul>}
    </section>
  )
}
