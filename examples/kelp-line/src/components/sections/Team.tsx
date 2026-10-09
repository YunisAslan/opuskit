import { MediaAsset } from '@/components/media/MediaAsset'
// OpusKit section — Team, "grid" design, fitted to Kelp Line: four portraits to a row, each with name, role and one
// line in their own voice; they settle in 90ms apart. Phones: two to a row.
type Person = { name: string; role: string; line?: string; image: number; alt: string }

export function TeamSection({ tone, title, people }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; people: Person[] }) {
  if (!people.length) return null
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="section-pad">
      <div className="frame">
        <h2 data-fade className="type-heading">{title}</h2>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-12 md:grid-cols-4 md:gap-x-(--gutter)">
          {people.map((p, i) => (
            <li key={p.name} data-fade style={{ ['--i' as string]: i }} className="min-w-0">
              <MediaAsset id="team" index={p.image} alt={p.alt} ratio="var(--ratio-card)" sizes="(min-width: 768px) 24vw, 50vw" />
              <h3 className="type-title mt-5">{p.name}</h3>
              <p className="type-utility mt-1 text-(--color-muted)">{p.role}</p>
              {p.line && <p className="type-body mt-3 max-w-[32ch] text-(--color-muted)">{p.line}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
