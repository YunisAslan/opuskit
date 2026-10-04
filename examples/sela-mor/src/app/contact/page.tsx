import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { ChapterWord } from '@/components/motion/ChapterWord'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Write to Sela Mor about a commission, a live date, film and licensing, or press.',
}

export default function Contact() {
  return (
    <>
      <section className="pt-36 md:pt-44">
        <ChapterWord word="Contact" as="h1" />
        <ContactCtaSection headline="Write to me." quiet="Commissions, live dates, film, press."
          action={{ label: `Email ${site.email}`, href: `mailto:${site.email}` }} />
      </section>
      <section aria-label="Write here" className="px-5 pb-(--section-gap) md:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <h2 className="type-heading">Or write here</h2>
            <p className="type-body mt-4 max-w-[36ch] text-(--color-muted)">I answer everything within a week, from Baku or Berlin. Live bookings go straight to <a href={`mailto:${site.bookings}`} className="text-(--color-text) underline decoration-1 underline-offset-4">{site.bookings}</a>.</p>
            <p id="privacy" className="type-body mt-10 max-w-[36ch] scroll-mt-28 text-(--color-muted)">
              Privacy: this site keeps nothing. The form opens your own email app; there are no cookies and no analytics. The sound switch remembers on or off in your browser, and that is all.
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6"><ContactForm /></div>
        </div>
      </section>
    </>
  )
}
