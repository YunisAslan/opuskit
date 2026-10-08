// FAQ — real questions in a narrow column beside the title. The list itself is the project's shadcn/ui Accordion
// (type="single" collapsible), passed as children; this section only lays it out.
import type { ReactNode } from 'react'

export function FaqSection({ tone, title, children, id }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: ReactNode; children: ReactNode; id?: string }) {
  return (
    <section id={id} data-tone={tone === 'ground' ? undefined : tone} className="relative z-10 scroll-mt-16 bg-(--color-background) px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-x-(--gutter) gap-y-10 md:grid-cols-12">
        <div className="md:col-span-4">{title}</div>
        <div className="border-t border-(--color-text) md:col-span-7 md:col-start-6">{children}</div>
      </div>
    </section>
  )
}
