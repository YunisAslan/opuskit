// OpusKit section — Steps, `columns`: a big number over each step, side by side, a rule above (numbered, because it
// is a real sequence). Fitted to Raster School: four steps take three columns each on desktop; on tablets two per row;
// on phones a vertical list — the number holds the first column, the words the other three.
import { Section, SectionHead } from '@/components/site/SectionHead'
import type { Step } from '@/content/course'

export function StepsSection({ tone, title, aside, steps }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'columns'; title: string; aside?: string; steps: Step[] }) {
  const span = steps.length === 3 ? 'lg:col-span-4' : 'lg:col-span-3'
  return (
    <Section tone={tone}>
      <SectionHead title={title} aside={aside} />
      <ol className="raster mt-10 gap-y-10 lg:mt-16">
        {steps.map((s, i) => (
          <li key={s.name} data-reveal style={{ '--i': i } as React.CSSProperties} className={`col-span-4 grid grid-cols-subgrid gap-y-3 border-t border-(--color-border) pt-4 sm:col-span-3 sm:flex sm:flex-col ${span}`}>
            <p aria-hidden className="type-display col-span-1 [font-size:clamp(3.5rem,9vw,8.5rem)] leading-[0.8]">{i + 1}</p>
            <div className="col-span-3 sm:mt-6">
              <h3 className="type-heading [font-size:clamp(1.25rem,1.8vw,1.5rem)]"><span className="sr-only">Step {i + 1}: </span>{s.name}</h3>
              <p className="type-body mt-2 max-w-[38ch] text-(--color-muted)">{s.text}</p>
              {s.duration && <p className="type-utility mt-4">{s.duration}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
