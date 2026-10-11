// OpusKit section — Timeline, "Years set huge" (years), made this site's own: no line, each year huge in the brush
// hand with its step beside it, oldest first; the latest year is in marker. Rules between steps are hairlines.
import { Cut } from '@/components/motion'

export function TimelineSection({ title, text, steps }: { title: string; text?: string; steps: { when: string; title: string; detail?: string }[] }) {
  if (!steps.length) return null
  return (
    <section aria-labelledby="timeline-title" className="px-(--gutter) py-(--section-y)">
      <div className="grid-site gap-y-4">
        <h2 id="timeline-title" className="type-h2 col-span-full lg:col-span-6">{title}</h2>
        {text && <p className="type-body col-span-full max-w-[40ch] text-(--color-muted) lg:col-span-4 lg:col-start-9 lg:self-end">{text}</p>}
      </div>
      <ol className="mt-12">
        {steps.map((s, i) => (
          <li key={s.when + s.title} className="border-t border-(--color-border)">
            <Cut className="grid-site items-end gap-y-3 py-6 md:py-8">
              <span className={`type-display col-span-full tabular-nums leading-[0.85] [font-size:clamp(3.5rem,10vw,9rem)] lg:col-span-6 ${i === steps.length - 1 ? 'text-(--color-accent)' : ''}`}>
                {i === steps.length - 1 && <span className="sr-only">Now: </span>}{s.when}
              </span>
              <div className="col-span-full lg:col-span-5 lg:col-start-8">
                <h3 className="type-heading">{s.title}</h3>
                {s.detail && <p className="type-body mt-1 max-w-[46ch] text-(--color-muted)">{s.detail}</p>}
              </div>
            </Cut>
          </li>
        ))}
      </ol>
    </section>
  )
}
