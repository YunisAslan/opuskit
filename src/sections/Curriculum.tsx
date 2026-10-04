// OpusKit section — Curriculum: a course week by week. Each module is a row: its number and length, the title, a line on
// what it covers, the lessons in it, and what the student makes or hands in. The rows are real sequence, so they keep
// their numbers. Each lesson list is open on the page (nothing hidden behind a click), so it reads like a syllabus.
export type Module = { label: string; title: string; text?: string; lessons: string[]; outcome?: { label: string; value: string } }

export function CurriculumSection({ tone, title, text, modules, note }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; text?: string; modules: Module[]; note?: string }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        {text && <p className="type-body mt-4 max-w-[56ch] text-(--color-muted)">{text}</p>}
        <ol className="mt-12 border-t border-(--color-border)">
          {modules.map((m) => (
            <li key={m.title} className="grid gap-x-8 gap-y-4 border-b border-(--color-border) py-8 md:grid-cols-12">
              <p className="type-utility text-(--color-muted) md:col-span-2">{m.label}</p>
              <div className="md:col-span-4">
                <h3 className="type-heading [font-size:clamp(1.2rem,2vw,1.6rem)]">{m.title}</h3>
                {m.text && <p className="type-body mt-3 text-(--color-muted)">{m.text}</p>}
              </div>
              <ul className="type-body space-y-2 md:col-span-4">
                {m.lessons.map((l) => <li key={l} className="border-l border-(--color-border) pl-4">{l}</li>)}
              </ul>
              {m.outcome && (
                <div className="md:col-span-2">
                  <p className="type-utility text-(--color-muted)">{m.outcome.label}</p>
                  <p className="type-body mt-1">{m.outcome.value}</p>
                </div>
              )}
            </li>
          ))}
        </ol>
        {note && <p className="type-utility mt-8 text-(--color-muted)">{note}</p>}
      </div>
    </section>
  )
}
