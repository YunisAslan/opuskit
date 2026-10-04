// OpusKit section — Gallery: a mixed-size grid that keeps each photo's own shape; sparse captions.
export type GalleryPhoto = { src: string; alt: string; caption?: string }

export function GallerySection({ tone, title, photos }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title?: string; photos: GalleryPhoto[] }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        {title && <h2 className="type-heading mb-10">{title}</h2>}
        <ul className="columns-2 gap-4 md:columns-3 [&>li]:mb-4">
          {photos.map((p) => (
            <li key={p.src} className="break-inside-avoid">
              <figure>
                <img src={p.src} alt={p.alt} loading="lazy" className="w-full rounded-(--radius-media) object-cover" />
                {p.caption && <figcaption className="type-utility mt-2 text-(--color-muted)">{p.caption}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
