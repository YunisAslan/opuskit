import type { ElementType } from 'react'
// OpusKit section — Featured Work as a photo story: photo / text pairs that alternate sides on the 12-column grid,
// widths varying 7/5, then 5/7, then one full-bleed, so the rhythm never repeats twice in a row. Each pair reveals
// together. Phones: photo, then text, every photo full width, original order.
import { Reveal } from '@/components/motion/Reveal'

export type Project = { title: string; meta: string; year?: string; text?: string; image: string; alt: string; href: string; id?: string; link?: string }

export function FeaturedWorkSection({ link: L = 'a', title, projects }: { link?: ElementType; title: string; projects: Project[] }) {
  return (
    <section className="px-5 py-12 md:px-8">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-body text-(--color-muted)">{title}</h2>
        <ul className="mt-12 space-y-24 md:space-y-40">
          {projects.map((p, i) => {
            const shape = i % 3 // 0: photo 7 left, 1: photo 7 right (text 5 left), 2: full-bleed photo, text under
            return (
              <Reveal as="li" key={p.href} className="scroll-mt-24">
                <article id={p.id} className="grid scroll-mt-24 gap-6 md:grid-cols-12 md:items-end md:gap-8">
                  <img src={p.image} alt={p.alt} loading="lazy" width={2400} height={1600}
                    className={`w-full rounded-media object-cover ${shape === 2 ? 'aspect-[4/5] md:col-span-12 md:aspect-[21/9]' : 'aspect-[4/5] md:aspect-[4/3] md:col-span-7'} ${shape === 1 ? 'md:col-start-6 md:row-start-1' : ''}`} />
                  <div className={shape === 2 ? 'md:col-span-5' : shape === 1 ? 'md:col-span-4 md:col-start-1 md:row-start-1' : 'md:col-span-4 md:col-start-9'}>
                    <h3 className="type-heading">{p.title}</h3>
                    <p className="type-body mt-2 text-(--color-muted)">{p.meta}{p.year && <>, <span className="type-utility">{p.year}</span></>}</p>
                    {p.text && <p className="type-body mt-5 max-w-[46ch]">{p.text}</p>}
                    <L href={p.href} className="type-body mt-6 inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 transition-opacity duration-150 hover:opacity-70">{p.link ?? `Open ${p.title}`}</L>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
