import { MediaAsset } from '@/components/MediaAsset'
import { Lines, Parallax, Reveal } from '@/components/motion'
import type { AssetKey } from '@/config/assets'
// About — side: the portrait beside the words (statement, then a short bio), a second smaller picture under the bio.
// Phones: portrait above text.
type P = { id?: string; title: string; image: AssetKey; image2?: AssetKey; statement: string[]; statementMobile?: string[]; bio: string }
export function AboutSection({ id, title, image, image2, statement, statementMobile, bio }: P) {
  return (
    <section id={id} className="section-y px-(--gutter)">
      <div className="mx-auto grid max-w-(--container) gap-x-8 gap-y-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <Parallax className="aspect-4/5 rounded-media"><MediaAsset id={image} fill eager sizes="(min-width: 768px) 40vw, 100vw" /></Parallax>
        </Reveal>
        <div className="md:col-span-6 md:col-start-7 md:pt-16">
          <p className="type-utility text-(--color-muted)">{title}</p>
          <Lines as="h1" lines={statement} mobile={statementMobile} className="type-display mt-6 [font-size:clamp(2.5rem,5vw,4.75rem)]" />
          <Reveal delay={0.2}><p className="type-body mt-10 max-w-[52ch] text-(--color-muted)">{bio}</p></Reveal>
          {image2 && (
            <Reveal delay={0.3} className="mt-16 w-3/5 md:ml-auto md:w-1/2">
              <div className="relative aspect-4/5 overflow-hidden rounded-media"><MediaAsset id={image2} fill sizes="(min-width: 768px) 22vw, 60vw" /></div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
