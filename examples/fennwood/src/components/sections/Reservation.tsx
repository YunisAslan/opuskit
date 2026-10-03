// OpusKit section — Reservation: a short invitation, the practical facts, and the booking form beside them. The form is
// the project's own, built from shadcn/ui (a Calendar in a Popover for the day, Selects for time and party size) and passed
// in as `form`; it hands off to the booking link or email with the details filled in — no fake confirmation. This section
// only lays it out, so no plain browser date, time or number input ships.
import type { ReactNode } from 'react'

export function ReservationSection({ id, title, text, hours, phone, form }: { id?: string; title: ReactNode; text: string; hours: string[]; phone: string; form: ReactNode }) {
  return (
    <section id={id} className="px-5 py-(--section-pad) md:px-6">
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          {title}
          <p className="type-body mt-6 max-w-[48ch] text-(--color-muted)">{text}</p>
          <ul className="type-body mt-6 space-y-1">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
          <p className="type-body mt-4">Rather call? <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-block py-2.5 underline underline-offset-4">{phone}</a></p>
        </div>
        <div className="rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-5 shadow-(--shadow-card) sm:p-8 md:col-span-7 md:self-start lg:col-span-6 lg:col-start-7">{form}</div>
      </div>
    </section>
  )
}
