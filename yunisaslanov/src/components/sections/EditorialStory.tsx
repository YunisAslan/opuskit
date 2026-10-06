import Image from 'next/image'
import type { ReactNode } from 'react'
// OpusKit section — Editorial Story: headline, a narrow reading column and one large image with a margin caption.
// `media`: side (the image beside the column), full (a full-width image opens the story, the column under it) or over
// (the headline set over the image like a magazine cover, the column after).
type P = { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; media?: 'side' | 'full' | 'over'; title: string; image: string; alt: string; caption?: string; paragraphs: string[]; quote?: string; level?: 'h1' | 'h2'; cover?: ReactNode }
export function EditorialStorySection({ tone, media = 'side', title, image, alt, caption, paragraphs, quote, level: H = 'h2', cover }: P) {
  const body = <div className="type-body space-y-5 [&>p:first-child]:[font-size:1.15em]">{paragraphs.map((p, i) => <p key={i} className="max-w-[60ch]">{p}</p>)}</div>
  const cap = caption && <figcaption className="type-utility mt-3 text-(--color-muted)">{caption}</figcaption>
  // over — the cover: a pinned print that grows to fill the screen as the visitor scrolls (globals.css → .cover-grow),
  // the title over it in difference blend so it reads on the dark ground and on the photo; then the calm column.
  if (media === 'over') return (
    <section data-tone={tone === 'ground' ? undefined : tone}>
      <figure className="cover-grow relative h-[150svh] md:h-[175svh]">
        <div className="sticky top-0 h-svh overflow-hidden">
          <div data-grow className="absolute inset-0">
            <Image src={image} alt={alt} fill preload sizes="100vw" className="object-cover" style={{ objectPosition: '50% var(--focus-y)' }} />
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 px-(--gutter) pb-[clamp(32px,6vw,96px)] text-(--color-text) mix-blend-difference">
            {cover ?? <H className="type-display mx-auto w-full max-w-(--container) text-balance [font-size:clamp(2.6rem,7vw,6.5rem)]">{title}</H>}
          </div>
        </div>
      </figure>
      <article className="mx-auto grid max-w-(--container) gap-10 px-(--gutter) py-(--section-y) md:grid-cols-24 md:gap-x-[1vw]">
        <div className="md:col-span-11 md:col-start-5">
          {body}
          {quote && <blockquote className="type-heading my-16 text-balance [font-size:clamp(1.6rem,3.2vw,2.6rem)] md:-ml-[calc(4/11*100%)] md:w-[calc(15/11*100%)]">“{quote}”</blockquote>}
        </div>
        {cap && <figure className="md:col-span-5 md:col-start-18 md:row-start-1 md:pt-2">{cap}</figure>}
      </article>
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
