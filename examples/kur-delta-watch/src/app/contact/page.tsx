import type { Metadata } from 'next'
import Link from 'next/link'
import { Block } from '@/components/Block'
import { ContactForm } from '@/components/ContactForm'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { LocationSection } from '@/components/sections/Location'
import { assets } from '@/config/assets'
import { contact } from '@/content/site'

export const metadata: Metadata = { title: 'Contact', description: 'Write to Kür Delta Watch, or find us at the boat shed in Neftchala.' }

export default function Contact() {
  return (
    <>
      <ContactCtaSection as="h1" link={Link} headline="Write to us." quiet="Or just turn up on a Saturday." action={{ label: 'Send a message', href: '#message' }} email={contact.email}>
        <ContactForm />
      </ContactCtaSection>
      <Block id="visit">
        <LocationSection
          title="The boat shed"
          address={contact.address}
          hours={['Cleanups: Saturdays 08:00 to 13:00, April to November', 'Office: Tuesdays and Thursdays, 10:00 to 17:00']}
          notes="From Baku, take the Neftchala bus from the main bus station (about 2 hours 40 minutes). The shed is a ten-minute walk from the last stop, past the harbour."
          phone={contact.phone}
          mapUrl={contact.mapUrl}
          image={assets.boat2.src}
          alt={assets.boat2.alt}
        />
      </Block>
    </>
  )
}
