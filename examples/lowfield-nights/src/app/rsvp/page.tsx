import type { Metadata } from 'next'
import { ReservationSection } from '@/components/sections/Reservation'
import { LocationSection } from '@/components/sections/Location'
import { FaqSection } from '@/components/sections/Faq'
import { TextEffect } from '@/components/pieces/TextEffect'
import { FaqAccordion } from '@/components/site/Faqs'
import { InView } from '@/components/site/InView'
import { RsvpForm } from '@/components/site/RsvpForm'
import { StatusLine } from '@/components/site/StatusLine'
import { Stop } from '@/components/site/Stop'
import { assets } from '@/config/assets'
import { faqSets, location, mapUrl, reservation } from '@/content/site'
import { EVENT } from '@/lib/event'

export const metadata: Metadata = { title: 'RSVP', description: 'Hold a free seat for one of the three nights of Lowfield Nights, 12–14 June 2027.' }

export default function Rsvp() {
  return (
    <>
      {/* The way in: the film stays visible on the left, the form sits on its own surface. */}
      <Stop id="the-way-in" name="The way in" film>
        <div className="relative min-h-svh pt-36 md:pt-44">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_0%_30%,color-mix(in_srgb,var(--color-background)_80%,transparent),transparent_75%)]" />
          <div className="relative px-5 md:px-10">
            <div className="mx-auto max-w-[1440px]">
              <TextEffect as="h1" preset="slide" className="type-display max-w-[11ch]">Take a seat in the hangar</TextEffect>
              <StatusLine className="mt-6" />
            </div>
          </div>
          <div id="rsvp" className="relative scroll-mt-16 [&>section]:pt-12 md:[&>section]:pt-16">
            <ReservationSection {...reservation} phone={EVENT.phone} form={<RsvpForm />} />
          </div>
        </div>
      </Stop>

      <Stop id="the-hangar" name="The hangar">
        <InView className="clip">
          <LocationSection {...location} mapUrl={mapUrl} image={assets.location.src} alt={assets.location.alt} />
        </InView>
      </Stop>

      <Stop id="questions" name="Questions">
        <FaqSection title="About your RSVP">
          <FaqAccordion items={faqSets.rsvp} />
        </FaqSection>
      </Stop>
    </>
  )
}
