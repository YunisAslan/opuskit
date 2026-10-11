// OpusKit section — Specs, "Line by line" (table), made this site's own: the heading and a line on the left, one
// ruled line per fact on the right — the name in pencil grey, the value in ink. Numbers keep their width.
import { Cut } from '@/components/motion'

export type Spec = { label: string; value: string }

export function SpecsSection({ title, text, specs, note }: { title: string; text?: string; specs: Spec[]; note?: string }) {
  if (!specs.length) return null
  return (
    <section aria-labelledby="specs-title" className="px-(--gutter) py-(--section-y)">
      <div className="grid-site gap-y-10">
        <div className="col-span-full lg:col-span-4">
          <h2 id="specs-title" className="type-h2">{title}</h2>
          {text && <p className="type-body mt-4 max-w-[34ch] text-(--color-muted)">{text}</p>}
        </div>
        <div className="col-span-full lg:col-span-7 lg:col-start-6">
          <Cut as="dl" className="border-t border-(--color-text)">
            {specs.map((s) => (
              <div key={s.label} className="grid grid-cols-[minmax(7rem,2fr)_minmax(0,3fr)] gap-4 border-b border-(--color-border) py-4 sm:gap-6">
                <dt className="type-body text-(--color-muted)">{s.label}</dt>
                <dd className="type-body tabular-nums [overflow-wrap:anywhere]">{s.value}</dd>
              </div>
            ))}
          </Cut>
          {note && <p className="type-caption mt-6 text-(--color-muted)">{note}</p>}
        </div>
      </div>
    </section>
  )
}
