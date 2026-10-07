import type { Metadata } from 'next'
import { Masthead } from '@/components/pieces/Masthead'
import { legal } from '@/content/copy'

export const metadata: Metadata = { title: 'Privacy and terms' }

export default function LegalPage() {
  return (
    <section className="px-(--gutter) pb-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <Masthead title={{ desktop: ['Privacy', 'and terms'], mobile: ['Privacy', 'and terms'] }} />
        {[{ id: 'privacy', ...legal.privacy }, { id: 'terms', ...legal.terms }].map((b) => (
          <div key={b.id} id={b.id} className="grid gap-x-(--grid-gap) gap-y-6 border-t border-(--color-border) py-12 md:grid-cols-12">
            <h2 className="type-heading md:col-span-4">{b.title}</h2>
            <div className="space-y-5 md:col-span-5 md:col-start-6">{b.text.map((t) => <p key={t} className="type-body max-w-[60ch]">{t}</p>)}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
