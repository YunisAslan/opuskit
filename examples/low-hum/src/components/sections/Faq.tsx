// OpusKit section — FAQ fitted to Low Hum: the title centred over a narrow column of real questions. The list is the
// project's shadcn/ui Accordion (type="single" collapsible), passed as children.
import type { ReactNode } from 'react'

export function FaqSection({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  return (
    <section id="questions" className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <div className="text-center">{heading}</div>
        <div className="mx-auto mt-14 max-w-[760px] border-t border-(--color-border) md:mt-16">{children}</div>
      </div>
    </section>
  )
}
