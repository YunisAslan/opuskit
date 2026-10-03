import { PageHead } from '@/components/PageHead'
import { Prices } from '@/components/Prices'
import { Stops } from '@/components/Stops'
import { FaqSection } from '@/components/sections/Faq'
import { ProcessSection } from '@/components/sections/Process'
import { ServicesSection } from '@/components/sections/Services'
import { faq, services } from '@/content'

export const metadata = { title: 'Treatments', description: 'Hands-on physiotherapy and one-to-one slow-movement sessions at Hane, with prices and what a course looks like.' }

export default function Treatments() {
  return (
    <Stops items={[
      { name: 'The treatment room', still: true, node: <PageHead title={['Treatment,', 'then the mat']} media="step2" caption="Room 2, a shoulder treatment"
        lead="Every course at Hane has two halves: hands-on work in the room, and a few slow exercises you take home. The first makes things easier; the second keeps them that way." /> },
      { name: 'What we treat', node: <ServicesSection title="What we treat" items={services} /> },
      { name: 'Six weeks', node: <ProcessSection title="How a course goes" steps={[
        { name: 'First visit', text: 'We take your history, watch how you move and test what hurts. You leave with a plan in plain words.', duration: '60 minutes' },
        { name: 'Treatment', text: 'Hands-on work on the problem, then we check your exercises together so they are done right.', duration: '45 minutes, weekly at first' },
        { name: 'At home', text: 'Ten minutes a day from your home programme. We change it at each visit as things get easier.', duration: '10 minutes a day' },
        { name: 'Check-in', text: 'We retest, look back at the plan and decide together whether you still need us.', duration: '30 minutes, after about six weeks' },
      ]} /> },
      { name: 'Prices', node: <Prices /> },
      { name: 'Before you come', node: <FaqSection title="Before you come" items={[faq.referral, faq.sessions, faq.insurance, faq.surgery]} /> },
    ]} />
  )
}
