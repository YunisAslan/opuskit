import type { Metadata } from 'next'
import { Lines } from '@/components/motion'
import { privacy, studio } from '@/content/site'

export const metadata: Metadata = { title: 'Privacy' }

export default function Privacy() {
  return (
    <section className="section-y px-(--gutter)">
      <div className="mx-auto max-w-(--container)">
        <Lines as="h1" lines={[privacy.title]} className="type-display" />
        <div className="type-body mt-12 max-w-[60ch] space-y-5">
          {privacy.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <p><a href={`mailto:${studio.email}`} className="link-line">{studio.email}</a></p>
        </div>
      </div>
    </section>
  )
}
