'use client'
// Services — Ruled rows, made Halden's own. The title holds the left four columns; the rows run down the right eight,
// a hairline between each, the hovered row lifting onto the surface. With a mouse, the left column also keeps a
// picture slot under the title: the hovered service's photo crossfades in (hover media preview). Phones and touch
// screens get the rows alone, the line beneath the name. Services are not a sequence, so they carry no numbers.
import Link from 'next/link'
import { useState, type ElementType } from 'react'
import { ImageReveal, Lines, Reveal } from '@/components/motion/Reveal'
import { MediaAsset } from '@/components/MediaAsset'
import { Opening, PageIntro, type Intro } from '@/components/sections/PageIntro'
import type { ImageKey } from '@/config/assets'
import { useFinePointer } from '@/lib/motion'

type Service = { name: string; line: string; image?: ImageKey; href?: string }

export function ServicesSection({ tone, link: L = Link, title, items, intro }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; link?: ElementType; title: string; items: readonly Service[]; intro?: Intro
}) {
  const fine = useFinePointer()
  const [active, setActive] = useState(0)
  const withPictures = fine && items.every((s) => s.image)
  const name = (s: Service) => (s.href ? <L href={s.href} className="link-line">{s.name}</L> : s.name)
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <Opening on={!!intro}>
      <div className="mx-auto max-w-(--container)">
        {intro && <PageIntro intro={intro} />}
        <div className="grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <Lines lines={[title]} className="type-heading" />
            {withPictures && (
              <ImageReveal className="mt-12 hidden aspect-[4/5] w-full max-w-[320px] lg:block">
                <div className="relative h-full w-full">
                  {items.map((s, i) => (
                    <div key={s.name} aria-hidden={i !== active} className={`absolute inset-0 transition-opacity duration-[250ms] ease-out ${i === active ? 'opacity-100' : 'opacity-0'}`}>
                      <MediaAsset id={s.image!} sizes="320px" className="h-full w-full" />
                    </div>
                  ))}
                </div>
              </ImageReveal>
            )}
          </div>
          <ul className="border-t border-(--color-border) md:col-span-8">
            {items.map((s, i) => (
              <Reveal as="li" key={s.name} delay={0.3 + i * 0.06}>
                <div
                  onMouseEnter={() => setActive(i)}
                  className="grid gap-2 border-b border-(--color-border) py-8 transition-colors duration-150 ease-out hover:bg-(--color-surface) md:grid-cols-8 md:gap-6 md:px-6"
                >
                  <h3 className="type-title md:col-span-3">{name(s)}</h3>
                  <p className="type-body text-(--color-muted) md:col-span-5">{s.line}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
      </Opening>
    </section>
  )
}
