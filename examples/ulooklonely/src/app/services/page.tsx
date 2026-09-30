import type { Metadata } from 'next'
import { BriefForm } from '@/components/forms/BriefForm'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { site } from '@/config/site'

export const metadata: Metadata = { title: 'Services', description: 'Short films, music videos, edits and grading. Start a conversation.' }

export default function Services() {
  return (
    <ContactCtaSection
      level="h1"
      headline="Your film, made slowly."
      quiet="Short films, music videos, edits and grading, with one person on the other end of every email."
      action={{ label: 'Start a conversation', href: '#brief' }}
      email={site.email}
    >
      <BriefForm />
    </ContactCtaSection>
  )
}
