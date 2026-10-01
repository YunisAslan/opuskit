'use client'
// OpusKit section — FAQ: real questions in a narrow column; each answer opens in place (keyboard and screen-reader friendly).
import { useId, useState } from 'react'

export function FaqSection({ title, items }: { title: string; items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const id = useId()
  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12">
        <h2 className="type-heading md:col-span-4">{title}</h2>
        <ul className="border-t border-(--color-border) md:col-span-7 md:col-start-6">
          {items.map((it, i) => (
            <li key={it.q} className="border-b border-(--color-border)">
              <h3>
                <button type="button" aria-expanded={open === i} aria-controls={`${id}-${i}`} onClick={() => setOpen(open === i ? null : i)}
                  className="type-heading flex w-full items-center justify-between gap-6 py-5 text-left [font-size:clamp(1.05rem,1.5vw,1.25rem)]">
                  {it.q}<span aria-hidden className={`text-(--color-muted) transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>+</span>
                </button>
              </h3>
              <div id={`${id}-${i}`} role="region" hidden={open !== i} className="type-body max-w-[62ch] pb-6 text-(--color-muted)">{it.a}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
