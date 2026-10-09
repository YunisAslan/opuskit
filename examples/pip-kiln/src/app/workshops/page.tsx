import type { Metadata } from 'next'
import { ServicesSection } from '@/components/sections/Services'
import { ScheduleSection } from '@/components/sections/Schedule'
import { GallerySection } from '@/components/sections/Gallery'
import { PricingSection } from '@/components/sections/Pricing'
import { ReservationSection } from '@/components/sections/Reservation'
import { FaqSection } from '@/components/sections/Faq'
import { BookingForm } from '@/components/workshops/BookingForm'
import { StickyBook } from '@/components/workshops/StickyBook'
import { workshops as w } from '@/content/workshops'
import { site } from '@/content/site'

export const metadata: Metadata = { title: 'Saturday workshops', description: 'Saturdays at the wheel: two potters, six wheels, and you leave with something you made.' }

export default function WorkshopsPage() {
  const photos = w.gallery.photos.map((p, i) => ({ index: i, caption: p.caption }))
  return (
    <>
      <ServicesSection intro={w.intro} title={w.services.title} items={w.services.items} />
      <ScheduleSection title={w.schedule.title} lines={w.schedule.lines} days={w.schedule.days} stages={w.schedule.stages} />
      <GallerySection title={w.gallery.title} lines={w.gallery.lines} hint={w.gallery.hint} view={w.gallery.view} viewLabel={w.gallery.viewLabel} photos={photos} />
      <PricingSection title={w.pricing.title} lines={w.pricing.lines} plans={w.pricing.plans} note={w.pricing.note} recommendedLabel={w.pricing.recommended} />
      <ReservationSection title={w.reservation.title} lines={w.reservation.lines} text={w.reservation.text} hours={w.reservation.hours} phone={site.phone} callPrompt={w.reservation.callPrompt} form={<BookingForm />} />
      <FaqSection title={w.faq.title} lines={['Nervous?', 'Don’t be.']} items={w.faq.items} />
      <StickyBook />
    </>
  )
}
