import type { Metadata } from 'next'
import { EnquiryForm } from '@/components/EnquiryForm'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { LocationSection } from '@/components/sections/Location'
import { contact, studio } from '@/content/site'

export const metadata: Metadata = { title: 'Contact', description: 'Tell Fieldhouse about your barn, or visit the studio in Herefordshire.' }

// Contact: Closing CTA (with the enquiry form) → Location.
export default function Contact() {
  return (
    <>
      <ContactCtaSection id="write" h1 headline={contact.headline} quiet={contact.quiet} email={studio.email} phone={studio.phone} address={studio.address}>
        <EnquiryForm />
      </ContactCtaSection>
      <LocationSection id="visit" title={contact.visit.title} address={studio.address} hours={contact.visit.hours} notes={contact.visit.notes} mapUrl={studio.mapUrl} image="location1" image2="location2" />
    </>
  )
}
