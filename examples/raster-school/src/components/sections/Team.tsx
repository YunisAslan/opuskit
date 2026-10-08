// OpusKit section — Team, `list`: a ruled list — a small portrait, then name, role and line on one row (people over
// pictures). Fitted to Raster School: each field sits on a column line — portrait on column 1, name from column 2,
// role from 5, their line from 8. On phones the portrait keeps its column and the words stack beside it.
import { Section, SectionHead } from '@/components/site/SectionHead'
import { MediaAsset } from '@/components/site/MediaAsset'

type Person = { name: string; role: string; line?: string }

export function TeamSection({ tone, title, people }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'list'; title: string; people: Person[] }) {
  return (
    <Section tone={tone}>
      <SectionHead title={title} count={people.length} />
      <ul className="mt-10 lg:mt-16">
        {people.map((p, i) => (
          <li key={p.name} data-reveal style={{ '--i': i } as React.CSSProperties} className="raster items-start gap-y-1 border-b border-(--color-border) py-4 first:border-t">
            <MediaAsset id="team" index={i} sizes="(min-width: 1024px) 8vw, 25vw" className="col-span-1 row-span-3 sm:row-span-2 lg:row-span-1" />
            <p className="type-heading col-span-3 [font-size:clamp(1.25rem,1.8vw,1.5rem)] sm:col-span-2 lg:col-span-3">{p.name}</p>
            <p className="type-utility col-span-3 text-(--color-muted) sm:col-span-3 lg:col-span-3 lg:pt-1.5">{p.role}</p>
            {p.line && <p className="type-body col-span-3 col-start-2 max-w-[52ch] sm:col-span-5 sm:col-start-2 lg:col-span-5 lg:col-start-8">{p.line}</p>}
          </li>
        ))}
      </ul>
    </Section>
  )
}
