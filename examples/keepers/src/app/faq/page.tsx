import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'

export const metadata: Metadata = { title: 'FAQ' }

const faqs = [
  { q: 'Does it taste more like coffee or soda?', a: 'Coffee first. The cold brew is the base, the orange peel sits on top and the bubbles keep it light. People who drink espresso tonic or iced americano tend to like it straight away.' },
  { q: 'How much caffeine is in a can?', a: '45 mg per 330 ml can, about half a double espresso. We test every batch and print the result on the base of the can next to the roast date.' },
  { q: 'Is it sweetened?', a: 'Lightly: 6 g of organic cane sugar per can, 35 kcal in total. There are no sweeteners, no flavourings and no preservatives.' },
  { q: 'How long does it keep?', a: 'Nine months unopened, stored cool and out of the sun. Once opened, drink it the same day. Keep it in the fridge before opening for the best carbonation.' },
  { q: 'When will my pre-order ship?', a: 'The first boxes leave our London unit on 3 November 2026. You are not charged until your box is packed, and you will get a tracking link the same day.' },
  { q: 'Where do you deliver?', a: 'The UK and all EU countries. Delivery is free on subscriptions and on orders over €30; otherwise it costs €4 in the UK and €7 in the EU.' },
  { q: 'Can I pause or cancel a subscription?', a: 'Yes, from your account, up to two days before your next box is packed. There is no minimum term and no cancellation fee.' },
]

export default function FaqPage() {
  return (
    <>
      <PageHeader title={['Questions,', 'answered.']} meta="Seven questions" intro="If yours is not here, email hello@keepersdrinks.com and a founder will answer within a working day." />
      <section aria-label="FAQ" className="container-text pb-32 md:pb-40">
        <div className="md:grid md:grid-cols-12 md:gap-6">
          <div data-reveal className="border-t-2 border-border md:col-span-8 md:col-start-4">
            {faqs.map((f) => (
              <details key={f.q} className="acc border-b border-border">
                <summary className="flex min-h-11 items-center justify-between gap-6 py-6">
                  <h2 className="type-heading text-2xl">{f.q}</h2>
                  <span aria-hidden="true" className="acc-mark type-heading text-4xl leading-none">+</span>
                </summary>
                <p className="type-body pb-6">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
