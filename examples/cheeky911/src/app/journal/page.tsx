import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader'

export const metadata: Metadata = { title: 'Journal' }

const entries = [
  { title: 'Notes from the rooftop shoot', date: '14 September 2026', category: 'Behind the film', href: '/about', excerpt: 'Forty minutes of usable light, one GT3 RS and a car park attendant who wanted a lap.' },
  { title: 'How we choose ten cars', date: '2 August 2026', category: 'Collections', href: '/collections', excerpt: 'A collection starts with one car we would keep. The other nine have to sit well beside it.' },
  { title: 'Reading a paint depth report', date: '19 June 2026', category: 'Inspection', href: '/faq', excerpt: 'What the numbers on every panel mean, and which ones should make you walk away.' },
]

export default function Journal() {
  return (
    <section aria-labelledby="journal" className="mx-auto max-w-[1200px] px-6 pb-40 pt-40 md:pt-48">
      <SectionHeader as="h1" display label="Journal" lines={[['Written', 'stretch-narrow'], ['down', 'stretch-wide']]} />
      <ol reversed className="mt-16 border-t border-border">
        {entries.map((e) => (
          <li key={e.title} className="border-b border-border">
            <article className="grid gap-2 py-8 md:grid-cols-12 md:gap-6 md:py-12">
              <p className="type-utility text-muted md:col-span-3">
                <time>{e.date}</time>
                <span className="block">{e.category}</span>
              </p>
              <div className="md:col-span-8 md:col-start-5">
                <h2 className="type-heading">
                  <Link href={e.href} className="underline decoration-transparent decoration-1 underline-offset-[0.2em] hover:decoration-current">
                    {e.title}
                  </Link>
                </h2>
                <p className="type-body mt-3 max-w-[52ch] text-muted">{e.excerpt}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
