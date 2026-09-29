import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { faqs } from '@/config/site'

export const metadata: Metadata = { title: 'FAQ' }

export default function FaqPage() {
  return (
    <>
      <PageHeader lines={['Good to know']} mobile={['Good', 'to know']} />
      <section aria-label="Frequently asked questions" className="container-text pb-32">
        <div className="max-w-3xl border-t border-border" data-reveal="stagger">
          {faqs.map((f) => (
            <details key={f.q} className="faq border-b border-border">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-bold">
                {f.q}
                <span aria-hidden className="chev text-2xl font-normal leading-none">+</span>
              </summary>
              <p className="max-w-[60ch] pb-6">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
