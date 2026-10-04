import type { Metadata } from 'next'
import { FaqSection } from '@/components/sections/Faq'
import { HelpFaq } from '@/components/site/HelpFaq'
import { PageHeader } from '@/components/site/PageHeader'
import { Stop } from '@/components/site/Stop'
import { delivery, productFaq } from '@/data/shop'

export const metadata: Metadata = { title: 'Help', description: 'Delivery, returns, ingredients and when orders open. If your question is not here, write to hello@qum.az.' }

const help = [
  ...productFaq.slice(0, 1),
  { id: 'delivery', q: 'How much is delivery, and how long does it take?', a: `${delivery} You can also collect from the lab in Mardakan on a Saturday, for free.` },
  { id: 'returns', q: 'What if it does not suit me?', a: 'Unopened, within 30 days, for a full refund; we pay the courier. Opened and it did not suit you? Write to us anyway. We would rather know, and we will usually find a way to help.' },
  ...productFaq.slice(1, 5),
  { q: 'Can I visit the lab?', a: 'Yes, on Saturdays between 10:00 and 14:00, and on weekdays if you write first. The lab is in Mardakan, near the fortress, about forty minutes from central Baku.' },
  { q: 'Do you sell to shops and hotels?', a: 'Not yet. With batches of 300 we can only just keep up with ourselves. Write to us and we will tell you when that changes.' },
  { id: 'privacy', q: 'What do you do with my email and address?', a: 'We use them to send what you asked for: your order, and the letter if you signed up for it. We never sell or share them, and you can ask us to delete them at any time.' },
  { id: 'terms', q: 'What are your terms of sale?', a: 'Prices are in manat and include VAT. An order is confirmed when we email you; we ship within two working days. Full terms will be published here when orders open in spring.' },
]

export default function Help() {
  return (
    <>
      <PageHeader title="Questions, answered" line="What people ask us most. If yours is not here, write to hello@qum.az; one of the three of us will answer, usually the same day." />
      <Stop id="questions" name="Questions">
        <div className="[&>section]:pt-12"><FaqSection title="Search, or browse them all"><HelpFaq items={help} /></FaqSection></div>
      </Stop>
    </>
  )
}
