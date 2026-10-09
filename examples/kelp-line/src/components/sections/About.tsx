import { MediaAsset } from '@/components/media/MediaAsset'
import { Lines } from '@/components/motion/Lines'
// OpusKit section — About, "side", fitted to Kelp Line (the first screen of Our mission): a real portrait beside the
// page's title, a statement naming the people, and a short history. It fades up on load like every first screen.
// Phones: the title first, the portrait under it, then the words (portrait above the text).
type P = { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; label: string; heading: string[]; mobileHeading?: string[]; alt: string; statement: string; bio: string; caption?: string }

export function AboutSection({ tone, label, heading, mobileHeading, alt, statement, bio, caption }: P) {
  const s = (n: number) => ({ ['--i' as string]: n })
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="section-pad first-pad">
      <div className="frame grid gap-10 md:grid-cols-12 md:grid-rows-[1fr_auto] md:gap-x-(--gutter) md:gap-y-0">
        <div className="md:col-span-6 md:col-start-7 md:row-start-1 md:self-end">
          <p className="type-utility rise text-(--color-muted)">{label}</p>
          <Lines as="h1" onLoad lines={heading} mobile={mobileHeading} className="type-display-2 mt-5" />
        </div>
        <figure className="rise md:col-span-5 md:col-start-1 md:row-span-2 md:row-start-1 md:self-end" style={s(1)}>
          <MediaAsset id="about" alt={alt} ratio="var(--ratio-card)" mobileRatio="4 / 5" preload sizes="(min-width: 768px) 40vw, 100vw" />
          {caption && <figcaption className="type-caption mt-3 text-(--color-muted)">{caption}</figcaption>}
        </figure>
        <div className="md:col-span-6 md:col-start-7 md:row-start-2">
          <p className="type-lead rise max-w-[40ch] md:mt-10" style={s(2)}>{statement}</p>
          <p className="type-body rise mt-5 max-w-[56ch] text-(--color-muted)" style={s(3)}>{bio}</p>
        </div>
      </div>
    </section>
  )
}
