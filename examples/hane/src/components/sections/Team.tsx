import type { ReactNode } from 'react'
// OpusKit section — Team: the people, each with a real photo, name, role and one line in their own voice.
// Asymmetric on desktop: one large portrait, two smaller ones offset down the page; two columns on phones.
const place = ['md:col-span-5', 'md:col-span-3 md:col-start-7 md:mt-[128px]', 'md:col-span-3 md:col-start-10 md:mt-[48px]']

export function TeamSection({ title, intro, people }: { title: string; intro?: string; people: { name: string; role: string; line?: string; media: ReactNode }[] }) {
  return (
    <section className="px-[5vw] section-y">
      <div className="grid gap-x-[2vw] md:grid-cols-12">
        <h2 className="type-heading md:col-span-5">{title}</h2>
        {intro && <p className="type-body mt-6 max-w-[48ch] text-(--color-muted) md:col-span-4 md:col-start-8 md:mt-0">{intro}</p>}
      </div>
      <ul className="mt-[clamp(48px,6vw,96px)] grid grid-cols-2 items-start gap-x-4 gap-y-12 md:grid-cols-12 md:gap-x-[2vw]">
        {people.map((p, i) => (
          <li key={p.name} className={`${place[i % 3]} ${i === 0 ? 'col-span-2' : ''}`}>
            <div data-clip className="overflow-hidden rounded-(--radius-media) [&_img]:aspect-[4/5] [&_img]:w-full [&_img]:object-cover">{p.media}</div>
            <p className="type-heading mt-5 [font-size:1.4rem]">{p.name}</p>
            <p className="type-utility mt-1 text-(--color-muted)">{p.role}</p>
            {p.line && <p className="type-body mt-3 max-w-[38ch] text-(--color-muted)">{p.line}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}
