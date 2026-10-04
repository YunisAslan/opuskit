import type { ElementType, ReactNode } from 'react'
// OpusKit section — Featured Work as a photo story: photo / text pairs that alternate sides and vary widths
// (7/4, then 4/6, then one wide) so the rhythm never repeats twice in a row. Prints are taped and tilted.
// `chapter` names the item's own colours (--color-{chapter}-ground/ink): the tape takes them, and ChapterColours can
// turn the whole section to them. Mobile: photo then text, full width, original order.
export type Project = { title: string; meta: string; line: string; image: string; alt: string; caption?: string; href: string; id?: string; chapter?: string }

const shapes = [
  { li: 'md:grid-cols-12', fig: 'md:col-span-7 -rotate-2', text: 'md:col-span-4 md:col-start-9', ratio: 'aspect-[3/2]' },
  { li: 'md:grid-cols-12', fig: 'md:col-span-6 md:col-start-6 md:row-start-1 rotate-3', text: 'md:col-span-4 md:col-start-1 md:row-start-1', ratio: 'aspect-[4/5]' },
  { li: 'md:grid-cols-12', fig: 'md:col-span-11 rotate-1', text: 'md:col-span-5 md:col-start-6', ratio: 'aspect-[21/9]' },
]

export function FeaturedWorkSection({ link: L = 'a', title, intro, as: H = 'h2', projects }: { link?: ElementType; title: ReactNode; intro?: ReactNode; as?: 'h1' | 'h2'; projects: Project[] }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="rise md:ml-[8%] md:max-w-[60%]">
          <H className="type-display text-[clamp(2.6rem,6vw,5rem)]">{title}</H>
          {intro && <div className="type-body mt-6 max-w-[52ch] opacity-85">{intro}</div>}
        </div>
        <ul className="mt-20 space-y-28 md:mt-28 md:space-y-48">
          {projects.map((p, i) => {
            const s = shapes[i % 3]
            return (
              <li key={p.href + p.title} id={p.id} data-chapter={p.chapter} className={`grid scroll-mt-24 items-center gap-8 md:gap-x-[1vw] ${s.li}`}>
                <figure className={`taped bg-(--color-surface) p-2 text-(--color-text) shadow-[0_14px_30px_rgb(0_0_0/0.16)] md:p-3 ${s.fig}`} style={p.chapter ? { '--tape': `var(--color-${p.chapter}-ground)` } as React.CSSProperties : undefined}>
                  <span className="clip block"><span className="drift block">
                    <img src={p.image} alt={p.alt} loading="lazy" className={`w-full rounded-(--radius-media) object-cover ${s.ratio}`} />
                  </span></span>
                  {p.caption && <figcaption className="type-utility mt-3 text-(--color-muted)">{p.caption}</figcaption>}
                </figure>
                <div className={`rise ${s.text}`}>
                  <p className="type-utility opacity-80">{p.meta}</p>
                  <h3 className="type-display mt-3 text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.02]">
                    <L href={p.href} className="underline decoration-transparent decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-150 hover:decoration-current">{p.title}</L>
                  </h3>
                  <p className="type-body mt-5 max-w-[46ch]">{p.line}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
