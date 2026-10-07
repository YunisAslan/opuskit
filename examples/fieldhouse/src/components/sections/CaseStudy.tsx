import { ViewTransition } from 'react'
import { MediaAsset } from '@/components/MediaAsset'
import { Lines, Reveal } from '@/components/motion'
import type { AssetKey } from '@/config/assets'
// Case Study: the title and a line, then the barn itself as the page's big picture — the full width of the page —
// and after it the facts beside problem, approach and result. The picture morphs from the project's card on the way
// in (ViewTransition name shared with FeaturedWork). Phones: the picture 3:2, the facts and story stacked under it.
type P = { id?: string; slug: string; title: string; summary: string; image: AssetKey; facts: { label: string; value: string }[]; paragraphs: string[] }
const heads = ['What was there', 'What we did', 'What it is now']
export function CaseStudySection({ id, slug, title, summary, image, facts, paragraphs }: P) {
  return (
    <section id={id} className="section-y px-(--gutter)">
      <div className="mx-auto max-w-(--container)">
        <div className="grid gap-x-8 gap-y-6 md:grid-cols-12 md:items-end">
          <Lines as="h1" lines={[title]} className="type-display md:col-span-8" />
          <Reveal delay={0.15} className="md:col-span-4"><p className="type-heading max-w-[30ch] text-(--color-muted) [font-size:clamp(1.25rem,1.8vw,1.6rem)]">{summary}</p></Reveal>
        </div>
        <ViewTransition name={`project-${slug}`} share="morph" default="none">
          <div className="relative mt-10 aspect-3/2 overflow-hidden rounded-media md:mt-16 md:aspect-16/9">
            <MediaAsset id={image} fill eager sizes="(min-width: 1024px) calc(100vw - 284px), 100vw" />
          </div>
        </ViewTransition>
        <div className="mt-14 grid gap-x-8 gap-y-12 md:mt-20 md:grid-cols-12">
          <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-5 border-y border-(--color-border) py-6 md:col-span-4">
            {facts.map((f) => <div key={f.label}><dt className="type-utility text-(--color-muted)">{f.label}</dt><dd className="type-body mt-1">{f.value}</dd></div>)}
          </dl>
          <div className="space-y-8 md:col-span-6 md:col-start-6">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.07 * i}>
                <h2 className="type-utility text-(--color-muted)">{heads[i]}</h2>
                <p className="type-body mt-2 max-w-[60ch]">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
