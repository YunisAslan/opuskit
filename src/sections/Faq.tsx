// OpusKit section — FAQ: real questions. The list itself is the project's own shadcn/ui Accordion (type="single"
// collapsible), passed as children and styled through the tokens — this section only lays it out, so no hand-made
// disclosure ships. Three designs:
//   side     — the title on the left, the questions in a narrow column beside it.
//   centered — the title over one narrow, centred column; quiet.
//   stacked  — the title large across the top, the questions full width and set large.
import type { ReactNode } from 'react'

export function FaqSection({ tone, variant = 'side', title, children }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'side' | 'centered' | 'stacked'; title: string; children: ReactNode }) {
  const t = tone === 'ground' ? undefined : tone
  if (variant === 'centered') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-2xl">
        <h2 className="type-heading text-center">{title}</h2>
        <div className="mt-10 border-t border-(--color-border)">{children}</div>
      </div>
    </section>
  )
  if (variant === 'stacked') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-display text-balance [font-size:clamp(2.4rem,6vw,5.5rem)] leading-[0.95]">{title}</h2>
        <div className="mt-12 border-t border-(--color-text) [&_[data-slot=accordion-trigger]]:py-6 [&_[data-slot=accordion-trigger]]:[font-size:clamp(1.15rem,2vw,1.6rem)]">{children}</div>
      </div>
    </section>
  )
  return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12">
        <h2 className="type-heading md:col-span-4">{title}</h2>
        <div className="border-t border-(--color-border) md:col-span-7 md:col-start-6">{children}</div>
      </div>
    </section>
  )
}
