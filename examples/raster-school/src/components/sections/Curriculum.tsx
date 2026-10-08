// OpusKit section — Curriculum: a course week by week. Each module is a row: its number, the title, a line on what it
// covers, the lessons in it, and what the student hands in. The rows are a real sequence, so they keep their numbers;
// every lesson list is open on the page. Fitted to Raster School: it opens the Curriculum page — the title in the
// display face, then the page's moment (Poster in six frames), then one ruled row per week on the column lines:
// label on 1–2, title on 3–6, lessons on 7–10, the hand-in on 11–12. On phones each week stacks.
import { Section } from '@/components/site/SectionHead'
import { PosterFrames } from '@/components/site/PosterFrames'
import type { Module } from '@/content/course'

export function CurriculumSection({ tone, title, text, modules, note }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; text?: string; modules: Module[]; note?: string }) {
  return (
    <Section tone={tone} className="pt-[calc(var(--nav-top)+var(--nav-h)+clamp(56px,8vw,112px))]">
      <div className="raster">
        <h1 className="type-display col-span-4 sm:col-span-6 lg:col-span-12">
          {title.split(/(?<=,) /).map((line, i) => (
            <span key={line} className="line-in" style={{ '--i': i } as React.CSSProperties}>{line}</span>
          ))}
        </h1>
        {text && <p className="type-body col-span-4 mt-8 text-(--color-muted) sm:col-span-4 lg:col-span-4 lg:mt-12 lg:[font-size:1.125rem]">{text}</p>}
      </div>

      <div className="mt-14 lg:mt-20">
        <PosterFrames weeks={modules} />
      </div>

      <ol className="mt-(--section-y) border-t border-(--color-text)">
        {modules.map((m, i) => (
          <li key={m.title} id={`week-${i + 1}`} className="raster scroll-mt-28 gap-y-4 border-b border-(--color-border) py-6 lg:py-8">
            <p className="col-span-4 flex items-baseline gap-3 sm:col-span-6 lg:col-span-2 lg:block">
              <span aria-hidden className="type-display [font-size:clamp(2.5rem,4vw,3.5rem)] leading-[0.85]">{i + 1}</span>
              <span className="type-utility text-(--color-muted) lg:mt-3 lg:block">{m.label}</span>
            </p>
            <div className="col-span-4 sm:col-span-6 lg:col-span-4">
              <h2 className="type-heading [font-size:clamp(1.375rem,2.2vw,1.875rem)]">{m.title}</h2>
              <p className="type-body mt-2 max-w-[40ch] text-(--color-muted)">{m.text}</p>
            </div>
            <ul className="type-body col-span-4 sm:col-span-4 lg:col-span-4">
              {m.lessons.map((l) => (
                <li key={l} className="border-t border-(--color-border) py-2 first:border-t-0 first:pt-0">{l}</li>
              ))}
            </ul>
            <div className="col-span-4 border-l border-(--color-text) pl-4 sm:col-span-2 lg:col-span-2">
              <p className="type-utility text-(--color-muted)">{m.outcome.label}</p>
              <p className="type-body mt-1">{m.outcome.value}</p>
            </div>
          </li>
        ))}
      </ol>
      {note && <p className="type-utility mt-6 text-(--color-muted)">{note}</p>}
    </Section>
  )
}
