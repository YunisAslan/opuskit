// OpusKit section — Editorial Story: headline, a narrow reading column and one large image with a margin caption.
export function EditorialStorySection({ title, image, alt, caption, paragraphs }: { title: string; image: string; alt: string; caption?: string; paragraphs: string[] }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <article className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12">
        <h2 className="type-display text-balance [font-size:clamp(2.2rem,5vw,4.5rem)] md:col-span-10">{title}</h2>
        <div className="type-body space-y-5 md:col-span-5 md:col-start-2 [&>p:first-child]:[font-size:1.15em]">
          {paragraphs.map((p, i) => <p key={i} className="max-w-[60ch]">{p}</p>)}
        </div>
        <figure className="md:col-span-5 md:col-start-8">
          <img src={image} alt={alt} loading="lazy" className="aspect-[4/5] w-full rounded-(--radius-media) border-2 border-(--color-border) object-cover" />
          {caption && <figcaption className="type-utility mt-3 text-(--color-muted)">{caption}</figcaption>}
        </figure>
      </article>
    </section>
  )
}
