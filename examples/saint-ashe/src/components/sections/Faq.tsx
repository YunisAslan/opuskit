// OpusKit section — FAQ: real questions in a narrow column beside the title. The list itself is the project's own
// shadcn/ui Accordion (type="single" collapsible), passed as children and styled through the tokens — this section only
// lays it out, so no hand-made disclosure ships.
import type { ReactNode } from 'react'

export function FaqSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section id="faq" data-reveal className="scroll-mt-24 px-4 py-32 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12">
        <h2 className="type-heading md:col-span-4">{title}</h2>
        <div className="border-t border-(--color-border) md:col-span-7 md:col-start-6">{children}</div>
      </div>
    </section>
  )
}
