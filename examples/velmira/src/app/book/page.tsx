import type { Metadata } from 'next'
import { assets } from '@/config/assets'
import { reservation, stayFaq, ADDRESS, MAP_URL, PHONE } from '@/content'
import { BookingForm } from '@/components/site/BookingForm'
import { FaqList } from '@/components/site/FaqList'
import { ReservationSection } from '@/components/sections/Reservation'
import { LocationSection } from '@/components/sections/Location'
import { FaqSection } from '@/components/sections/Faq'

export const metadata: Metadata = { title: 'Book a stay', description: 'Choose your nights and send a request: we reply within a day with the rooms that are free.' }

export default function Book() {
  return (
    <>
      <ReservationSection as="h1" reveal={false} title="Book a stay" text={reservation.text} hours={reservation.hours} phone={PHONE} form={<BookingForm />} />
      <LocationSection
        title="Where we are"
        address={ADDRESS}
        hours={['Front desk 8 am to 10 pm', 'Arrivals until midnight, by arrangement']}
        notes="Three and a half hours from Baku by road, twenty-five minutes from Gabala airport."
        mapUrl={MAP_URL}
        phone={PHONE}
        image={assets.arrival.src}
        alt={assets.arrival.alt}
      />
      <FaqSection title="Before you book"><FaqList items={stayFaq} /></FaqSection>
    </>
  )
}
