import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = { title: 'Privacy policy' }

export default function PrivacyPage() {
  return (
    <LegalPage
      title={['Privacy', 'policy']}
      updated="28 September 2026"
      intro="We collect what we need to send you cans and nothing more. We do not sell your data, and we do not use advertising trackers."
      sections={[
        { h: 'Who we are', p: ['Keepers Drinks Ltd., Unit 4, 22 Hackney Wick Road, London E9 5ES, is the controller of your personal data. Contact us at hello@keepersdrinks.com.'] },
        { h: 'What we collect', p: ['Your name, email address, delivery address and order history when you create an account or place an order. Payment details are handled by our payment provider and never reach our servers.', 'If you email us, we keep the conversation so we can follow up.'] },
        { h: 'Why we use it', p: ['To take and deliver orders, to run your subscription, to answer questions and to meet our tax and accounting duties. Our legal basis is the contract with you and, for accounts, our legal obligations.', 'We send marketing emails only if you opt in, and every email has a one-click unsubscribe.'] },
        { h: 'Who we share it with', p: ['Our payment provider, our courier and our email service, each under a data processing agreement. Data may be processed in the UK and EU only.'] },
        { h: 'How long we keep it', p: ['Order records for six years, as UK tax law requires. Account data until you close your account, then 30 days.'] },
        { h: 'Your rights', p: ['You can ask to see, correct, export or delete your data, or object to how we use it. Email hello@keepersdrinks.com and we will reply within 30 days. You can also complain to the ICO in the UK or your local data protection authority in the EU.'] },
      ]}
    />
  )
}
