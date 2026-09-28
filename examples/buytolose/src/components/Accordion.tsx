import type { ReactNode } from "react"

export function Accordion({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="border-t border-border">
      {items.map((it) => (
        <details key={it.q} className="accordion border-b border-border">
          <summary className="flex min-h-11 items-center justify-between gap-6 py-6 font-heading text-lg font-semibold">
            {it.q}
            <span aria-hidden className="plus font-display text-2xl leading-none">+</span>
          </summary>
          <div className="max-w-[60ch] pb-6 text-muted">{it.a}</div>
        </details>
      ))}
    </div>
  )
}
