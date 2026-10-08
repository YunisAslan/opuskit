// OpusKit section — Reservation, fitted to Low Hum: a short invitation, the practical facts (hours, group policy,
// phone), and the booking form beside them on a raised card. `extra` sits under the facts (the Reservations page
// puts its record there).
import type { ReactNode } from 'react'

export function ReservationSection({ heading, text, groups, hours, hoursLabel, phone, phoneDisplay, call, form, extra, top, id = 'book' }: {
  /** a page-wide opener above the two columns (the Reservations page h1) */
  top?: ReactNode
  heading?: ReactNode; text: string; groups: string; hours: string[]; hoursLabel: string; phone: string; phoneDisplay?: string; call: string; form: ReactNode; extra?: ReactNode; id?: string
}) {
  return (
    <section id={id} data-booking className="px-(--gutter) py-(--section-y)">
      {top && <div className="mx-auto mb-16 max-w-(--container) text-center md:mb-20">{top}</div>}
      <div className="mx-auto grid max-w-(--container) gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          {heading}
          <p className={`type-body max-w-[44ch] text-(--color-muted) [font-size:clamp(1.0625rem,1.3vw,1.1875rem)] ${heading ? 'mt-8' : ''}`}>{text}</p>
          <p className="type-body mt-4 max-w-[44ch] text-(--color-muted)">{groups}</p>
          <h3 className="type-utility mt-10 text-(--color-muted)">{hoursLabel}</h3>
          <ul className="type-body mt-3 space-y-1">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
          <p className="type-body mt-8">
            {call}{' '}
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="type-heading link-hum ml-1 inline-block [font-size:clamp(1.3rem,1.8vw,1.6rem)]">{phoneDisplay ?? phone}</a>
          </p>
          {extra}
        </div>
        <div className="rounded-(--radius-card) bg-(--color-surface) p-6 sm:p-8 md:p-10 lg:col-span-6 lg:col-start-7 lg:self-start">{form}</div>
      </div>
    </section>
  )
}
