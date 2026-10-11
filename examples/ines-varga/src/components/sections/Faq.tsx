// OpusKit section — FAQ, "Said loudly" (stacked), made this site's own: the title large across the top, the
// questions full width and set large in the heading hand; the list is the project's shadcn Accordion (children).
import type { ReactNode } from 'react'
import { Lines } from '@/components/motion'

export function FaqSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-labelledby="faq-title" className="px-(--gutter) py-(--section-y)">
      <Lines id="faq-title" lines={[title]} className="type-h2" />
      <div className="mt-10 border-t border-(--color-text) [&_[data-slot=accordion-trigger]]:py-6 [&_[data-slot=accordion-trigger]]:font-(family-name:--font-heading) [&_[data-slot=accordion-trigger]]:[font-size:clamp(1.6rem,2.6vw,2.25rem)] [&_[data-slot=accordion-trigger]]:[font-weight:700] [&_[data-slot=accordion-trigger]]:leading-[1.1]">
        {children}
      </div>
    </section>
  )
}
