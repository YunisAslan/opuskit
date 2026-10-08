import type { Metadata } from 'next'
import { TextEffect } from '@/components/pieces/TextEffect'
import { FaqSection } from '@/components/sections/Faq'
import { LocationSection } from '@/components/sections/Location'
import { Band } from '@/components/site/Band'
import { Booking } from '@/components/site/Booking'
import { t } from '@/components/site/type'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { brand, faq, hours, location, reservationsPage } from '@/content/site'

export const metadata: Metadata = { title: 'Book a table', description: reservationsPage.intro }

// Reservations: Reservation → Location → FAQ
export default function ReservationsPage() {
  return (
    <>
      <Band tone="ground" wave={false} className="pt-16">
        <Booking
          record
          top={
            <>
              <TextEffect as="h1" preset="slide" className={`${t.page} mx-auto max-w-[12ch]`}>{reservationsPage.title}</TextEffect>
              <p className="type-body mx-auto mt-6 max-w-[44ch] text-(--color-muted) [font-size:clamp(1.0625rem,1.3vw,1.1875rem)]">{reservationsPage.intro}</p>
            </>
          }
        />
      </Band>
      <Band tone="surface">
        <LocationSection
          media="side"
          heading={<TextEffect as="h2" preset="slide" className={t.h2}>{location.title}</TextEffect>}
          address={brand.address}
          hours={hours}
          notes={location.notes}
          mapUrl={brand.mapUrl}
          mapLabel={location.map}
          phone={brand.phone}
          callLabel={location.call}
        />
      </Band>
      <Band tone="ground">
        <FaqSection heading={<h2 className={t.h2}>{faq.title}</h2>}>
          <Accordion type="single" collapsible>
            {faq.items.map(({ q, a }) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FaqSection>
      </Band>
    </>
  )
}
