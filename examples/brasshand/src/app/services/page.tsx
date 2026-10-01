import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FaqSection } from '@/components/sections/Faq'
import { PricingSection } from '@/components/sections/Pricing'
import { ProcessSection } from '@/components/sections/Process'
import { ServicesSection } from '@/components/sections/Services'
import { Chapter } from '@/components/site/Chapter'
import { MagneticLink } from '@/components/site/links'
import { Reveal } from '@/components/site/Reveal'
import { contact, plans, process, services, servicesFaq } from '@/content/site'

export const metadata: Metadata = { title: 'Services', description: 'Naming, identity, campaigns, packaging, menus and wayfinding from Brasshand in Baku, with fixed prices and a four-step process.' }

export default function Services() {
  return (
    <>
      <Chapter word="Services" h1 />
      <Reveal><ServicesSection title="Six things we do well" items={services} /></Reveal>

      <Chapter word="Process" />
      <Reveal><ProcessSection title="How a project goes" steps={process} /></Reveal>

      <Chapter word="Pricing" />
      <Reveal>
        <PricingSection link={Link} title="What it costs" plans={plans}
          note="Prices without VAT. Bigger projects get a proper quote after one conversation." />
      </Reveal>
      <Reveal><FaqSection title="Fair questions" items={servicesFaq} /></Reveal>

      <ContactCtaSection link={MagneticLink} headline="Got a brief?" quiet="Or half of one?"
        action={{ label: 'Start a project', href: '/contact' }} email={contact.email} />
    </>
  )
}
