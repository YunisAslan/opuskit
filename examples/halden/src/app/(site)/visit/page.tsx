import type { Metadata } from 'next'
import { BookingForm } from '@/components/forms/BookingForm'
import { FaqSection } from '@/components/sections/Faq'
import { LocationSection } from '@/components/sections/Location'
import { ReservationSection } from '@/components/sections/Reservation'
import { brand, faq, location, reservation } from '@/content/site'

export const metadata: Metadata = { title: 'Visit', description: reservation.pageLine }

// Visit: Reservation → Location → FAQ. Its moment is the way in, full screen, after the form.
export default function Visit() {
  return (
    <>
      <ReservationSection
        id="reserve" intro={{ title: reservation.pageTitle, line: reservation.pageLine }}
        title={reservation.title} text={reservation.text} hours={reservation.hours} phone={brand.phone} phoneLead={reservation.phoneLead}
        form={<BookingForm />}
      />
      <LocationSection
        title={location.title} address={brand.address} hours={location.hours} notes={location.notes} mapUrl={brand.mapUrl} phone={brand.phone}
        image="locationVisitArrival" alt={location.arrivalAlt} inside="locationVisitInside" insideAlt={location.insideAlt} labels={{ map: location.map, call: location.call }}
      />
      <FaqSection title={faq.title} items={faq.items} />
    </>
  )
}
