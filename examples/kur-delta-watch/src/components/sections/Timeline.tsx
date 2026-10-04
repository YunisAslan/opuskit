// OpusKit section — Timeline: the story in dated steps — year, what happened, one line on why it mattered — along a
// hairline, oldest first, the latest step marked. The heading and a short line sit beside it on wide screens and above
// it on phones. Everything stays readable at once: no carousel, no tabs.
export function TimelineSection({ title, text, steps }: { title: string; text?: string; steps: { when: string; title: string; detail?: string }[] }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="type-heading md:sticky md:top-28">{title}</h2>
          {text && <p className="type-body mt-4 max-w-[34ch] text-(--color-muted)">{text}</p>}
        </div>
        <ol className="relative border-l-2 border-(--color-border) md:col-span-7 md:col-start-6">
          {steps.map((s, i) => (
            <li key={s.when + s.title} className="relative grid gap-1 pb-12 pl-8 last:pb-0 md:grid-cols-[8rem_1fr] md:gap-8">
              <span aria-hidden className={`absolute -left-[7px] top-2 size-3 border-2 border-(--color-text) ${i === steps.length - 1 ? 'bg-(--color-accent) border-(--color-accent)' : 'bg-(--color-background)'}`} />
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
