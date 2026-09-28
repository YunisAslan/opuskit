import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import { packs } from '@/config/product'

export const metadata: Metadata = { title: 'Pricing' }

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title={['€2.33 to €3', 'a can.']}
        mobile={['€2.33', 'to €3', 'a can.']}
        meta="Pre-order, ships 3 November"
        intro="Three ways to buy, one drink. You pay nothing until your first box ships, and a subscription can be paused or cancelled from your account at any time."
      />
      <section aria-label="Pricing" className="container-text pb-32 md:pb-40">
        <ul className="grid gap-6 md:grid-cols-3">
          {packs.map((p) => (
            <li
              key={p.name}
              className={`flex flex-col gap-4 border-2 border-border p-6 md:p-8 ${p.recommended ? 'order-first bg-surface md:order-none' : ''}`}
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                <h2 className="type-heading">{p.name}</h2>
                {p.recommended && <p className="type-utility bg-primary px-2 py-1 text-background">Most chosen</p>}
              </div>
              <p className="type-display text-[clamp(3.5rem,6vw,5rem)]">{p.price}</p>
              <p className="type-utility text-muted">{p.per}</p>
              <ul className="type-body flex flex-col gap-2 border-t border-border pt-4">
                {p.includes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <p className="type-body text-muted">{p.note}</p>
              <Link
                href={`/sign-up?plan=${encodeURIComponent(p.name)}`}
                className={`btn mt-auto w-full ${p.recommended ? 'btn-primary' : 'btn-secondary'}`}
              >
                Pre-order {p.name.toLowerCase()}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
