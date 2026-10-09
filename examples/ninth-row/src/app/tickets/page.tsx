import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { ReservationSection } from '@/components/sections/Reservation'
import { PricingSection } from '@/components/sections/Pricing'
import { FaqSection } from '@/components/sections/Faq'
import { BookingForm } from '@/components/tickets/BookingForm'
import { StickyBook } from '@/components/tickets/StickyBook'
import { pricing, reservation, ticketsFaq } from '@/content/tickets'
import { site } from '@/content/site'

export const metadata: Metadata = { title: 'Tickets', description: 'Tickets for every screening at Ninth Row. Choose a night, a film and a seat.' }

export default function Tickets() {
  return (
    <>
      <ReservationSection
        id="book"
        titleLines={['Take', 'a seat']}
        text={reservation.text}
        hours={reservation.hours}
        group={reservation.group}
        phoneLead={reservation.phoneLead}
        phone={site.phone}
        form={<Suspense fallback={<div className="skeleton h-[40rem]" />}><BookingForm /></Suspense>}
      />
      <PricingSection id="prices" link={Link} title={pricing.title} note={pricing.note} plans={pricing.plans} recommendedLabel={pricing.recommended} action={pricing.action} href="#book" />
      <FaqSection id="questions" title={ticketsFaq.title} items={ticketsFaq.items} />
      <StickyBook target="book" label={reservation.stickyAction} />
    </>
  )
}
