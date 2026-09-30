import type { ElementType } from 'react'
// OpusKit section — Featured Work: 3–6 best projects, alternating large and small so the rhythm never repeats.
export type Project = { title: string; meta: string; image: string; alt: string; href: string }

export function FeaturedWorkSection({ link: L = 'a', title, projects }: { link?: ElementType; title: string; projects: Project[] }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-heading">{title}</h2>
        <ul className="mt-12 grid gap-x-6 gap-y-16 md:grid-cols-12">
          {projects.map((p, i) => (
            <li key={p.href} className={i % 3 === 0 ? 'md:col-span-7' : i % 3 === 1 ? 'md:col-span-5 md:mt-24' : 'md:col-span-6 md:col-start-4'}>
              <L href={p.href} className="group block">
                <div className="overflow-hidden rounded-(--radius-media)"><img src={p.image} alt={p.alt} loading="lazy" className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${i % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[3/2]'}`} /></div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="type-heading [font-size:clamp(1.25rem,1.8vw,1.6rem)] group-hover:underline group-hover:underline-offset-4">{p.title}</h3>
                  <p className="type-utility shrink-0 text-(--color-muted)">{p.meta}</p>
                </div>
              </L>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
