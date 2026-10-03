import { BookingForm } from '@/components/BookingForm'
import { MediaAsset } from '@/components/MediaAsset'
import { PageHead } from '@/components/PageHead'
import { StatusLine } from '@/components/StatusLine'
import { Stops } from '@/components/Stops'
import { FaqSection } from '@/components/sections/Faq'
import { LocationSection } from '@/components/sections/Location'
import { ReservationSection } from '@/components/sections/Reservation'
import { site } from '@/config/site'
import { faq, reservation } from '@/content'
import { HOURS_LINES } from '@/lib/hours'

export const metadata = { title: 'Book an appointment', description: 'Book a first visit, a treatment or a slow-movement session at Hane, or call us.' }

export default function Book() {
  return (
    <Stops items={[
      { name: 'The front desk', still: true, node: <PageHead title={['Book an', 'appointment']}
        lead="Not sure which to choose? Book a first visit: everyone starts there, and we work out the rest together." /> },
      { name: 'Your time', node: <ReservationSection title={reservation.title} text={reservation.text} hours={HOURS_LINES} phone={site.phone} tel={site.tel} status={<StatusLine />} form={<BookingForm />} /> },
      { name: 'The way in', node: <LocationSection title="Finding us" address={site.address} hours={HOURS_LINES} notes={site.transit} mapUrl={site.mapUrl} phone={site.phone} tel={site.tel} media={<MediaAsset id="location" sizes="(min-width: 768px) 58vw, 100vw" />} /> },
      { name: 'Before you come', node: <FaqSection title="Before you come" items={[faq.wear, faq.cancel, faq.access, faq.referral]} /> },
    ]} />
  )
}
