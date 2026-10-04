import type { ReactNode } from 'react'
// OpusKit section — Gallery as a photo story: photo / text pairs that alternate sides on the 12-column grid, widths
// varying 7/5, then 5/7, then one full-bleed, so the rhythm never repeats twice in a row. Phones: photo, then its text.
export type GalleryPhoto = { src: string; alt: string; caption?: string; text?: ReactNode }

const layouts = [
  { img: 'md:col-span-7', txt: 'md:col-span-4 md:col-start-9', ratio: 'aspect-[3/2]' },
  { img: 'md:col-span-5 md:col-start-8 md:order-2', txt: 'md:col-span-4 md:col-start-2 md:order-1', ratio: 'aspect-[4/5]' },
  { img: 'md:col-span-12', txt: 'md:col-span-6', ratio: 'aspect-[4/5] md:aspect-[21/9]' },
]

export function GallerySection({ title, photos }: { title?: ReactNode; photos: GalleryPhoto[] }) {
  return (
    <section className="py-30 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {title && <h2 className="type-display mb-16 flex items-center gap-5 [font-size:clamp(2.4rem,5vw,4.5rem)] md:mb-24">{title}</h2>}
        <ul className="space-y-20 md:space-y-32">
          {photos.map((p, i) => {
            const l = layouts[i % 3]
            return (
              <li key={p.src + i} className="grid items-end gap-6 md:grid-cols-12">
                <figure className={`overflow-hidden rounded-(--radius-media) ${l.img}`}>
                  <img data-reveal="clip" src={p.src} alt={p.alt} loading="lazy" className={`w-full object-cover ${l.ratio}`} />
                </figure>
                <div data-reveal="rise" className={l.txt}>
                  {p.caption && <p className="type-utility text-(--color-muted)">{p.caption}</p>}
                  {p.text && <div className="type-body mt-3 max-w-[44ch]">{p.text}</div>}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
