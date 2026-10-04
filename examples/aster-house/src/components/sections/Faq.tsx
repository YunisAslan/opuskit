// OpusKit section — FAQ: real questions in a narrow column beside the title. The list itself is the project's own
// shadcn/ui Accordion (type="single" collapsible), passed as children and styled through the tokens — this section only
// lays it out, so no hand-made disclosure ships.
import type { ReactNode } from 'react'

export function FaqSection({ id, title, children }: { id?: string; title: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16 px-5 py-30 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12">
        <h2 className="type-display flex items-center gap-5 self-start [font-size:clamp(2.4rem,5vw,4.5rem)] md:col-span-5">{title}</h2>
        <div className="border-t border-(--color-border) md:col-span-6 md:col-start-7">{children}</div>
      </div>
    </section>
  )
}
