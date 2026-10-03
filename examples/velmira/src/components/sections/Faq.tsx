// OpusKit section — FAQ: real questions in a narrow column beside the title. The list itself is the project's own
// shadcn/ui Accordion (type="single" collapsible), passed as children and styled through the tokens — this section only
// lays it out, so no hand-made disclosure ships.
import type { ReactNode } from 'react'
import { Chapter } from '@/components/site/Motif'

export function FaqSection({ title, children, id = 'questions' }: { title: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} data-reveal className="py-32 md:py-40">
      <div className="shell grid gap-10 md:grid-cols-12 md:gap-6">
        <Chapter className="md:col-span-4"><h2 data-rise className="type-heading">{title}</h2></Chapter>
        <div data-rise style={{ '--i': 1 } as React.CSSProperties} className="border-t border-(--color-border) md:col-span-7 md:col-start-6">{children}</div>
      </div>
    </section>
  )
}
