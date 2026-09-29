'use client'
// OpusKit section — Reservation: a short invitation, the practical facts, and a booking form that hands off to
// your booking link (or email) with the details filled in — no fake confirmation.
import { useState } from 'react'

export function ReservationSection({ title, text, hours, phone, bookingUrl }: { title: string; text: string; hours: string[]; phone: string; bookingUrl: string }) {
  const [f, setF] = useState({ date: '', time: '19:00', guests: '2' })
  const go = (e: React.FormEvent) => { e.preventDefault(); window.location.href = `${bookingUrl}${bookingUrl.includes('?') ? '&' : '?'}${new URLSearchParams(f)}` }
  const field = 'type-body mt-1 w-full rounded-(--radius-button) border border-(--color-border) bg-(--color-surface) px-3 py-2.5'
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="type-heading">{title}</h2>
          <p className="type-body mt-4 text-(--color-muted)">{text}</p>
          <ul className="type-body mt-6 space-y-1">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
          <p className="type-body mt-4">Larger groups: <a href={`tel:${phone.replace(/\s/g, '')}`} className="underline underline-offset-4">{phone}</a></p>
        </div>
        <form onSubmit={go} className="grid gap-4 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-card) sm:grid-cols-3 md:col-span-6 md:col-start-7 md:self-start">
          <label className="type-utility">Date<input required type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} className={field} /></label>
          <label className="type-utility">Time<input required type="time" value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })} className={field} /></label>
          <label className="type-utility">Guests<input required type="number" min={1} max={12} value={f.guests} onChange={(e) => setF({ ...f, guests: e.target.value })} className={field} /></label>
          <button type="submit" className="type-body rounded-(--radius-button) bg-(--color-primary) px-5 py-3 text-(--color-background) sm:col-span-3">Find a table</button>
        </form>
      </div>
    </section>
  )
}
