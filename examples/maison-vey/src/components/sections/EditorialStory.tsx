// OpusKit section — Editorial Story (media: side): headline, a narrow reading column and a large image with its caption
// in the margin rail. Fitted to Maison Vey: the opening picture of the place runs wide and drifts slightly; the column
// sits beside a 4:5 detail; the pull quote spans the page. Image clip reveal on the pictures, fade-rise on the words.
import type { AssetKey } from '@/config/assets'
import { MediaAsset } from '@/components/media/MediaAsset'
import { Drift, FadeRise, ImageReveal, Lines, RevealGroup } from '@/components/motion/Reveal'

type P = {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'
  title: { desktop: string[]; mobile: string[] }
  image: AssetKey; caption?: string
  detail: AssetKey
  paragraphs: string[]; quote: string; quoteBy: string
}

export function EditorialStorySection({ tone, title, image, caption, detail, paragraphs, quote, quoteBy }: P) {
  const [first, second, ...rest] = paragraphs
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <article className="mx-auto grid max-w-(--container) gap-x-(--grid-gap) md:grid-cols-12">
        <Lines as="h2" lines={title} className="type-display [font-size:clamp(2.75rem,6vw,5.5rem)] md:col-span-8" />

        <figure className="mt-(--within) md:col-span-10 md:mt-16">
          <ImageReveal><Drift><MediaAsset id={image} sizes="(min-width: 768px) 80vw, 100vw" /></Drift></ImageReveal>
        </figure>
        {caption && <p className="type-caption mt-3 text-(--color-muted) md:col-span-2 md:mt-16 md:self-end">{caption}</p>}

        <RevealGroup className="mt-16 md:col-span-5 md:col-start-2 md:mt-24">
          <FadeRise as="p" i={0} className="type-body max-w-[60ch] [font-size:1.125rem]">{first}</FadeRise>
          <FadeRise as="p" i={1} className="type-body mt-5 max-w-[60ch]">{second}</FadeRise>
        </RevealGroup>
        <figure className="mt-16 md:col-span-5 md:col-start-8 md:row-span-2 md:mt-24">
          <ImageReveal><MediaAsset id={detail} sizes="(min-width: 768px) 40vw, 100vw" /></ImageReveal>
        </figure>
        <RevealGroup className="mt-5 md:col-span-5 md:col-start-2">
          {rest.map((p, i) => <FadeRise as="p" key={i} i={i} className="type-body mt-5 max-w-[60ch] first:mt-0">{p}</FadeRise>)}
        </RevealGroup>

        <RevealGroup as="figure" className="mt-24 border-t border-(--color-border) pt-12 md:col-span-10 md:col-start-2 md:mt-32">
          <FadeRise as="blockquote" i={0} className="type-heading max-w-[28ch] text-balance [font-size:clamp(1.75rem,3.4vw,3rem)]">“{quote}”</FadeRise>
          <FadeRise as="figcaption" i={1} className="type-caption mt-6 text-(--color-muted)">{quoteBy}</FadeRise>
        </RevealGroup>
      </article>
    </section>
  )
}
