import { PageHead } from '@/components/PageHead'
import { QuestionForm } from '@/components/QuestionForm'
import { SiteLink } from '@/components/SiteLink'
import { Stops } from '@/components/Stops'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FaqSection } from '@/components/sections/Faq'
import { site } from '@/config/site'
import { allFaq } from '@/content'

export const metadata = { title: 'FAQ', description: 'Referrals, what to wear, how many sessions, insurance, cancelling and access at Hane.' }

export default function Faq() {
  return (
    <Stops items={[
      { name: 'Questions', still: true, node: <PageHead title={['Questions,', 'answered plainly']}
        lead="What people ask us most before a first visit. Search them, or open any one below." /> },
      { name: 'Before you come', node: <FaqSection title="Before you come" items={allFaq} search /> },
      { name: 'Still unsure', node: (
        <ContactCtaSection link={SiteLink} headline="Still unsure?" quiet="Ask us. We answer every message within a working day." action={site.book} email={site.email}>
          <QuestionForm />
        </ContactCtaSection>
      ) },
    ]} />
  )
}
