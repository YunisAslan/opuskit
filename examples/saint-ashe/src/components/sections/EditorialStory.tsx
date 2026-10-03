// OpusKit section — Editorial Story: headline, a narrow reading column and one large image with a margin caption.
import type { ReactNode } from 'react'

export function EditorialStorySection({ title, image, alt, caption, paragraphs, quote, id }: { title: ReactNode; quote?: string; id?: string; image: string; alt: string; caption?: string; paragraphs: string[] }) {
  return (
    <section id={id} className="scroll-mt-24 px-4 py-32 md:px-10 md:py-40">
      <article className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12">
        <h2 className="type-display [font-size:clamp(3rem,8vw,7.5rem)] md:col-span-11">{title}</h2>
        <div data-reveal className="type-body space-y-5 md:col-span-5 md:col-start-2 [&>p:first-child]:[font-size:1.15em]">
          {paragraphs.map((p, i) => <p key={i} className="max-w-[60ch]">{p}</p>)}
          {quote && <blockquote className="type-heading py-6 [font-size:clamp(1.6rem,2.6vw,2.2rem)]">{quote}</blockquote>}
        </div>
        <figure className="md:col-span-5 md:col-start-8">
          <div data-curtain className="overflow-hidden"><img src={image} alt={alt} loading="lazy" className="aspect-[4/5] w-full rounded-(--radius-media) object-cover" /></div>
          {caption && <figcaption className="type-utility mt-3 text-(--color-muted)">{caption}</figcaption>}
        </figure>
      </article>
    </section>
  )
}
