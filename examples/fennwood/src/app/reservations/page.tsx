import type { Metadata } from 'next'
import { ChapterTitle } from '@/components/ChapterTitle'
import { ClipReveal } from '@/components/Reveal'
import { MediaAsset } from '@/components/MediaAsset'
import { BookingForm } from '@/components/BookingForm'
import { ReservationSection } from '@/components/sections/Reservation'
import { LocationSection } from '@/components/sections/Location'
import { FaqSection } from '@/components/sections/Faq'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { faq, site } from '@/config/site'

export const metadata: Metadata = { title: 'Book a table', description: 'Book a table at Fennwood, a wood-fire kitchen with forty seats in Bristol. Dinner Wednesday to Sunday, lunch at the weekend.' }

// Reservations: the one moment is the booking itself — the mark lands beside the title and the form is right there.
export default function ReservationsPage() {
  return (
    <main id="main" className="pt-22">
      <ReservationSection id="book" title={<ChapterTitle as="h1" display size={64} pose={-4} morph="book-title">Book a table</ChapterTitle>}
        text={`Choose a day and a time and we will hold the table. ${site.groups}`} hours={site.hours} phone={site.phone} form={<BookingForm />} />
      <LocationSection id="location" title={<ChapterTitle pose={6}>Find us on Larder Street</ChapterTitle>}
        address={site.address} hours={site.hours} notes={site.transit} mapUrl={site.mapUrl} phone={site.phone}
        media={<ClipReveal className="aspect-[4/3] rounded-(--radius-media)"><div className="drift absolute inset-0"><MediaAsset id="location" sizes="(min-width: 768px) 680px, 90vw" /></div></ClipReveal>} />
      <FaqSection id="faq" title={<ChapterTitle pose={-6}>Before you come</ChapterTitle>}>
        <Accordion type="single" collapsible>
          {faq.map(({ q, a }) => (
            <AccordionItem key={q} value={q} className="border-(--color-border)">
              <AccordionTrigger className="type-body py-5 text-[1.125rem] font-medium hover:no-underline focus-visible:underline">{q}</AccordionTrigger>
              <AccordionContent className="type-body max-w-[60ch] text-(--color-muted)">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FaqSection>
    </main>
  )
}
