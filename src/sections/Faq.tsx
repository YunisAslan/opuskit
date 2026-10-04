// OpusKit section — FAQ: real questions in a narrow column beside the title. The list itself is the project's own
// shadcn/ui Accordion (type="single" collapsible), passed as children and styled through the tokens — this section only
// lays it out, so no hand-made disclosure ships.
import type { ReactNode } from 'react'

export function FaqSection({ tone, title, children }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; children: ReactNode }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12">
        <h2 className="type-heading md:col-span-4">{title}</h2>
        <div className="border-t border-(--color-border) md:col-span-7 md:col-start-6">{children}</div>
      </div>
    </section>
  )
}
