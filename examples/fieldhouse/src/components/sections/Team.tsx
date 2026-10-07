import { MediaAsset } from '@/components/MediaAsset'
import { ImageReveal, Lines } from '@/components/motion'
import type { AssetKey } from '@/config/assets'
// Team — large: two big portraits to a row, the line under each. Phones: two columns, smaller.
type Person = { name: string; role: string; line?: string; image: AssetKey }
export function TeamSection({ id, title, people }: { id?: string; title: string; people: Person[] }) {
  return (
    <section id={id} className="section-y px-(--gutter)">
      <div className="mx-auto max-w-(--container)">
        <Lines lines={[title]} className="type-heading" />
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-16 md:gap-x-8 md:gap-y-20 lg:grid-cols-2">
          {people.map((p, i) => (
            <li key={p.name} className={i % 2 === 1 ? 'md:mt-24' : ''}>
              <ImageReveal className="aspect-4/5"><MediaAsset id={p.image} fill sizes="(min-width: 768px) 40vw, 50vw" /></ImageReveal>
              <h3 className="type-heading mt-5 [font-size:clamp(1.2rem,2vw,1.75rem)]">{p.name}</h3>
              <p className="type-utility mt-1 text-(--color-muted)">{p.role}</p>
              {p.line && <p className="type-body mt-3 max-w-[44ch] text-(--color-muted) max-md:hidden">{p.line}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
