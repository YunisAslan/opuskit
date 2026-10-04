import type { ElementType } from 'react'
// OpusKit section — Services: what you offer, one row each, with rules between; the hovered row lifts.
export function ServicesSection({ link: L = 'a', title, items }: { link?: ElementType; title: string; items: { name: string; line: string; href?: string; image?: { src: string; alt: string } }[] }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12">
        <h2 className="type-heading md:col-span-4">{title}</h2>
        <ul className="border-t-2 border-(--color-border) md:col-span-8">
          {items.map((s) => (
            <li key={s.name} className={`group grid gap-2 border-b-2 border-(--color-border) py-6 transition-colors hover:bg-(--color-surface) md:px-4 ${s.image ? 'grid-cols-[6rem_1fr] gap-x-4 md:grid-cols-[10rem_1fr_1fr] md:gap-x-6' : 'md:grid-cols-2'}`}>
              {s.image && <img src={s.image.src} alt={s.image.alt} loading="lazy" className="row-span-2 aspect-square w-full rounded-(--radius-media) border-2 border-(--color-border) object-cover md:row-span-1 md:aspect-[4/3]" />}
              <h3 className="type-heading [font-size:clamp(1.25rem,2vw,1.75rem)]">{s.href ? <L href={s.href} className="hover:underline hover:underline-offset-4">{s.name}</L> : s.name}</h3>
              <p className="type-body text-(--color-muted)">{s.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
