'use client'
// The opening of Exhibitions: the page title, a line on how the year works, and an index of the shows. Hovering or
// focusing a row crossfades that show's work into a fixed frame on the right (pointer devices; 250ms ease-out);
// phones see the list alone, the works follow below. Reduced motion: the frame swaps without the fade.
import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { MediaAsset } from '@/components/site/MediaAsset'
import { Reveal } from '@/components/motion/Reveal'
import { i } from '@/components/motion/stagger'
import type { Project } from './FeaturedWork'
import { cn } from '@/lib/utils'

export function ExhibitionIndex({ title, intro, label, projects }: { title: ReactNode; intro: string; label: string; projects: Project[] }) {
  const [on, setOn] = useState(0)
  return (
    <div className="pt-[calc(var(--header-h)+var(--section-y)*0.35)]">
      <div className="grid gap-x-(--gutter) gap-y-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">{title}</div>
        <p className="type-body md:col-span-4 md:col-start-9">{intro}</p>
      </div>

      <Reveal className="mt-[calc(var(--section-y)*0.5)] grid gap-x-(--gutter) md:grid-cols-12">
        <div className="md:col-span-8">
          <h2 className="type-utility rv-text border-b border-(--color-text) pb-3" style={i(0)}>{label}</h2>
          <ol onPointerLeave={() => setOn(0)}>
            {projects.map((p, n) => (
              <li key={p.slug} className="rv-text border-b border-(--color-border)" style={i(n + 1)}>
                <Link href={`#${p.slug}`} onPointerEnter={() => setOn(n)} onFocus={() => setOn(n)}
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 transition-colors duration-150 focus-visible:bg-(--color-secondary) md:grid-cols-[9rem_1fr_auto]">
                  <span className="type-utility flex items-center gap-2 max-md:col-span-2">
                    {p.status === 'Now on' && <span aria-hidden className="size-1.5 bg-(--color-accent)" />}{p.status}
                  </span>
                  <span className="type-heading decoration-1 underline-offset-[0.18em] group-hover:underline">
                    {p.title}<span className="type-caption ml-3 align-middle text-(--color-muted)">{p.artist}</span>
                  </span>
                  <span className="type-caption text-right text-(--color-muted) max-md:col-span-2 max-md:text-left">{p.dates}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
        {/* The fixed slot: one frame, the works crossfading inside it */}
        <div aria-hidden className="relative hidden aspect-(--ratio-card) self-start md:col-span-3 md:col-start-10 md:block">
          {projects.map((p, n) => (
            <div key={p.slug} className={cn('absolute inset-0 transition-opacity duration-250 ease-out motion-reduce:transition-none', n === on ? 'opacity-100' : 'opacity-0')}>
              <MediaAsset m={p.image} fit="cover" sizes="22vw" alt="" />
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
