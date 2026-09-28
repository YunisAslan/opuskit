import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = { title: 'Terms of service' }

export default function TermsPage() {
  return (
    <LegalPage
      title={['Terms of', 'service']}
      updated="28 September 2026"
      intro="These terms cover buying Keepers from this site and using your account. They are written to be read; if anything is unclear, ask us."
      sections={[
        { h: 'Orders', p: ['An order is accepted when we email a confirmation. Pre-orders are charged when your box is packed, not when you order. You must be 16 or older to buy a caffeinated drink from us.'] },
        { h: 'Prices and delivery', p: ['Prices include VAT. Delivery charges are shown before you pay. We aim to deliver within three working days in the UK and five in the EU after dispatch.'] },
        { h: 'Subscriptions', p: ['Subscriptions renew monthly. You can pause, skip or cancel from your account until two days before the next packing date, with no fee and no minimum term.'] },
        { h: 'Returns', p: ['Food and drink cannot be returned once opened. If a box arrives damaged or wrong, email us a photo within 14 days and we will replace or refund it.'] },
        { h: 'Your account', p: ['Keep your password to yourself. We may close accounts used for fraud or abuse, and will tell you why.'] },
        { h: 'Liability and law', p: ['Nothing here limits your statutory rights. These terms are governed by the law of England and Wales; EU customers keep the protection of their local consumer law.'] },
      ]}
    />
  )
}
