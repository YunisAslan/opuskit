import type { Metadata } from 'next'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FaqSection } from '@/components/sections/Faq'
import { Chapter } from '@/components/site/Chapter'
import { FaqExplorer } from '@/components/site/FaqExplorer'
import { PageHead } from '@/components/site/PageHead'
import { ScrambleLink } from '@/components/site/ScrambleLink'
import { cohorts, faqs, site } from '@/content/site'
import { longDate, shortDate } from '@/lib/status'

export const metadata: Metadata = { title: 'FAQ', description: 'Software, hardware, time, footage, refunds and instalments: the questions people ask before joining Night Shift.' }
const next = cohorts.find((c) => c.seatsLeft > 0) ?? cohorts[0]
const count = faqs.start.length + faqs.course.length + faqs.money.length

export default function Faq() {
  return (
    <>
      <PageHead label="FAQ" title="Questions, answered" lead={`${count} answers to what people ask before they join. If yours isn’t here, write to ${site.email}; I answer within a working day.`} />

      <Chapter n="01" name="Search">
        <FaqSection title="Search the questions">
          <FaqExplorer groups={[{ title: 'Before you enrol', items: faqs.start }, { title: 'The course', items: faqs.course }, { title: 'Money', items: faqs.money }]} />
        </FaqSection>
      </Chapter>

      <Chapter n="02" name="Enrol">
        <ContactCtaSection link={ScrambleLink} headline="Still deciding? Ask me." quiet={`Cohort ${next.n} starts ${longDate(next.start)}.`}
          action={{ label: 'Reserve a seat', href: '#enrol' }} meta={`${site.price}, starts ${shortDate(next.start)}`} email={site.email} />
      </Chapter>
    </>
  )
}
