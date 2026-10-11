// OpusKit section — Timeline: the story in dated steps — year, what happened, one line on why it mattered — along a
// hairline, oldest first, the latest step marked. The heading and a short line sit beside it on wide screens and above
// it on phones. Everything stays readable at once: no carousel, no tabs. Two designs:
//   line  — the steps along a hairline beside the heading.
//   years — no line: each year set huge, its step beside it; the years themselves carry the story.
export function TimelineSection({ tone, variant = 'line', title, text, steps }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'line' | 'years'; title: string; text?: string; steps: { when: string; title: string; detail?: string }[] }) {
  if (variant === 'years') return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        {text && <p className="type-body mt-4 max-w-[48ch] text-(--color-muted)">{text}</p>}
        <ol className="mt-12">
          {steps.map((s, i) => (
            <li key={s.when + s.title} className="grid gap-3 border-t border-(--color-border) py-8 md:grid-cols-12 md:items-end md:gap-8">
              <span className={`type-display tabular-nums [font-size:clamp(3rem,10vw,9rem)] leading-[0.85] md:col-span-6 ${i === steps.length - 1 ? 'text-(--color-accent)' : ''}`}>{s.when}</span>
              <div className="md:col-span-5 md:col-start-8">
                <p className="type-heading [font-size:clamp(1.1rem,1.6vw,1.4rem)]">{s.title}</p>
                {s.detail && <p className="type-body mt-1 max-w-[46ch] text-(--color-muted)">{s.detail}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="type-heading md:sticky md:top-28">{title}</h2>
          {text && <p className="type-body mt-4 max-w-[34ch] text-(--color-muted)">{text}</p>}
        </div>
        <ol className="relative border-l border-(--color-border) md:col-span-7 md:col-start-6">
          {steps.map((s, i) => (
            <li key={s.when + s.title} className="relative grid gap-1 pb-12 pl-8 last:pb-0 md:grid-cols-[8rem_1fr] md:gap-8">
              <span aria-hidden className={`absolute -left-[5px] top-2 size-[9px] rounded-full border border-(--color-text) ${i === steps.length - 1 ? 'bg-(--color-accent) border-(--color-accent)' : 'bg-(--color-background)'}`} />
              <span className="type-display tabular-nums [font-size:clamp(1.6rem,2.6vw,2.4rem)] leading-none">{s.when}</span>
              <div>
                <p className="type-heading [font-size:clamp(1.1rem,1.5vw,1.35rem)]">{s.title}</p>
                {s.detail && <p className="type-body mt-1 max-w-[52ch] text-(--color-muted)">{s.detail}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
