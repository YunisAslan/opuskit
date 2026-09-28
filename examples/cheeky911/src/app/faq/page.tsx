import type { Metadata } from 'next'
import SectionHeader from '@/components/SectionHeader'

export const metadata: Metadata = { title: 'FAQ' }

const faqs = [
  ['Are the cars really for sale?', 'Yes. Every car in a collection is for sale unless it is marked Sold. Reserved means someone has paid a holding deposit and has seven days to decide.'],
  ['Can I see a car before I buy it?', 'Always. Viewings are by appointment at the garage where the car was filmed. Idris will be there, and you can drive it with him in the passenger seat.'],
  ['What does the inspection cover?', 'A full mechanical check, a paint depth reading on every panel, a look under the car on a lift, and at least three hundred kilometres of driving. The report comes with the car.'],
  ['Do you deliver outside the country?', 'We arrange enclosed transport across Europe and can help with shipping further. Costs are quoted per car, before you commit.'],
  ['Why are some photographs so dark?', 'Because that is how the cars looked when we found them. We never retouch paint, wheels or damage. What you see is what arrives.'],
  ['Do you buy cars?', 'Sometimes. If you own a 911 that belongs in a collection, write to us with a few honest photographs and its history.'],
] as const

export default function Faq() {
  return (
    <section aria-labelledby="faq" className="mx-auto max-w-[800px] px-6 pb-40 pt-40 md:pt-48">
      <SectionHeader as="h1" display label="Questions" lines={[['Before you', 'stretch-mid'], ['ask', 'stretch-wide']]} />
      <div className="mt-16 border-t border-border">
        {faqs.map(([q, a]) => (
          <details key={q} className="border-b border-border">
            <summary className="flex min-h-11 items-center justify-between gap-6 py-6 font-heading text-xl font-bold leading-tight hover:text-muted">
              {q}
              <span aria-hidden className="faq-sign text-2xl font-normal">+</span>
            </summary>
            <p className="type-body max-w-[60ch] pb-8 text-muted">{a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
