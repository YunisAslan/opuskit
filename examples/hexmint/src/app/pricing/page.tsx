import type { Metadata } from 'next'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FaqSection } from '@/components/sections/Faq'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { PricingPlans } from '@/components/site/PricingPlans'
import { SiteLink, START } from '@/components/site/SiteLink'
import { brand, faqPricing, quotes } from '@/content/site'

export const metadata: Metadata = { title: 'Pricing', description: 'Three plans priced per studio, not per seat. 30 days free on any plan, no card needed.' }

export default function Pricing() {
  return (
    <>
      <PricingPlans />
      <FaqSection label="// 02 Questions" title="Pricing questions" items={faqPricing} />
      <TestimonialsSection title="// 03 From the studios" quotes={quotes} />
      <ContactCtaSection link={SiteLink} label="// 04 Start" headline="Start free, choose later." quiet="No card needed for 30 days." action={{ label: 'Start free', href: START }} email={brand.email} />
    </>
  )
}
