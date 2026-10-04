// OpusKit section — Gallery: a mixed-size grid that keeps each photo's own shape; sparse captions.
export type GalleryPhoto = { src: string; alt: string; caption?: string }

export function GallerySection({ title, photos }: { title?: string; photos: GalleryPhoto[] }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
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
