// OpusKit section — Reservation: a short invitation, the practical facts, and the booking form beside them. The form is
// the project's own, built from shadcn/ui (a Calendar in a Popover for the day, Selects for time and party size) and passed
// in as `form`; it hands off to the booking link or email with the details filled in — no fake confirmation. This section
// only lays it out, so no plain browser date, time or number input ships.
import type { ReactNode } from 'react'

export function ReservationSection({ tone, title, text, hours, phone, form }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; text: string; hours: string[]; phone: string; form: ReactNode }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="type-heading">{title}</h2>
          <p className="type-body mt-4 text-(--color-muted)">{text}</p>
          <ul className="type-body mt-6 space-y-1">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
          <p className="type-body mt-4">Rather call? <a href={`tel:${phone.replace(/\s/g, '')}`} className="underline underline-offset-4">{phone}</a></p>
        </div>
        <div className="rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-card) md:col-span-6 md:col-start-7 md:self-start">{form}</div>
      </div>
    </section>
  )
}
