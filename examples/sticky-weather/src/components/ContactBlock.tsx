'use client'
// Contact's closing CTA with the form inline. Picking what we're making floods the section with that choice's colour.
import { useState } from 'react'
import { ContactForm } from '@/components/ContactForm'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { brand } from '@/content/site'

export function ContactBlock() {
  const [ground, setGround] = useState<string>()
  return (
    <>
      <ContactCtaSection as="h1" ground={ground} eyebrow="Tell us what you’re making. Pick one below and watch the page." headline="Big idea?" quiet="Small studio." email={brand.email}>
        <div className="mt-14 max-w-[760px]"><ContactForm id="contact" onPick={setGround} /></div>
      </ContactCtaSection>
    </>
  )
}
