// OpusKit section — Reservation: a short invitation, the practical facts, and the booking form beside them. The form
// is the site's own (shadcn: Calendar in a Popover, Selects, Textarea) and hands off to the visitor's email app with
// everything filled in — no fake confirmation. Pip & Kiln: the facts as a ruled list, the form on a surface card.
import type { ReactNode } from 'react'
import { SectionHead } from '@/components/parts/SectionHead'

export function ReservationSection({ title, lines, text, hours, phone, callPrompt, form }: { title: string; lines: string[]; text: string; hours: string[]; phone: string; callPrompt: string; form: ReactNode }) {
  return (
    <section id="book" className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <SectionHead text={title} lines={lines} line={text} />
          <ul className="type-body mt-8 border-t border-(--color-text)">{hours.map((h) => <li key={h} className="border-b border-(--color-text)/25 py-3">{h}</li>)}</ul>
          <p className="type-body mt-6">{callPrompt} <a href={`tel:${phone.replace(/\s/g, '')}`} className="t-card whitespace-nowrap underline decoration-2 underline-offset-4">{phone}</a></p>
        </div>
        <div className="rounded-(--radius-card) bg-(--color-surface) p-6 md:col-span-6 md:col-start-7 md:self-start md:p-10">{form}</div>
      </div>
    </section>
  )
}
