// OpusKit section — FAQ: real questions in a narrow column beside the title. The list itself is the project's own
// shadcn/ui Accordion (type="single" collapsible), passed as children and styled through the tokens — this section only
// lays it out, so no hand-made disclosure ships.
import type { ReactNode } from 'react'

export function FaqSection({ id, title, children }: { id?: string; title: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="px-5 py-(--section-pad) md:px-6">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-12">
        <div className="md:col-span-4">{title}</div>
        <div className="border-t border-(--color-border) md:col-span-8 md:col-start-5 lg:col-span-7 lg:col-start-6">{children}</div>
      </div>
    </section>
  )
}
