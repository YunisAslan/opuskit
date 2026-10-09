// Team — large portraits, two to a row (the second column set lower, so the pairs read as a sequence): the picture
// cuts in, then the name, role and one line in their own voice. Under 640px one per row — each line needs the room.
import { MediaAsset } from '@/components/MediaAsset'
import { After, Cut } from '@/components/motion/Reveal'

type Person = { name: string; role: string; line: string }

export function TeamSection({ title, people }: { title: string; people: Person[] }) {
  return (
    <section className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        <ul className="mt-12 grid gap-x-6 gap-y-16 sm:grid-cols-2 md:mt-16 md:gap-y-24">
          {people.map((p, i) => (
            <li key={p.name} className={i % 2 === 1 ? 'sm:mt-24' : undefined}>
              <figure>
                <Cut className="aspect-[3/2]" delay={(i % 2) * 0.08}>
                  <MediaAsset id="team" index={i} fill sizes="(min-width: 640px) 50vw, 100vw" className="h-full w-full" />
                </Cut>
                {/* the caption is the site's own words: who it is and what they do */}
                <figcaption>
                  <After delay={0.45 + (i % 2) * 0.08}>
                    <div className="mt-6 flex items-baseline justify-between gap-4">
                      <h3 className="type-heading text-[clamp(1.4rem,2.2vw,1.9rem)]">{p.name}</h3>
                      <p className="type-utility shrink-0 text-(--color-muted)">{p.role}</p>
                    </div>
                    <p className="type-body mt-3 max-w-[44ch] text-(--color-muted)">{p.line}</p>
                  </After>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
