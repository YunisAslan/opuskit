// OpusKit section — About (media: side): a real face and a point of view — portrait, statement, short bio.
// Fitted to Maison Vey: it opens the About page, so it carries the page's h1 as a display masthead above the portrait.
import type { AssetKey } from '@/config/assets'
import { MediaAsset } from '@/components/media/MediaAsset'
import { FadeRise, Lines, RevealGroup } from '@/components/motion/Reveal'

type P = { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; heading: { desktop: string[]; mobile: string[] }; title: string; image: AssetKey; statement: string; bio: string }

export function AboutSection({ tone, heading, title, image, statement, bio }: P) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) pb-(--section-y) pt-24 md:pt-32">
      <div className="mx-auto max-w-(--container)">
        <Lines as="h1" still lines={heading} className="type-display md:w-[calc((100%+var(--grid-gap))*8/12)]" />
        <div className="mt-16 grid items-end gap-x-(--grid-gap) gap-y-12 md:mt-24 md:grid-cols-12">
          <MediaAsset id={image} sizes="(min-width: 768px) 40vw, 100vw" preload className="md:col-span-5" />
          <RevealGroup className="md:col-span-6 md:col-start-7">
            <FadeRise as="h2" i={0} className="type-caption text-(--color-muted)">{title}</FadeRise>
            <FadeRise as="p" i={1} className="type-heading mt-4 text-balance">{statement}</FadeRise>
            <FadeRise as="p" i={2} className="type-body mt-8 max-w-[60ch] text-(--color-muted)">{bio}</FadeRise>
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
