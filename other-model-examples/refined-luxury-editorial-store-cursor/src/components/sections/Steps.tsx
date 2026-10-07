import type { AssetKey } from '@/config/assets'
import { MediaAsset } from '@/components/pieces/MediaAsset'
import { Reveal } from '@/components/pieces/Reveal'

// OpusKit section — Steps: how it goes, 3–5 real steps (numbered, because it is a real sequence).
//   columns — a big number over each step, side by side, a rule above (a studio's process).
//   cards   — a card per step with its own picture.
//   rail    — the title holds still on the left while the steps run down a line on the right.
export type Step = { name: string; text: string; duration?: string; image?: AssetKey }

export function StepsSection({
  tone,
  variant = 'columns',
  title,
  steps,
}: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'
  variant?: 'columns' | 'cards' | 'rail'
  title: string
  steps: Step[]
}) {
  const t = tone === 'ground' ? undefined : tone

  if (variant === 'rail') {
    return (
      <section id="process" data-tone={t} className="px-(--gutter) py-(--section-y)">
        <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12">
          <h2 className="type-heading self-start text-balance md:sticky md:top-24 md:col-span-5">{title}</h2>
          <ol className="border-l border-(--color-border) md:col-span-6 md:col-start-7">
            {steps.map((s, i) => (
              <li key={s.name} className="relative pb-12 pl-8 last:pb-0">
                <span aria-hidden className="absolute -left-[5px] top-2 size-[9px] rounded-full bg-(--color-accent)" />
                <Reveal delay={i * 0.05}>
                  <p className="type-utility text-(--color-muted)">
                    {i + 1}
                    {s.duration ? ` — ${s.duration}` : ''}
                  </p>
                  <h3 className="type-heading mt-2 [font-size:clamp(1.3rem,2.2vw,1.9rem)]">{s.name}</h3>
                  <p className="type-body mt-3 max-w-[48ch] text-(--color-muted)">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  if (variant === 'cards') {
    return (
      <section data-tone={t} className="px-(--gutter) py-(--section-y)">
        <div className="mx-auto max-w-(--container)">
          <h2 className="type-heading max-w-[24ch]">{title}</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
            {steps.map((s, i) => (
              <li key={s.name} className="rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-5 shadow-(--shadow-card)">
                {s.image && (
                  <MediaAsset id={s.image} alt="" className="mb-5 aspect-[4/3] h-auto w-full rounded-(--radius-media)" />
                )}
                <p className="type-utility text-(--color-accent)">Step {i + 1}</p>
                <h3 className="type-heading mt-2 [font-size:clamp(1.15rem,1.6vw,1.4rem)]">{s.name}</h3>
                <p className="type-body mt-2 text-(--color-muted)">{s.text}</p>
                {s.duration && <p className="type-utility mt-3">{s.duration}</p>}
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-heading">{title}</h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]">
          {steps.map((s, i) => (
            <li key={s.name} className="border-t border-(--color-text) pt-5">
              <Reveal delay={i * 0.05}>
                <p className="type-display [font-size:clamp(2.5rem,4vw,3.5rem)]">{i + 1}</p>
                <h3 className="type-heading mt-4 [font-size:clamp(1.15rem,1.6vw,1.4rem)]">{s.name}</h3>
                <p className="type-body mt-2 text-(--color-muted)">{s.text}</p>
                {s.duration && <p className="type-utility mt-3">{s.duration}</p>}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}