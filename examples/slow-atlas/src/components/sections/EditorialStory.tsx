import type { ElementType, ReactNode } from 'react'
import { CutReveal } from '@/components/pieces/CutReveal'
import { Curtain, Reveal } from '@/components/site/motion'
// OpusKit section — Editorial Story: headline, a narrow reading column and one large image with a margin caption.
// Here it opens like a magazine cover (the big idea): the headline at display scale, the photo full width and revealed
// like a curtain, then the calm column — caption and byline in the margin rail, one pull quote set full width.
export function EditorialStorySection({ link: L = 'a', as = 'h2', title, image, caption, meta = [], paragraphs, pullQuote, more }: {
  link?: ElementType; as?: 'h1' | 'h2'; title: string; image: ReactNode; caption?: string
  /** Label/value pairs for the margin rail — place, date, author. */ meta?: { label: string; value: string }[]
  paragraphs: string[]; pullQuote?: string; more?: { href: string; label: string }
}) {
  const split = pullQuote ? Math.min(2, paragraphs.length) : paragraphs.length
  const para = (p: string, i: number) => <p key={i} className="max-w-[62ch]">{p}</p>
  const rest = paragraphs.length > split
  const moreLink = more && <p><L href={more.href} className="type-utility inline-flex min-h-11 items-center underline decoration-(--color-border) decoration-2 underline-offset-[6px] [font-size:1rem] hover:decoration-current">{more.label}</L></p>
  return (
    <section className="py-24 md:py-32">
      <article>
        <div className="px-6">
          <CutReveal as={as} className="type-display max-w-[16ch] text-balance [font-size:clamp(3rem,9vw,8.5rem)]">{title}</CutReveal>
        </div>
        <figure className="mt-12 md:mt-16">
          <Curtain className="aspect-[4/5] w-full sm:aspect-video">{image}</Curtain>
        </figure>
        <div className="mt-10 grid gap-10 px-6 md:mt-16 md:grid-cols-12">
          <aside className="type-utility space-y-4 text-(--color-muted) md:col-span-3">
            {caption && <p className="max-w-[34ch]">{caption}</p>}
            {meta.length > 0 && (
              <dl className="grid grid-cols-2 gap-4 border-t border-(--color-border) pt-4 md:grid-cols-1">
                {meta.map((m) => <div key={m.label}><dt>{m.label}</dt><dd className="text-(--color-text)">{m.value}</dd></div>)}
              </dl>
            )}
          </aside>
          <Reveal className="type-body space-y-6 md:col-span-6 md:col-start-5 [&>p:first-child]:[font-size:1.25em] [&>p:first-child]:leading-[1.5]">
            {paragraphs.slice(0, split).map(para)}
            {!rest && moreLink}
          </Reveal>
        </div>
        {pullQuote && (
          <Reveal className="mt-16 border-y border-(--color-border) px-6 py-12 md:mt-24 md:py-16">
            <blockquote className="type-display max-w-[22ch] text-balance [font-size:clamp(2rem,5vw,4.5rem)]">{pullQuote}</blockquote>
          </Reveal>
        )}
        {rest && (
          <div className="mt-16 grid px-6 md:mt-24 md:grid-cols-12">
            <Reveal className="type-body space-y-6 md:col-span-6 md:col-start-5">
              {paragraphs.slice(split).map(para)}
              {moreLink}
            </Reveal>
          </div>
        )}
      </article>
    </section>
  )
}
