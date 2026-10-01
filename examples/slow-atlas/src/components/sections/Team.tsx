import { CutReveal } from '@/components/pieces/CutReveal'
// OpusKit section — Team: the people, each with a real photo, name, role and one line in their own voice.
export function TeamSection({ title, people }: { title: string; people: { name: string; role: string; line?: string; image: string; alt: string }[] }) {
  return (
    <section className="px-6 py-24 md:py-32">
      <CutReveal className="type-heading [font-size:clamp(1.6rem,3vw,2.6rem)]">{title}</CutReveal>
      <ul className={`mt-10 grid grid-cols-2 gap-x-4 gap-y-12 ${people.length % 3 === 0 ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
        {people.map((p) => (
          <li key={p.name}>
            <img src={p.image} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full rounded-(--radius-media) object-cover" />
            <div className="mt-4 border-t border-(--color-border) pt-3">
              <p className="type-heading [font-size:clamp(1.15rem,1.6vw,1.4rem)]">{p.name}</p>
              <p className="type-utility mt-1 text-(--color-muted)">{p.role}</p>
              {p.line && <p className="type-body mt-3 max-w-[36ch] [font-size:1rem]">{p.line}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
