// OpusKit section — Timeline, fitted to Kelp Line: the heading and a short line hold still beside a hairline of dated
// steps, oldest first; the latest step is marked with the one accent dot. Phones: heading above, steps along the line.
// Each step settles in with the soft fade, 90ms apart.
type Tone = 'ground' | 'surface' | 'inverse' | 'chapter'

export function TimelineSection({ tone, title, text, steps }: { tone?: Tone; title: string; text?: string; steps: { when: string; title: string; detail?: string }[] }) {
  if (!steps.length) return null
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="section-pad">
      <div className="frame grid gap-12 md:grid-cols-12 md:gap-x-(--gutter)">
        <div data-fade className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <h2 className="type-heading">{title}</h2>
            {text && <p className="type-body mt-4 max-w-[34ch] text-(--color-muted)">{text}</p>}
          </div>
        </div>
        <ol className="relative border-l border-(--color-border) md:col-span-7 md:col-start-6">
          {steps.map((s, i) => {
            const latest = i === steps.length - 1
            return (
              <li key={s.when + s.title} data-fade style={{ ['--i' as string]: i }} className="relative grid gap-2 pb-12 pl-8 last:pb-0 md:grid-cols-[7.5rem_1fr] md:gap-8 md:pl-10">
                <span aria-hidden className={`absolute -left-[5px] top-[0.55em] size-[9px] rounded-full border ${latest ? 'border-(--color-accent) bg-(--color-accent)' : 'border-(--color-muted) bg-(--color-background)'}`} />
                <span className="type-number">{s.when}</span>
                <div>
                  <h3 className="type-title">{s.title}{latest && <span className="sr-only"> (latest)</span>}</h3>
                  {s.detail && <p className="type-body mt-2 max-w-[48ch] text-(--color-muted)">{s.detail}</p>}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
