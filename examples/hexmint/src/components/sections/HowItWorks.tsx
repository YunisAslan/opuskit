import { TextEffect } from '@/components/pieces/TextEffect'
import { ChapterLabel } from '@/components/site/ChapterLabel'
// OpusKit section — How It Works: 3–4 steps side by side on desktop, stacked on mobile. Steps switch on one after
// another as the section arrives.
export function HowItWorksSection({ title, label, steps }: { title: string; label?: string; steps: { name: string; text: string; image?: string; alt?: string }[] }) {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        {label && <ChapterLabel className="mb-4">{label}</ChapterLabel>}
        <TextEffect as="h2" className="type-heading max-w-[24ch]">{title}</TextEffect>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.name} data-reveal style={{ '--i': i * 3 } as React.CSSProperties} className="flex flex-col rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-card) md:min-h-[18rem] md:p-8">
              {s.image && <img src={s.image} alt={s.alt ?? ''} loading="lazy" className="mb-5 aspect-[4/3] w-full rounded-(--radius-media) object-cover" />}
              <p className="type-utility tabular-nums text-(--color-accent)">Step {i + 1} of {steps.length}</p>
              <h3 className="type-heading mt-auto pt-10 [font-size:clamp(1.15rem,1.6vw,1.4rem)]">{s.name}</h3>
              <p className="type-body mt-2 text-(--color-muted)">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
