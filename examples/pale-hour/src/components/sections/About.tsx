// About — media `side`: a real portrait in its own place beside the statement and a short bio with real names and
// real history. The page title and the building's story (`opening`) come first. Phones: portrait above the words.
// Behaviour: fade-rise (the portrait opens, the words follow).
import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { i } from '@/components/motion/stagger'
import { MediaAsset } from '@/components/site/MediaAsset'
import type { Media } from '@/config/assets'

type P = { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: ReactNode; opening?: ReactNode; label: string; image: Media; statement: string; bio: string }

export function AboutSection({ tone, title, opening, label, image, statement, bio }: P) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="relative z-10 bg-(--color-background) px-(--gutter) pb-(--section-y) pt-[calc(var(--header-h)+var(--section-y)*0.35)]">
      <div className="mx-auto max-w-(--container)">
        {title}
        {opening && <div className="mt-[calc(var(--section-y)*0.5)]">{opening}</div>}
        <Reveal className="mt-(--section-y) grid items-end gap-x-(--gutter) gap-y-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="rv-img md:max-w-[calc(86svh*0.75)]"><MediaAsset m={image} sizes="(min-width: 768px) 40vw, 100vw" /></div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h2 className="type-utility rv-text text-(--color-muted)" style={i(0)}>{label}</h2>
            <p className="type-heading rv-text mt-6 text-pretty [font-size:clamp(1.75rem,3.2vw,2.9rem)]" style={i(1)}>{statement}</p>
            <p className="type-body rv-text mt-8 max-w-[58ch]" style={i(2)}>{bio}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
