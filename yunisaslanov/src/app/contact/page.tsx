import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { site } from '@/config/site'

export const metadata: Metadata = { title: 'Contact' }

export default function Contact() {
  return (
    <>
      <h1 className="sr-only">Contact Yunis Aslanov</h1>
      <ContactCtaSection variant="statement" tone="inverse" headline="Say hello." quiet="Tell me what you’re making."
          action={{ label: 'Write it here', href: '#write' }} email={site.email} />
      <div data-reveal="cut">
        <section id="write" className="scroll-mt-24 px-(--gutter) py-(--section-y)">
          <div className="mx-auto grid max-w-(--container) gap-12 md:grid-cols-24 md:gap-x-[1vw]">
            <div className="md:col-span-5 md:col-start-2">
              <h2 className="type-heading">A few lines is enough</h2>
              <p className="type-body mt-4 text-(--color-muted)">I read every message myself and answer within two days.</p>
            </div>
            <div className="md:col-span-11 md:col-start-10"><ContactForm email={site.email} /></div>
          </div>
        </section>
      </div>
    </>
  )
}
