import type { Metadata } from 'next'
import { FaqSection } from '@/components/sections/Faq'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { StatusLine } from '@/components/chrome/StatusLine'
import { Chapter } from '@/components/site/Chapter'
import { CohortCalendar } from '@/components/site/CohortCalendar'
import { FaqList } from '@/components/site/FaqList'
import { PageHead } from '@/components/site/PageHead'
import { PricingBlock } from '@/components/site/PricingBlock'
import { assets } from '@/config/assets'
import { cohorts, faqs, quotes, site } from '@/content/site'
import { longDate, shortDate, statusAt, statusText } from '@/lib/status'

export const metadata: Metadata = { title: 'Enrol', description: 'Prices, instalments and the calendar of every session for the next three cohorts of Night Shift.' }
const next = cohorts.find((c) => c.seatsLeft > 0) ?? cohorts[0]

export default function Enrol() {
  return (
    <>
      <PageHead label="Enrol" title={<>Cohort {next.n} starts <br className="max-md:hidden" /><span className="md:hidden">{shortDate(next.start).slice(4)}</span><span className="max-md:hidden">{longDate(next.start)}</span></>}
        lead="Twelve seats, sixteen live evenings, one price. Nothing is charged until I confirm your seat by email.">
        <div className="mt-8 border-t border-(--color-border) pt-4">
          <StatusLine menu={false} fallback={[statusText(statusAt(new Date(), cohorts, site.seatsPerCohort)), statusText(statusAt(new Date(), cohorts, site.seatsPerCohort), true)]} className="text-[1rem] text-(--color-text)" />
        </div>
      </PageHead>

      <Chapter n="01" name="Price" grid>
        <PricingBlock title="Choose how you join"><CohortCalendar /></PricingBlock>
      </Chapter>

      <Chapter n="02" name="Questions">
        <FaqSection title="Money and commitment"><FaqList items={faqs.money} /></FaqSection>
      </Chapter>

      <Chapter n="03" name="Students">
        <TestimonialsSection title="On the time and the money" quotes={quotes.enrol.map((q) => ({ ...q, ...(q.image ? { image: assets[q.image].src, alt: assets[q.image].alt } : {}) }))} />
      </Chapter>
    </>
  )
}
