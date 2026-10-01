import { MediaAsset } from '@/components/site/MediaAsset'
import { Headline, Reveal } from '@/components/site/motion'
import type { AssetKey } from '@/config/assets'

// OpusKit section — Editorial Story: headline, a narrow reading column and one large image with a margin caption.
// The pull quote breaks out of the column after the second paragraph (full width on mobile).
export function EditorialStorySection({ title, titleLines, meta, image, caption, quote, paragraphs, headingAs = 'h2' }: {
  title: string
  titleLines?: (string | string[])[]
  /** Short facts set in fixed columns under the headline (place, writer, date). */
  meta?: { label: string; value: string; dateTime?: string }[]
  image: AssetKey
  caption?: string
  quote?: string
  paragraphs: string[]
  headingAs?: 'h1' | 'h2'
}) {
  const [lead, ...rest] = paragraphs
  const before = [lead, ...rest.slice(0, 1)]
  const after = rest.slice(1)
  return (
    <section className="border-t border-(--color-border) px-6 py-12 first:border-t-0 md:py-16">
      <article className="grid gap-x-4 md:grid-cols-6 lg:grid-cols-12">
        <Headline as={headingAs} lines={titleLines ?? [title]} className="type-display md:col-span-6 lg:col-span-11 [font-size:clamp(2.75rem,7vw,6.5rem)]" />

        {meta && (
          <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-(--color-border) pt-4 md:col-span-6 md:mt-12 md:grid-cols-3 lg:col-span-12 lg:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="type-utility text-(--color-muted)">{m.label}</dt>
                <dd className="type-utility mt-1 [font-size:1rem]">{m.dateTime ? <time dateTime={m.dateTime}>{m.value}</time> : m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <figure className="mt-8 md:col-span-6 md:mt-12 lg:col-span-12 lg:grid lg:grid-cols-12 lg:gap-x-4">
          <div className="story-clip aspect-[4/3] lg:col-span-9">
            <MediaAsset id={image} priority sizes="(min-width: 1024px) 75vw, 100vw" className="story-drift" />
          </div>
          {caption && <figcaption className="type-utility mt-3 max-w-[40ch] text-(--color-muted) lg:col-span-3 lg:mt-0 lg:self-end">{caption}</figcaption>}
        </figure>

        <Reveal className="type-body mt-12 space-y-6 md:col-span-5 md:mt-16 lg:col-span-6 lg:col-start-4">
          {before.map((p, i) => <p key={i} className={`max-w-[62ch] ${i === 0 ? '[font-size:1.25rem] leading-[1.55]' : ''}`}>{p}</p>)}
        </Reveal>

        {quote && (
          <Reveal className="my-12 md:col-span-6 lg:col-span-9 lg:col-start-4">
            <blockquote className="type-display border-t border-(--color-text) pt-6 text-balance [font-size:clamp(2rem,4.4vw,4rem)]">
              <p>“{quote}”</p>
            </blockquote>
          </Reveal>
        )}

        {after.length > 0 && (
          <Reveal className="type-body space-y-6 md:col-span-5 lg:col-span-6 lg:col-start-4">
            {after.map((p, i) => <p key={i} className="max-w-[62ch]">{p}</p>)}
          </Reveal>
        )}
      </article>
    </section>
  )
}
