// OpusKit section — Editorial Story: headline, a narrow reading column and one large image with a margin caption.
// One pull quote breaks the column; on phones everything is one column and the quote runs full width.
import type { AssetKey } from '@/config/assets'
import { MediaAsset } from '@/components/MediaAsset'
import { ClipReveal, LineReveal, Reveal, RevealItem } from '@/components/Reveal'

export function EditorialStorySection({ title, titleMobile, image, alt, caption, paragraphs, quote, quoteAfter = 1, level = 'h2' }: { title: string[]; titleMobile?: string[]; image: AssetKey; alt?: string; caption?: string; paragraphs: string[]; quote?: string; quoteAfter?: number; level?: 'h1' | 'h2' }) {
  const before = paragraphs.slice(0, quoteAfter)
  const after = paragraphs.slice(quoteAfter)
  const para = (p: string, i: number) => <RevealItem as="p" key={i} className="max-w-[60ch]">{p}</RevealItem>
  return (
    <section className="px-6 pt-32 pb-32 md:px-10 md:pt-40 md:pb-40">
      <article className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-12 md:gap-6">
        <LineReveal immediate={level === "h1"} as={level} lines={title} mobile={titleMobile} className="type-display md:col-span-11" />
        <div className="type-body md:col-span-5 md:col-start-1 md:row-start-2 md:mt-12">
          <Reveal stagger className="space-y-6 [&>p:first-child]:[font-size:1.15em]">{before.map(para)}</Reveal>
          {quote && (
            <Reveal as="figure" className="my-12 border-y-2 border-(--color-text) py-8 md:-mr-24">
              <blockquote className="type-heading [font-size:clamp(1.5rem,2.6vw,2.25rem)]">{quote}</blockquote>
            </Reveal>
          )}
          <Reveal stagger className="space-y-6">{after.map((p, i) => para(p, i + before.length))}</Reveal>
        </div>
        <figure className="md:col-span-5 md:col-start-8 md:row-start-2 md:mt-12">
          <ClipReveal className="border-2 border-(--color-text)">
            <MediaAsset id={image} alt={alt} className="aspect-[4/5] w-full rounded-(--radius-media) object-cover" />
          </ClipReveal>
          {caption && <figcaption className="type-utility mt-4 max-w-[40ch] text-(--color-muted)">{caption}</figcaption>}
        </figure>
      </article>
    </section>
  )
}
