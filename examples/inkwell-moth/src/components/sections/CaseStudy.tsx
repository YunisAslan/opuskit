import type { ElementType, ReactNode } from 'react'
// OpusKit section — Case Study preview: one project in depth — wide media, facts, then problem / approach / result.
// `aside` adds a second, smaller print taped over the wide one (the reference it was drawn from).
type Print = { src: string; alt: string; caption?: string }
export function CaseStudySection({ link: L = 'a', title, image, alt, caption, aside, facts, paragraphs, href, spot }: { link?: ElementType; title: string; image: string; alt: string; caption?: string; aside?: Print; facts: { label: string; value: string }[]; paragraphs: string[]; href?: string; spot?: ReactNode }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="relative md:mr-[6%]">
          <figure className="bg-(--color-surface) p-2 shadow-[0_14px_30px_rgb(0_0_0/0.14)] md:-rotate-1 md:p-3">
            <span className="clip block"><span className="drift block"><img src={image} alt={alt} loading="lazy" className="aspect-[4/3] w-full rounded-(--radius-media) object-cover md:aspect-[21/9]" /></span></span>
            {caption && <figcaption className="type-utility mt-3 text-(--color-muted)">{caption}</figcaption>}
          </figure>
          {aside && (
            <figure className="taped relative z-10 mt-8 ml-auto w-[78%] rotate-3 bg-(--color-surface) p-2 shadow-[0_14px_30px_rgb(0_0_0/0.18)] md:absolute md:-bottom-24 md:-right-[5%] md:mt-0 md:w-[36%]">
              <span className="clip block"><img src={aside.src} alt={aside.alt} loading="lazy" className="aspect-[3/2] w-full rounded-(--radius-media) object-cover" /></span>
              {aside.caption && <figcaption className="type-utility mt-2 text-(--color-muted)">{aside.caption}</figcaption>}
            </figure>
          )}
        </div>
        <div className="mt-16 grid gap-10 md:mt-36 md:grid-cols-12">
          <div className="rise md:col-span-4">
            {spot}
            <h2 className="type-display mt-2 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02]">{title}</h2>
            <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-(--color-text)/20 pt-6">
              {facts.map((f) => <div key={f.label}><dt className="type-utility text-(--color-muted)">{f.label}</dt><dd className="type-body mt-1">{f.value}</dd></div>)}
            </dl>
          </div>
          <div className="rise type-body space-y-6 md:col-span-6 md:col-start-6 md:pt-24">
            {paragraphs.map((p, i) => <p key={i} className="max-w-[60ch]">{p}</p>)}
            {href && <L href={href} className="inline-block underline underline-offset-4">Read the full case study</L>}
          </div>
        </div>
      </div>
    </section>
  )
}
