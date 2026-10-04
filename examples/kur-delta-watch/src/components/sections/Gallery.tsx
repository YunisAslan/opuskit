// OpusKit section — Gallery as a photo story: photo / text pairs that alternate sides on the 12-column grid
// (7/5, then 5/7, then one full-bleed photo), so the rhythm never repeats twice in a row. Each photo opens like a
// curtain ([data-curtain]: a thin line opens to the full frame while the photo settles from 1.15); its text rises
// with it. Phones: photo then text, every photo full width, same order.
export type GalleryPhoto = { src: string; alt: string; caption?: string; text?: string }

export function GallerySection({ id, title, photos }: { id?: string; title?: string; photos: GalleryPhoto[] }) {
  return (
    <section id={id} className="py-24 md:py-32">
      {title && <h2 className="type-heading mb-12 px-5 md:mb-16 md:px-10">{title}</h2>}
      <ul className="space-y-16 md:space-y-28">
        {photos.map((p, i) => {
          const beat = i % 3 // 0: photo 7 / text 5 · 1: text 5 / photo 7 · 2: full-bleed
          const words = (p.caption || p.text) && (
            <div data-reveal className={beat === 2 ? 'mt-5 px-5 md:mt-6 md:max-w-[48ch] md:px-10' : `mt-5 md:mt-0 md:col-span-4 md:self-end ${beat === 0 ? 'md:col-start-9' : 'md:col-start-1 md:row-start-1'}`}>
              {p.caption && <p className="type-heading [font-size:clamp(1.2rem,1.8vw,1.6rem)]">{p.caption}</p>}
              {p.text && <p className="type-body mt-2 max-w-[44ch] text-(--color-muted)">{p.text}</p>}
            </div>
          )
          if (beat === 2) return (
            <li key={p.src}>
              <figure>
                <div data-curtain className="overflow-hidden border-y-2 border-(--color-border)">
                  <img src={p.src} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full object-cover md:aspect-[21/9]" />
                </div>
                {words && <figcaption>{words}</figcaption>}
              </figure>
            </li>
          )
          return (
            <li key={p.src} className="px-5 md:px-10">
              <figure className="md:grid md:grid-cols-12 md:gap-4">
                <div data-curtain className={`overflow-hidden rounded-(--radius-media) border-2 border-(--color-border) md:col-span-7 ${beat === 1 ? 'md:col-start-6' : ''}`}>
                  <img src={p.src} alt={p.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                </div>
                {words && <figcaption className="contents">{words}</figcaption>}
              </figure>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
