import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BookingForm } from '@/components/BookingForm'
import { Lines } from '@/components/Lines'
import { Motif } from '@/components/Motif'
import { TextLink } from '@/components/InkLinks'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { LocationSection } from '@/components/sections/Location'
import { media } from '@/config/assets'
import { site } from '@/data/site'

export const metadata: Metadata = { title: 'Book a viewing', description: 'Book a viewing of the show house at Aster House, Shikhov. We meet you at the sales office in Baku and drive out to the cliff together.' }

export default function Book() {
  return (
    <>
      <ContactCtaSection
        level="h1"
        headline={<Lines lines={['Book a viewing']} />}
        quiet={<span className="flex items-center gap-5"><Motif len={88} rot={-3} />Weekends at the show house, weekdays by appointment.</span>}
      >
        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7"><Suspense><BookingForm /></Suspense></div>
          <aside className="type-body space-y-6 md:col-span-4 md:col-start-9">
            <p>Tell us which house and a day that suits you. We reply within a working day with a time, timed where we can to the house’s own hour.</p>
            <p className="text-(--color-muted)">Rather talk? Call Nigar Aliyeva at the sales office.</p>
            <p className="flex flex-col items-start gap-1">
              <TextLink href={site.phoneHref}>{site.phone}</TextLink>
              <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
            </p>
          </aside>
        </div>
      </ContactCtaSection>

      <LocationSection
        id="office"
        title={<><Motif len={64} rot={2} />Where we meet you</>}
        address={`${site.office.name}\n${site.office.street}\n${site.office.city}`}
        hours={site.officeHours}
        notes="Viewings start at the sales office. From there we drive you out to the show house at Shikhov, twenty-five minutes along the coast road, and bring you back."
        mapUrl={site.officeMap}
        phone={{ label: site.phone, href: site.phoneHref }}
        image={media('cliff2').src}
        alt={media('cliff2').alt}
      />
    </>
  )
}
