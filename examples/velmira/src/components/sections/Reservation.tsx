// OpusKit section — Reservation: a short invitation, the practical facts, and the booking form beside them. The form is
// the project's own, built from shadcn/ui (a Calendar in a Popover for the day, Selects for time and party size) and passed
// in as `form`; it hands off to the booking link or email with the details filled in — no fake confirmation. This section
// only lays it out, so no plain browser date, time or number input ships.
import type { ReactNode } from 'react'
import { Chapter } from '@/components/site/Motif'

export function ReservationSection({ title, text, hours, phone, form, as: H = 'h2', id = 'stay', reveal = true }: {
  title: string; text: string; hours: string[]; phone: string; form: ReactNode; as?: 'h1' | 'h2'; id?: string
  /** false on a page's first screen: it is shown complete, not animated. */ reveal?: boolean
}) {
  return (
    <section id={id} data-reveal={reveal ? '' : undefined} className={`glow py-32 md:py-40 ${H === 'h1' ? 'pt-40 md:pt-48' : ''}`}>
      <div className="shell grid gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <Chapter><H data-rise className={H === 'h1' ? 'type-display [font-size:clamp(3rem,6vw,5.5rem)]' : 'type-heading'}>{title}</H></Chapter>
          <p data-rise style={{ '--i': 1 } as React.CSSProperties} className="type-body mt-6 max-w-[44ch] text-(--color-muted)">{text}</p>
          <ul data-rise style={{ '--i': 2 } as React.CSSProperties} className="type-body mt-8 space-y-2 border-t border-(--color-border) pt-6">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
          <p data-rise style={{ '--i': 3 } as React.CSSProperties} className="type-body mt-6">Rather call? <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex min-h-11 items-center underline underline-offset-4">{phone}</a></p>
        </div>
        <div data-rise style={{ '--i': 2 } as React.CSSProperties} className="rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-card) md:col-span-6 md:col-start-7 md:self-start md:p-10">{form}</div>
      </div>
    </section>
  )
}
