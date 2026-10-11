'use client'
// OpusKit section — About (media "full"), made this site's own: the headline, the portrait wide above the words,
// the statement in the heading hand beside a short bio; then the story of how a map gets made, told beside one held
// picture (ScrollStory — the owner's pick) with the mini map gaining a layer per chapter (the page's moment).
import { MiniMap } from '@/components/drawings/MiniMap'
import { MediaAsset } from '@/components/MediaAsset'
import { Cut, Lines } from '@/components/motion'
import { ScrollStory } from '@/components/pieces/ScrollStory'
import type { AssetKey } from '@/config/assets'
import { about } from '@/content/site'

const PICTURES: Record<string, AssetKey> = { walk: 'processWalk', pencil: 'processSketch', ink: 'deskInk', colour: 'processWatercolour' }

export function AboutSection() {
  const steps = about.story.chapters.map((c) => c.heading.replace(/^The /, 'the '))
  return (
    <section aria-labelledby="about-title" className="px-(--gutter) pb-(--section-y) pt-28 md:pt-36">
      <h1 id="about-title" className="type-display">
        <span className="hidden sm:block lg:max-w-[12ch]">{about.title}</span>
        <span className="sm:hidden">{about.mobileTitle.map((l) => <span key={l} className="block">{l}</span>)}</span>
      </h1>
      <div className="relative -mx-(--gutter) mt-10 aspect-[4/5] overflow-hidden sm:mx-0 sm:aspect-(--ratio-media) sm:rounded-(--radius-media) lg:aspect-[16/9]">
        <MediaAsset id="about" fill priority sizes="100vw" alt={about.portraitAlt} />
      </div>
      <Cut className="grid-site mt-10 gap-y-6 md:mt-14">
        <p className="font-(family-name:--font-heading) col-span-full text-balance [font-size:clamp(1.75rem,3.2vw,2.75rem)] [font-weight:700] leading-[1.1] lg:col-span-7">{about.statement}</p>
        <p className="type-body col-span-full max-w-[52ch] text-(--color-muted) lg:col-span-4 lg:col-start-9 lg:self-end">{about.bio}</p>
      </Cut>

      <Lines lines={[about.story.title]} className="type-h2 mt-(--section-y)" />
      <ScrollStory className="mt-4"
        chapters={about.story.chapters.map((c) => ({
          picture: <MediaAsset id={PICTURES[c.key]} fill sizes="(min-width: 1024px) 50vw, 100vw" alt={c.alt} />,
          body: <><h3 className="type-heading">{c.heading}</h3><p className="type-body mt-3">{c.body}</p></>,
        }))}
        overlay={(active) => <MiniMap step={active} steps={steps} />}
        inline={(i) => <div className="mt-4"><MiniMap step={i} steps={steps} still /></div>}
      />
    </section>
  )
}
