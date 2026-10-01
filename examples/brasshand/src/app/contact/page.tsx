import type { Metadata } from 'next'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FaqSection } from '@/components/sections/Faq'
import { LocationSection } from '@/components/sections/Location'
import { BriefForm } from '@/components/site/BriefForm'
import { Chapter } from '@/components/site/Chapter'
import { MagneticLink } from '@/components/site/links'
import { Reveal } from '@/components/site/Reveal'
import { contact, contactFaq } from '@/content/site'

export const metadata: Metadata = { title: 'Contact', description: 'Write to Brasshand at hello@brasshand.az, call the studio, or visit us on Rasul Rza street in Baku.' }

export default function Contact() {
  return (
    <>
      <Chapter word="Contact" h1 />
      <ContactCtaSection link={MagneticLink} headline="Say hello." quiet="Two days, tops."
        action={{ label: 'Write the brief', href: '#brief' }} email={contact.email} />
      <Reveal className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-24 md:grid-cols-12 md:px-8 md:pb-32">
        <h2 className="type-heading md:col-span-4">The short brief</h2>
        <div className="md:col-span-7 md:col-start-6"><BriefForm /></div>
      </Reveal>

      <Chapter word="Location" />
      <Reveal>
        <LocationSection title="The studio" address={contact.address} mapUrl={contact.mapUrl} phone={{ label: 'the studio', tel: contact.tel }}
          hours={['Monday to Friday, 10:00 to 18:00', 'Weekends by appointment']}
          notes="Five minutes on foot from Sahil metro. The door is next to the bakery." />
      </Reveal>
      <Reveal><FaqSection title="Before you write" items={contactFaq} /></Reveal>
    </>
  )
}
