// Team — Large portraits: two big portraits to a row, each person's name, role and one line in their own voice.
// The second column sits lower, so the row reads as a sequence rather than a grid. Phones: two columns, smaller type.
// Behaviour: fade-rise, 60ms apart.
import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { i } from '@/components/motion/stagger'
import { MediaAsset } from '@/components/site/MediaAsset'
import type { Media } from '@/config/assets'
import { cn } from '@/lib/utils'

type Person = { name: string; role: string; line?: string; image: Media }

export function TeamSection({ tone, title, people }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: ReactNode; people: Person[] }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="relative z-10 bg-(--color-background) px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        {title}
        <Reveal as="ul" className="mt-[calc(var(--section-y)*0.5)] grid grid-cols-2 gap-x-4 gap-y-14 md:gap-x-(--gutter) md:gap-y-[calc(var(--section-y)*0.6)]">
          {people.map((p, n) => (
            <li key={p.name} className={cn('md:max-w-[calc(80svh*0.75)]', n % 2 === 1 && 'md:mt-[calc(var(--section-y)*0.8)] md:justify-self-end')}>
              <div className="rv-img" style={i(n)}><MediaAsset m={p.image} sizes="(min-width: 768px) 40vw, 50vw" /></div>
              <h3 className="type-heading rv-text mt-5 [font-size:clamp(1.15rem,2.2vw,1.9rem)]" style={i(n + 1)}>{p.name}</h3>
              <p className="type-utility rv-text mt-1 text-(--color-muted)" style={i(n + 1)}>{p.role}</p>
              {p.line && <p className="type-caption md:type-body rv-text mt-3 max-w-[40ch]" style={i(n + 2)}>{p.line}</p>}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
