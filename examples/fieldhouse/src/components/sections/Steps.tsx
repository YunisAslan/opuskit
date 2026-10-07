import { Lines, Reveal } from '@/components/motion'
// Steps — rail: the title holds still on the left while the steps run down a line on the right. A real sequence, so
// the steps are numbered. Phones: a vertical list under the title.
export type Step = { name: string; text: string; duration?: string }
export function StepsSection({ id, title, steps }: { id?: string; title: string; steps: Step[] }) {
  return (
    <section id={id} className="section-y px-(--gutter)">
      <div className="mx-auto grid max-w-(--container) gap-x-8 gap-y-12 md:grid-cols-12">
        <div className="self-start md:sticky md:top-24 md:col-span-5">
          <Lines lines={[title]} className="type-heading text-balance" />
        </div>
        <ol className="border-l border-(--color-border) md:col-span-6 md:col-start-7">
          {steps.map((s, i) => (
            <li key={s.name} className="relative pb-14 pl-8 last:pb-0">
              <span aria-hidden className="absolute -left-[5px] top-2 size-[9px] rounded-full bg-(--color-text)" />
              <Reveal delay={0.07}>
                <p className="type-utility flex gap-4 text-(--color-muted)"><span className="tabular-nums">{i + 1}</span>{s.duration && <span>{s.duration}</span>}</p>
                <h3 className="type-heading mt-2 [font-size:clamp(1.35rem,2vw,1.75rem)]">{s.name}</h3>
                <p className="type-body mt-3 max-w-[48ch] text-(--color-muted)">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
