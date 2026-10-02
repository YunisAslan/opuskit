// OpusKit section — Editorial Story: headline, a narrow reading column and one large image with a margin caption,
// plus one pull quote. The image opens like a curtain and drifts a little with scroll.
import { ClipImage } from '@/components/motion'
import { TextEffect } from '@/components/pieces/TextEffect'

export function EditorialStorySection({ eyebrow, title, image, alt, width, height, caption, paragraphs, quote }: {
  eyebrow?: string; title: string; image: string; alt: string; width?: number; height?: number; caption?: string; paragraphs: string[]; quote?: string
}) {
  return (
    <section className="section-y px-5 md:px-6">
      <article className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-12">
        <header className="md:col-span-10">
          {eyebrow && <p className="type-body max-w-[40ch]">{eyebrow}</p>}
          <TextEffect className="type-display mt-3 text-balance [font-size:clamp(2.2rem,5vw,4.5rem)]">{title}</TextEffect>
        </header>
        <div className="type-body space-y-5 md:col-span-5 md:col-start-2 [&>p:first-child]:[font-size:1.15em]">
          {paragraphs.map((p, i) => <p key={i} className="max-w-[60ch]">{p}</p>)}
        </div>
        <figure className="md:col-span-5 md:col-start-8">
          <ClipImage src={image} alt={alt} width={width} height={height} drift className="aspect-[4/5] w-full" />
          {caption && <figcaption className="type-utility mt-3 text-(--color-muted)">{caption}</figcaption>}
        </figure>
        {quote && <blockquote className="type-heading text-balance [font-size:clamp(1.75rem,3.6vw,3rem)] md:col-span-8 md:col-start-3"><p>“{quote}”</p></blockquote>}
      </article>
    </section>
  )
}
