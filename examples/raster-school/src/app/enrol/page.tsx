import type { Metadata } from 'next'
import Link from 'next/link'
import { PricingSection } from '@/components/sections/Pricing'
import { FaqSection } from '@/components/sections/Faq'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { SeatMap } from '@/components/site/SeatMap'
import { SectionHead } from '@/components/site/SectionHead'
import { pricing } from '@/content/course'
import { faqsFor, quotes, site } from '@/content/site'

export const metadata: Metadata = { title: 'Enrol', description: 'Twelve seats a cohort. Fees, dates and the seats still free in the next cohorts.' }

export default function EnrolPage() {
  return (
    <>
      <PricingSection
        variant="cards"
        title={pricing.title}
        plans={pricing.plans}
        note={pricing.note}
        preview={{ label: pricing.preview, href: `mailto:${site.email}?subject=${encodeURIComponent('Free preview lesson')}` }}
        head={
          <div className="pt-[calc(var(--nav-top)+var(--nav-h)+clamp(24px,5vw,72px))]">
            <SeatMap />
            <SectionHead title={pricing.title} className="mt-(--section-y)" />
          </div>
        }
      />
      <FaqSection title="Applying and paying" items={faqsFor(['Applying and paying'])} more={{ label: 'All questions', href: '/faq' }} link={Link} />
      <TestimonialsSection variant="single" tone="surface" title="What students say" quotes={[quotes[1]]} />
    </>
  )
}
