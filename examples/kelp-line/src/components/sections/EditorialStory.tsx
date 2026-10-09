// OpusKit section — Editorial Story, fitted to Kelp Line: a headline, a narrow reading column with one pull quote, and
// one large picture (its own, by asset key) with its caption in the margin rail. The picture opens with the image clip reveal; the words
// settle in with the soft fade.
//   side — the picture beside the column (Home, Stories). `openLarge` makes it a button into the Lightbox (Home).
//   full — "The waterline" (Our mission): a hairline draws across the page, then the wide picture opens from it, sky up
//          and sea down; the column follows under it. Phones: a 4:5 crop, the same opening. Reduced motion: a fade.
import { MediaAsset } from '@/components/media/MediaAsset'
import { Lines } from '@/components/motion/Lines'
import { OpenLarge } from '@/components/pieces/OpenLarge'
import { asset, type AssetKey } from '@/config/assets'

type P = {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; media?: 'side' | 'full'
  title: string[]; mobileTitle?: string[]; image: AssetKey; alt: string; caption?: string; paragraphs: string[]
  quote?: string; quoteBy?: string; openLarge?: boolean
}

export function PullQuote({ quote, by }: { quote: string; by?: string }) {
  return (
    <figure data-fade className="my-10 border-l border-(--color-border) pl-6 md:my-12 md:pl-8">
      <blockquote className="type-heading max-w-[24ch] text-balance">{quote}</blockquote>
      {by && (
        <figcaption className="type-utility mt-5 flex items-center gap-3 text-(--color-muted)">
          <span aria-hidden className="h-px w-6 bg-(--color-accent)" />{by}
        </figcaption>
      )}
    </figure>
  )
}

export function EditorialStorySection({ tone, media = 'side', title, mobileTitle, image, alt, caption, paragraphs, quote, quoteBy, openLarge }: P) {
  const t = tone === 'ground' ? undefined : tone
  const [first, ...rest] = paragraphs
  const body = (
    <div className="type-body">
      {first && <p data-fade className="type-lead max-w-[46ch]">{first}</p>}
      {rest.map((p, i) => (
        <div key={i}>
          {i === rest.length - 1 && quote && <PullQuote quote={quote} by={quoteBy} />}
          <p data-fade className="mt-5 max-w-[60ch] text-(--color-muted)">{p}</p>
        </div>
      ))}
      {rest.length === 0 && quote && <PullQuote quote={quote} by={quoteBy} />}
    </div>
  )
  const cap = caption && <figcaption className="type-caption mt-3 max-w-[40ch] text-(--color-muted) lg:mt-0 lg:pt-1">{caption}</figcaption>

  if (media === 'full') return (
    <section data-tone={t} className="section-pad">
      <article className="frame">
        <figure data-reveal className="relative">
          <MediaAsset id={image} alt={alt} ratio="21 / 9" mobileRatio="4 / 5" reveal="horizon" sizes="(min-width: 1440px) 1360px, 100vw" />
          <span aria-hidden className="waterline pointer-events-none absolute inset-x-0 top-1/2 h-px origin-left bg-(--color-text)" />
          {caption && <figcaption className="type-caption mt-3 text-(--color-muted)">{caption}</figcaption>}
        </figure>
        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-x-(--gutter)">
          <Lines lines={title} mobile={mobileTitle} className="type-display-2 md:col-span-5" />
          <div className="md:col-span-6 md:col-start-7">{body}</div>
        </div>
      </article>
    </section>
  )

  const a = asset(image)
  const picture = <MediaAsset id={image} alt={alt} ratio="var(--ratio-card)" reveal="clip" sizes="(min-width: 768px) 36vw, 100vw" />
  return (
    <section data-tone={t} className="section-pad">
      <article className="frame grid gap-10 md:grid-cols-12 md:gap-x-(--gutter)">
        <Lines lines={title} mobile={mobileTitle} className="type-display-2 md:col-span-10" />
        <div className="md:col-span-5 md:col-start-2 md:pt-6">{body}</div>
        <figure className="md:col-span-5 md:col-start-8 md:pt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_8.5rem] lg:gap-x-5">
          {openLarge
            ? <OpenLarge photos={[{ src: a.src, width: a.width, height: a.height, alt, caption }]}>{picture}</OpenLarge>
            : picture}
          {cap}
        </figure>
      </article>
    </section>
  )
}
