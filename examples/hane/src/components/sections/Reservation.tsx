import type { ReactNode } from 'react'
// OpusKit section — Reservation: a short invitation, the practical facts, and the booking form beside it.
// The form is passed in (`form`) so it can hand off however this site books — here, the visitor's own mail app.
export function ReservationSection({ title, text, hours, phone, tel, form, status }: { title: string; text: string; hours: string[]; phone: string; tel: string; form: ReactNode; /** a line that is true right now */ status?: ReactNode }) {
  return (
    <section className="px-[5vw] section-y">
      <div className="grid gap-x-[2vw] gap-y-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="type-heading">{title}</h2>
          <p className="type-body mt-4 max-w-[44ch] text-(--color-muted)">{text}</p>
          {status && <div className="mt-6">{status}</div>}
          <ul className="type-body mt-6 space-y-1">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
          <p className="type-body mt-6">Rather talk it through? <a href={tel} className="underline underline-offset-4">{phone}</a></p>
        </div>
        <div className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">{form}</div>
      </div>
    </section>
  )
}
