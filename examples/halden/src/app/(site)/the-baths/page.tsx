import type { Metadata } from 'next'
import { FaqSection } from '@/components/sections/Faq'
import { PricingSection } from '@/components/sections/Pricing'
import { ServicesSection } from '@/components/sections/Services'
import { StepsSection } from '@/components/sections/Steps'
import { faq, pricing, process, services } from '@/content/site'

export const metadata: Metadata = { title: 'The baths', description: services.pageLine }

// The baths: Services → Process → Pricing → FAQ. Its moment is the round: the pinned sequence of the four steps.
export default function TheBaths() {
  return (
    <>
      <ServicesSection intro={{ title: services.pageTitle, line: services.pageLine }} title={services.title} items={services.items} />
      <StepsSection variant="columns" title={process.title} steps={process.steps} />
      <PricingSection title={pricing.title} plans={pricing.plans} note={pricing.note} recommended={pricing.recommended} />
      <FaqSection title={faq.title} items={faq.items} />
    </>
  )
}
