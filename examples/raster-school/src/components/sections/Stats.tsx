// OpusKit section — Stats, `giant`: the first number huge across the page, the others small in a row beneath (one
// number matters most). Numbers in the display face; nothing counts up. Fitted to Raster School: the giant number
// starts on column 1, its label hangs on column 10; the other three take three columns each, the note the last three.
// Phones: the small numbers become a 2 × 2 grid with the note.
import { Section } from '@/components/site/SectionHead'

type Stat = { value: string; label: string }

export function StatsSection({ tone, title, stats, note }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'giant'; title?: string; stats: Stat[]; note?: string }) {
  const [first, ...rest] = stats
  if (!first) return null
  return (
    <Section tone={tone}>
      <div className="raster border-t border-(--color-text) pt-4">
        {title && <h2 className="type-utility col-span-4 text-(--color-muted) sm:col-span-6 lg:col-span-12">{title}</h2>}
      </div>
      <dl>
        <div className="raster mt-6 items-end gap-y-3">
          <dt className="type-heading order-2 col-span-4 [font-size:clamp(1.25rem,2vw,1.75rem)] sm:col-span-3 lg:col-span-3 lg:pb-[0.4em]">{first.label}</dt>
          <dd className="type-display order-1 col-span-4 leading-[0.8] [font-size:clamp(7rem,30vw,26rem)] sm:col-span-6 lg:col-span-9">{first.value}</dd>
        </div>
        <div className="raster mt-12 gap-y-8 border-t border-(--color-border) pt-6">
          {rest.map((s) => (
            <div key={s.label} className="col-span-2 flex flex-col sm:col-span-2 lg:col-span-3">
              <dt className="type-utility order-2 mt-2 text-(--color-muted)">{s.label}</dt>
              <dd className="type-display order-1 leading-[0.85] [font-size:clamp(2.5rem,4.5vw,4.25rem)]">{s.value}</dd>
            </div>
          ))}
          {note && <p className="type-body col-span-2 text-(--color-muted) sm:col-span-6 lg:col-span-3">{note}</p>}
        </div>
      </dl>
    </Section>
  )
}
