import type { AssetKey } from '@/config/assets'
import { MediaAsset } from '@/components/pieces/MediaAsset'
import { Reveal, RevealImage } from '@/components/pieces/Reveal'

// OpusKit section — About: a real face and a point of view. Portrait, statement, short bio.
// media: side (portrait beside the words), full (a wide photo above, the words under it) or over.
type P = {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'
  media?: 'side' | 'full' | 'over'
  title: string
  image: AssetKey
  statement: string
  bio: string
}

export function AboutSection({ tone, media = 'side', title, image, statement, bio }: P) {
  const words = (
    <>
      <h2 className="type-utility text-(--color-muted)">{title}</h2>
      <p className="type-heading mt-4 text-balance [font-size:clamp(1.5rem,3vw,2.6rem)]">{statement}</p>
    </>
  )

  if (media === 'over') {
    return (
      <section data-tone="inverse" className="relative isolate overflow-hidden px-(--gutter) py-[calc(var(--section-y)*1.4)]">
        <MediaAsset id={image} alt="" className="absolute inset-0 -z-10 h-full w-full opacity-45" />
        <div className="mx-auto max-w-(--container)">
          <div className="max-w-[40ch]">
            {words}
            <p className="type-body mt-6 text-(--color-muted)">{bio}</p>
          </div>
        </div>
      </section>
    )
  }

  if (media === 'full') {
    return (
      <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
        <div className="mx-auto max-w-(--container)">
          <RevealImage>
            <MediaAsset id={image} alt="" className="aspect-(--ratio-media) w-full" />
          </RevealImage>
          <div className="mt-10 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">{words}</div>
            <p className="type-body max-w-[58ch] text-(--color-muted) md:col-span-4 md:col-start-9 md:self-end">{bio}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) items-end gap-10 md:grid-cols-12">
        <RevealImage className="md:col-span-5">
          <MediaAsset id={image} alt="" className="aspect-(--ratio-card) w-full" />
        </RevealImage>
        <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
          {words}
          <p className="type-body mt-6 max-w-[58ch] text-(--color-muted)">{bio}</p>
        </Reveal>
      </div>
    </section>
  )
}