// OpusKit section — Gallery as full-bleed moments: every photo gets its own row, never grouped; one short caption each.
// Landscape frames run 3:2, portraits 4:5; on mobile every frame keeps a 4:5 crop around its focal point.
// Each frame opens like a curtain on entering the viewport (globals.css → [data-reveal="curtain"]).
export type GalleryPhoto = { src: string; alt: string; caption?: string; tall?: boolean; focus?: string }

// Widths and offsets on the 24-column grid, so the rhythm never repeats twice in a row
const FRAMES = [
  'md:w-full',
  'md:ml-[calc(12/24*100%)] md:w-[calc(11/24*100%)] md:px-0',
  'md:ml-[calc(2/24*100%)] md:w-[calc(19/24*100%)]',
  'md:w-full',
  'md:ml-[calc(3/24*100%)] md:w-[calc(9/24*100%)]',
  'md:ml-[calc(7/24*100%)] md:w-[calc(17/24*100%)]',
]
const GAPS = ['mt-0', 'mt-24 md:mt-40', 'mt-24 md:mt-32', 'mt-24 md:mt-60', 'mt-24 md:mt-32', 'mt-24 md:mt-40']

export function GallerySection({ tone, title, photos }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title?: string; photos: GalleryPhoto[] }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="py-(--section-y)">
      {title && <h2 className="type-heading mb-10 px-(--gutter)">{title}</h2>}
      <ul>
        {photos.map((p, i) => (
          <li key={p.src} className={`${GAPS[i % GAPS.length]} ${FRAMES[i % FRAMES.length]}`}>
            <figure data-reveal="curtain">
              <div className={`overflow-hidden rounded-(--radius-media) ${p.tall ? 'aspect-[4/5]' : 'aspect-[4/5] md:aspect-[3/2]'}`}>
                <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: p.focus }} />
              </div>
              {p.caption && <figcaption className="type-utility mt-3 px-(--gutter) text-(--color-muted)">{p.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
