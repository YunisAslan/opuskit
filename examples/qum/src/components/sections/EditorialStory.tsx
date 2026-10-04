// OpusKit section — Editorial Story: headline, a narrow reading column and one large image with a margin caption.
// `media`: side (the image beside the column), full (a full-width image opens the story, the column under it) or over
// (the headline set over the image like a magazine cover, the column after).
type P = { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; media?: 'side' | 'full' | 'over'; title: string; image: string; alt: string; caption?: string; paragraphs: string[] }
export function EditorialStorySection({ tone, media = 'side', title, image, alt, caption, paragraphs }: P) {
  const body = <div className="type-body space-y-5 [&>p:first-child]:[font-size:1.15em]">{paragraphs.map((p, i) => <p key={i} className="max-w-[60ch]">{p}</p>)}</div>
  const cap = caption && <figcaption className="type-utility mt-3 text-(--color-muted)">{caption}</figcaption>
  if (media === 'over') return (
    <section data-tone={tone === 'ground' ? undefined : tone}>
      <figure data-tone="inverse" className="relative isolate flex min-h-[80svh] items-end px-(--gutter) pb-[calc(var(--section-y)*0.6)]">
        <img src={image} alt={alt} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
        <h2 className="type-display mx-auto w-full max-w-(--container) text-balance [font-size:clamp(2.6rem,7vw,6.5rem)]">{title}</h2>
      </figure>
      <article className="mx-auto max-w-(--container) px-(--gutter) py-(--section-y)"><div className="md:ml-[16.66%]">{body}{cap && <figure>{cap}</figure>}</div></article>
    </section>
  )
  if (media === 'full') return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <article className="mx-auto max-w-(--container)">
        <figure><img src={image} alt={alt} loading="lazy" className="aspect-[21/9] w-full rounded-(--radius-media) object-cover" />{cap}</figure>
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <h2 className="type-display text-balance [font-size:clamp(2.2rem,5vw,4.5rem)] md:col-span-5">{title}</h2>
          <div className="md:col-span-6 md:col-start-7">{body}</div>
        </div>
      </article>
    </section>
  )
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <article className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12">
        <h2 className="type-display text-balance [font-size:clamp(2.2rem,5vw,4.5rem)] md:col-span-10">{title}</h2>
        <div className="md:col-span-5 md:col-start-2">{body}</div>
        <figure className="md:col-span-5 md:col-start-8"><img src={image} alt={alt} loading="lazy" className="aspect-(--ratio-card) w-full rounded-(--radius-media) object-cover" />{cap}</figure>
      </article>
    </section>
  )
}
