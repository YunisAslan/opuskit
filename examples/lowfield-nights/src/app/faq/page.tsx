import type { Metadata } from 'next'
import Link from 'next/link'
import { FaqSection } from '@/components/sections/Faq'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FaqExplorer } from '@/components/site/Faqs'
import { Opener } from '@/components/site/Opener'
import { QuestionForm } from '@/components/site/QuestionForm'
import { Stop } from '@/components/site/Stop'
import { contactEmail, faqSets } from '@/content/site'

export const metadata: Metadata = { title: 'FAQ', description: 'Is it free, how do I get there, will it be cold: the questions people ask before Lowfield Nights.' }

export default function Faq() {
  return (
    <>
      <Stop id="questions" name="Questions at the gate" film>
        <Opener
          title="Questions at the gate"
          lead="The nine things people ask before they come. Search them, or open any one."
          card={{ name: 'Most asked', text: 'Is it free? Yes. The RSVP only holds your seat.', link: { label: 'RSVP', href: '/rsvp' } }}
        />
        <div className="bg-(--color-background)/85">
          <FaqSection title="All questions">
            <FaqExplorer items={faqSets.all} />
          </FaqSection>
        </div>
      </Stop>

      <Stop id="ask-us" name="Ask us">
        <ContactCtaSection link={Link} headline="Still wondering?" quiet="Write to the people who run it." action={{ label: 'RSVP for a night', href: '/rsvp' }} email={contactEmail} />
        <div className="px-5 pb-24 md:px-10 md:pb-40">
          <div className="mx-auto max-w-[1440px] border-t border-(--color-border) pt-12">
            <QuestionForm />
          </div>
        </div>
      </Stop>
    </>
  )
}
