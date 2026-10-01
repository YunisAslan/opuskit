'use client'
// OpusKit section — FAQ: real questions in a narrow column; each answer opens in place (keyboard and screen-reader friendly).
import { useId, useState, type ReactNode } from 'react'
import { TextEffect } from '@/components/pieces/TextEffect'
import { ChapterLabel } from '@/components/site/ChapterLabel'

export function FaqSection({ title, label, items, lead = false, aside }: { title: string; label?: string; items: { q: string; a: string }[]; lead?: boolean; aside?: ReactNode }) {
  const [open, setOpen] = useState<number | null>(null)
  const id = useId()
  return (
    <section className={`px-6 md:pb-32 ${lead ? 'pt-40 pb-24 md:pt-48' : 'py-24 md:pt-32'}`}>
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          {label && <ChapterLabel className="mb-4">{label}</ChapterLabel>}
          <TextEffect as={lead ? 'h1' : 'h2'} className={lead ? 'type-display [font-size:clamp(3rem,6vw,5.5rem)]' : 'type-heading'}>{title}</TextEffect>
          {aside}
        </div>
        <ul className="border-t border-(--color-border) md:col-span-7 md:col-start-6">
          {items.map((it, i) => (
            <li key={it.q} className="border-b border-(--color-border)">
              <h3>
                <button type="button" aria-expanded={open === i} aria-controls={`${id}-${i}`} onClick={() => setOpen(open === i ? null : i)}
                  className="type-heading flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left [font-size:clamp(1.05rem,1.5vw,1.25rem)]">
                  {it.q}<span aria-hidden className={`text-(--color-muted) transition-transform duration-200 motion-reduce:transition-none ${open === i ? 'rotate-45' : ''}`}>+</span>
                </button>
              </h3>
              <div id={`${id}-${i}`} role="region" hidden={open !== i} className="type-body max-w-[62ch] pb-6 text-(--color-muted)">{it.a}</div>
            </li>
          ))}
          {items.length === 0 && <li className="type-body border-b border-(--color-border) py-6 text-(--color-muted)">No question matches that yet. Write to us and a person will answer.</li>}
        </ul>
      </div>
    </section>
  )
}
