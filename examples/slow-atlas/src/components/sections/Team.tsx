import { MediaAsset } from '@/components/site/MediaAsset'
import { Reveal } from '@/components/site/motion'
import type { AssetKey } from '@/config/assets'

// OpusKit section — Team: the people, each with a real photo, name, role and one line in their own voice.
export function TeamSection({ id, title, people }: { id?: string; title: string; people: { name: string; role: string; line?: string; image: AssetKey }[] }) {
  return (
    <section id={id} className="border-t border-(--color-border) px-6 py-12 first:border-t-0 md:py-16">
      <h2 className="type-display [font-size:clamp(2.25rem,5vw,4.5rem)]">{title}</h2>
      <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-12 lg:grid-cols-3">
        {people.map((p, i) => (
          <li key={p.name}>
            <Reveal delay={i * 0.06}>
              <div className="aspect-[4/5]"><MediaAsset id={p.image} sizes="(min-width: 1024px) 33vw, 50vw" /></div>
              <div className="mt-4 border-t border-(--color-border) pt-4">
                <p className="type-heading [font-size:clamp(1.15rem,1.8vw,1.6rem)]">{p.name}</p>
                <p className="type-utility mt-1 text-(--color-muted)">{p.role}</p>
                {p.line && <p className="type-body mt-3 max-w-[40ch]">{p.line}</p>}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
