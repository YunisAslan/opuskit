import type { Metadata } from 'next'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { LocationSection } from '@/components/sections/Location'
import { ScheduleSection } from '@/components/sections/Schedule'
import { asset } from '@/config/assets'
import { contact, site } from '@/content/site'

export const metadata: Metadata = { title: 'Contact', description: 'When we are on the quay, how to reach us, and how to find the boathouse.' }

export default function Contact() {
  return (
    <>
      <ScheduleSection title={['A week', 'on the coast']} intro={contact.schedule.intro} days={contact.schedule.days} />
      <ContactCtaSection
        headline={['Come down', 'to the water']}
        quiet={contact.cta.quiet}
        action={contact.cta.action}
        email={site.email}
        phone={site.phone}
        address={site.addressLine}
      />
      <LocationSection
        title={contact.location.title}
        address={site.address}
        hours={contact.location.hours}
        notes={contact.location.notes}
        mapUrl={contact.location.mapUrl}
        phone={site.phone}
        alt={asset('location').alt}
        caption={contact.location.caption}
      />
    </>
  )
}
