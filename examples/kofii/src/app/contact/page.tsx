import type { Metadata } from 'next'
import { Lines } from '@/components/Lines'
import { site } from '@/config/site'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <section aria-label="Contact" className="container-text grid min-h-[80svh] content-center gap-12 pb-32 pt-40 md:pt-48">
      <Lines as="h1" lines={['Say hello.', 'We read', 'everything.']} className="type-display" />
      <div data-reveal="stagger" className="grid gap-6">
        <p className="max-w-[48ch] text-lg">Questions, feedback, a lost scarf. Write to us and someone from the bar replies within a day.</p>
        <div>
          <a href={`mailto:${site.email}`} className="btn min-h-14 px-8 text-lg">{site.email}</a>
        </div>
        <p className="text-muted">
          Or call <a href={site.phoneHref} className="underline">{site.phone}</a> during opening hours.
        </p>
      </div>
    </section>
  )
}
