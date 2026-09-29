import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { site } from '@/config/site'

export const metadata: Metadata = { title: 'Accessibility' }

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader lines={['Accessibility']} mobile={['Access-', 'ibility']} />
      <section className="container-text pb-32">
        <div className="prose-legal">
          <p>We aim for this site to meet WCAG 2.2 at level AA, and for the shop to be easy to visit.</p>
          <h2>On this site</h2>
          <ul>
            <li>Text colours pass AA contrast on every background.</li>
            <li>Every page works with a keyboard, with a visible focus outline.</li>
            <li>If your device asks for reduced motion, scroll effects are turned off and the film only plays if you ask.</li>
            <li>Videos are muted and have no speech.</li>
          </ul>
          <h2>In the shop</h2>
          <p>Level entrance, an accessible toilet and a lower counter at the pickup point. Assistance dogs are always welcome.</p>
          <h2>Tell us what is not working</h2>
          <p>Email <a href={`mailto:${site.email}`}>{site.email}</a> or call <a href={site.phoneHref}>{site.phone}</a>. We reply within two working days.</p>
        </div>
      </section>
    </>
  )
}
