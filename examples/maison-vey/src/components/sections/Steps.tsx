// OpusKit section — Steps, "A line to follow" (rail): the title holds still while the steps run down a line.
// Numbered because it is a real sequence. Fitted to Maison Vey: a square marker on the line (no rounded corners);
// the duration of each step is its time-code, set in the accent; steps reveal in order.
import { FadeRise, RevealGroup } from '@/components/motion/Reveal'

export type Step = { name: string; text: string; duration?: string }

export function StepsSection({ tone, title, steps }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; steps: Step[] }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-x-(--grid-gap) gap-y-12 md:grid-cols-12">
        <h2 className="type-heading self-start text-balance md:sticky md:top-[calc(var(--nav-h)+48px)] md:col-span-4">{title}</h2>
        <RevealGroup as="ol" amount={0.1} className="border-l border-(--color-border) md:col-span-6 md:col-start-7">
          {steps.map((s, i) => (
            <FadeRise as="li" key={s.name} i={i} className="relative pb-16 pl-8 last:pb-0 md:pl-12">
              <span aria-hidden className="absolute -left-[4px] top-[0.55em] size-[7px] bg-(--color-text)" />
              <p className="type-caption text-(--color-muted)">Step {i + 1}</p>
              <h3 className="type-heading mt-2 [font-size:clamp(1.5rem,2vw,1.75rem)]">{s.name}</h3>
              <p className="type-body mt-3 max-w-[48ch] text-(--color-muted)">{s.text}</p>
              {s.duration && <p className="type-caption mt-4 tabular-nums text-(--color-accent)">{s.duration}</p>}
            </FadeRise>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
