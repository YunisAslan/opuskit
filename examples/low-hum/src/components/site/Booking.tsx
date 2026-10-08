'use client'
// The reservation part as it appears on every page. `pressed` turns on the Reservations page's record moment.
import { useCallback, useState, type ReactNode } from 'react'
import { ReservationSection } from '@/components/sections/Reservation'
import { BookingForm, type BookingDraft } from './BookingForm'
import { PressedRecord } from './PressedRecord'
import { brand, hours, reservation } from '@/content/site'

export function Booking({ heading, top, record = false }: { heading?: ReactNode; top?: ReactNode; record?: boolean }) {
  const [draft, setDraft] = useState<BookingDraft>({})
  const [pressed, setPressed] = useState(false)
  const onDraft = useCallback((d: BookingDraft) => { setDraft({ ...d }); setPressed(false) }, [])
  const onSent = useCallback(() => setPressed(true), [])

  return (
    <ReservationSection
      heading={heading}
      top={top}
      text={reservation.text}
      groups={reservation.groups}
      hours={hours}
      hoursLabel={reservation.hoursLabel}
      phone={brand.phone}
      phoneDisplay={brand.phoneDisplay}
      call={reservation.call}
      extra={record ? (
        <div className="mt-14 hidden lg:block">
          <PressedRecord draft={draft} pressed={pressed} />
          <p className="type-caption mt-4 text-center text-(--color-muted)">{reservation.label.empty}</p>
        </div>
      ) : undefined}
      form={
        <BookingForm
          onDraft={record ? onDraft : undefined}
          onSent={record ? onSent : undefined}
          beforeSubmit={record ? <div className="overflow-hidden py-2 lg:hidden"><PressedRecord draft={draft} pressed={pressed} compact /></div> : undefined}
        />
      }
    />
  )
}
