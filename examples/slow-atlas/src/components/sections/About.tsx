import { MediaAsset } from '@/components/site/MediaAsset'
import { Reveal } from '@/components/site/motion'
import type { AssetKey } from '@/config/assets'

// OpusKit section — About: a real face and a point of view. Portrait, statement, short bio.
// `headingAs="h1"` when it opens the page (the About page).
// At the top of a page the portrait is the LCP, so it loads with priority and is not held back by the reveal.
// `image` is optional: leave it out when the same face appears further down the page (e.g. in Team).
export function AboutSection({ title, image, caption, statement, bio, headingAs: H = 'h2' }: { title: string; image?: AssetKey; caption?: string; statement: string; bio: string; headingAs?: 'h1' | 'h2' }) {
  const top = H === 'h1'
  const Wrap = top ? 'div' : Reveal
  return (
    <section className="border-t border-(--color-border) px-6 py-12 first:border-t-0 md:py-16">
      <div className="grid items-end gap-8 md:grid-cols-6 lg:grid-cols-12">
        {image && (
          <Wrap className="md:col-span-3 lg:col-span-4">
            <figure>
              <div className="aspect-square"><MediaAsset id={image} priority={top} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" /></div>
              {caption && <figcaption className="type-utility mt-3 text-(--color-muted)">{caption}</figcaption>}
            </figure>
          </Wrap>
        )}
        <Wrap {...(top ? {} : { delay: 0.06 })} className={image ? 'md:col-span-6 lg:col-span-7 lg:col-start-6' : 'md:col-span-6 lg:col-span-9'}>
          <p className="type-utility text-(--color-muted)">{title}</p>
          <H className="type-display mt-4 text-balance [font-size:clamp(2rem,4.4vw,4rem)]">{statement}</H>
          <p className="type-body mt-6 max-w-[58ch]">{bio}</p>
        </Wrap>
      </div>
    </section>
  )
}
