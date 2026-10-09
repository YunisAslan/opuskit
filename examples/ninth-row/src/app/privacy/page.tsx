import type { Metadata } from 'next'
import { privacy } from '@/content/site'

export const metadata: Metadata = { title: 'Privacy' }

export default function Privacy() {
  return (
    <section className="px-(--gutter) pt-[calc(var(--section-y)+64px)] pb-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12 md:gap-6">
        <h1 className="type-display text-[clamp(4rem,9vw,8.5rem)] md:col-span-5">{privacy.title}</h1>
        <div className="space-y-6 md:col-span-6 md:col-start-7 md:pt-4">
          {privacy.text.map((t) => <p key={t} className="type-body max-w-[60ch] text-(--color-muted)">{t}</p>)}
        </div>
      </div>
    </section>
  )
}
