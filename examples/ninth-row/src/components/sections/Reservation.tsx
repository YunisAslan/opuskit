// Reservation — a short invitation and the practical facts (box-office hours, the group rule, the phone) beside the
// booking form. The form is the project's own (shadcn Calendar in a Popover, Selects, the seat plan), passed in.
import type { ReactNode } from 'react'
import { Lines } from '@/components/motion/Reveal'

export function ReservationSection({ id, titleLines, text, hours, group, phoneLead, phone, form }: { id?: string; titleLines: string[]; text: string; hours: string[]; group: string; phoneLead: string; phone: string; form: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16 px-(--gutter) pt-[calc(var(--section-y)+64px)] pb-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <Lines as="h1" onLoad lines={titleLines} className="type-display text-[clamp(4rem,9vw,8.5rem)]" />
            <div className="motion-safe:animate-[fade-up_700ms_cubic-bezier(0.22,1,0.36,1)_350ms_both]">
              <p className="type-body mt-8 max-w-[40ch] text-(--color-muted)">{text}</p>
              <h2 className="type-utility mt-10 text-(--color-muted)">Box office</h2>
              <ul className="type-body mt-3 space-y-1">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
              <p className="type-body mt-6 text-(--color-muted)">{group}</p>
              <p className="type-body mt-2">{phoneLead} <a href={`tel:${phone.replace(/\s/g, '')}`} className="press link-line inline-block whitespace-nowrap">{phone}</a></p>
            </div>
          </div>
        </div>
        <div className="border border-(--color-border) bg-(--color-surface) p-5 sm:p-8 md:col-span-7 md:col-start-6 md:p-10">{form}</div>
      </div>
    </section>
  )
}
