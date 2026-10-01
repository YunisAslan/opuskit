import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { JournalSection } from '@/components/sections/Journal'
import { SubscribeForm } from '@/components/site/SubscribeForm'
import { essays, site } from '@/content/magazine'
import { toEntry } from '@/content/entries'

export const metadata: Metadata = { title: 'Newsletter', description: 'One long essay about one place, free in your inbox every second Sunday.' }

// Newsletter: Journal → Closing CTA
export default function NewsletterPage() {
  return (
    <>
      <JournalSection
        link={Link}
        headingAs="h1"
        title="Every second Sunday, one place."
        titleLines={[['Every second', 'Sunday,'], 'one place.']}
        lede="One long essay and one photograph, free, in your inbox. No adverts and no round-ups. These are the last three issues."
        entries={essays.slice(0, 3).map(toEntry)}
        all={{ label: 'Read the archive', href: '/articles' }}
      />
      <ContactCtaSection
        id="subscribe"
        headline="Join the list."
        quiet="Free. Unsubscribe from any email."
        email={site.email}
        note={<p id="privacy" className="type-body text-(--color-muted)">We use your email address only to send Slow Atlas. No tracking pixels, no third parties, and it is deleted when you unsubscribe.</p>}
      >
        <SubscribeForm />
      </ContactCtaSection>
    </>
  )
}
