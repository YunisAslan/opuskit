import { Check } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PageIntro } from '@/components/ui'
import { formatPrice, freeIncludes, products } from '@/config/pricing'

export const metadata: Metadata = { title: 'Pricing', description: 'Explore for free. Pay once for a complete recipe and build package. No subscription.' }

export default function PricingPage() {
  return (
    <>
      <PageIntro title="Pay once. Keep it.">Explore and preview for free. When a recipe is right, buy it once — the full design system, assets plan and Build Packages for every AI tool.</PageIntro>
      <div className="mx-auto grid max-w-[1440px] gap-6 px-5 pb-24 md:grid-cols-3 md:px-8">
        <Plan name="Free" price="$0" line="See how OpusKit thinks." items={freeIncludes} cta={<Link href="/create" className="btn btn-line w-full">Create a recipe preview</Link>} />
        {products.map((p) => (
          <Plan key={p.id} name={p.name} price={formatPrice(p)} line={p.line} items={p.includes} featured={p.id === 'recipe'}
            cta={<Link href="/explore" className={`btn w-full ${p.id === 'recipe' ? 'btn-ink' : 'btn-line'}`}>{p.id === 'recipe' ? 'Choose a recipe' : 'Browse the library'}</Link>} />
        ))}
        <p className="text-sm text-muted md:col-span-3">One-time purchases, no subscription. Checkout is in test mode — purchases unlock instantly and nothing is charged.</p>
      </div>
    </>
  )
}

function Plan({ name, price, line, items, cta, featured }: { name: string; price: string; line: string; items: string[]; cta: React.ReactNode; featured?: boolean }) {
  return (
    <div className={`flex flex-col rounded-xl border bg-white p-6 md:p-8 ${featured ? 'border-ink' : 'border-line'}`}>
      <p className="text-lg font-medium">{name}</p>
      <p className="display mt-3 text-5xl">{price}</p>
      <p className="mt-2 text-ink-2">{line}</p>
      <ul className="mt-6 flex-1 space-y-2 text-sm">{items.map((i) => <li key={i} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-ink-2" aria-hidden />{i}</li>)}</ul>
      <div className="mt-8">{cta}</div>
    </div>
  )
}
