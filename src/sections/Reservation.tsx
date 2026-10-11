// OpusKit section — Reservation: a short invitation, the practical facts, and the booking form. The form is the
// project's own, built from shadcn/ui (a Calendar in a Popover for the day, Selects for time and party size) and passed in
// as `form`; it hands off to the booking link or email with the details filled in — no fake confirmation. This section
// only lays it out, so no plain browser date, time or number input ships. Three designs:
//   side     — the invitation and facts on the left, the form on a card beside them.
//   centered — the invitation centred over the form; the hours and phone in one line under it.
//   ledger   — the title large; the facts as a ruled ledger (Hours, Call us) on the left, the form open on the right.
import type { ReactNode } from 'react'

export function ReservationSection({ tone, variant = 'side', title, text, hours, phone, form }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'side' | 'centered' | 'ledger'; title: string; text: string; hours: string[]; phone: string; form: ReactNode }) {
  const t = tone === 'ground' ? undefined : tone
  const tel = <a href={`tel:${phone.replace(/\s/g, '')}`} className="underline underline-offset-4">{phone}</a>
  if (variant === 'centered') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="type-heading text-balance">{title}</h2>
        <p className="type-body mx-auto mt-4 max-w-[46ch] text-(--color-muted)">{text}</p>
        <div className="mt-10 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-6 text-left shadow-(--shadow-card)">{form}</div>
        <p className="type-utility mt-6 text-(--color-muted)">{hours.join(', ')}. Rather call? {tel}</p>
      </div>
    </section>
  )
  if (variant === 'ledger') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-display text-balance [font-size:clamp(2.4rem,6vw,5.5rem)] leading-[0.95]">{title}</h2>
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="type-body max-w-[46ch] text-(--color-muted)">{text}</p>
            <dl className="type-body mt-8 border-t border-(--color-text)">
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-(--color-border) py-4"><dt className="type-utility text-(--color-muted)">Hours</dt><dd><ul className="space-y-1">{hours.map((h) => <li key={h}>{h}</li>)}</ul></dd></div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-(--color-border) py-4"><dt className="type-utility text-(--color-muted)">Call us</dt><dd>{tel}</dd></div>
            </dl>
          </div>
          <div className="md:col-span-6 md:col-start-7">{form}</div>
        </div>
      </div>
    </section>
  )
  return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="type-heading">{title}</h2>
          <p className="type-body mt-4 text-(--color-muted)">{text}</p>
          <ul className="type-body mt-6 space-y-1">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
          <p className="type-body mt-4">Rather call? {tel}</p>
        </div>
        <div className="rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-card) md:col-span-6 md:col-start-7 md:self-start">{form}</div>
      </div>
    </section>
  )
}
