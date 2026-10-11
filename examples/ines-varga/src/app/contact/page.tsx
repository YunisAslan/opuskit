import type { Metadata } from 'next'
import { FaqSection } from '@/components/sections/Faq'
import { LettersAssemble } from '@/components/pieces/LettersAssemble'
import { ContactForm } from '@/components/site/ContactForm'
import { CopyEmail } from '@/components/site/CopyEmail'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { contact, site } from '@/content/site'

export const metadata: Metadata = {
  title: contact.meta.title,
  description: contact.meta.description,
  openGraph: { title: contact.meta.title, description: contact.meta.description, images: [{ url: '/media/desk-glasses-map.jpg', width: 1917, height: 2400, alt: 'Glasses and pencils on a map on the work table' }] },
}

export default function ContactPage() {
  return (
    <>
      {/* Closing CTA — Big invitation: the line the page is about gathers as it comes up the page, then the action */}
      <section className="overflow-x-clip px-(--gutter) pb-(--section-y)">
        <div className="flex min-h-svh flex-col justify-between gap-16 pb-[8svh] pt-28 md:pt-36">
          <div className="grid-site gap-y-6">
            <p className="font-(family-name:--font-heading) col-span-full [font-size:clamp(1.75rem,3.2vw,2.75rem)] [font-weight:700] leading-[1.1] lg:col-span-6">{contact.quiet}</p>
            <div className="col-span-full space-y-4 lg:col-span-4 lg:col-start-9">
              <p className="type-body text-(--color-muted)">{contact.intro}</p>
              <CopyEmail className="type-body" />
              <p className="type-utility text-(--color-muted)">{site.studio}. {site.visits}.</p>
            </div>
          </div>
          <LettersAssemble as="h1" spread={0.9} className="type-display max-w-[20ch]">{contact.headline}</LettersAssemble>
        </div>
        <ContactForm />
      </section>

      <FaqSection title={contact.faq.title}>
        <Accordion type="single" collapsible>
          {contact.faq.items.map(({ q, a }) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FaqSection>

      <section id="imprint" aria-labelledby="imprint-title" className="scroll-mt-24 px-(--gutter) pb-(--section-y)">
        <div className="grid-site">
          <div className="col-span-full border-t border-(--color-border) pt-6 lg:col-span-6">
            <h2 id="imprint-title" className="type-heading">Imprint</h2>
            {/* PLACEHOLDER — the legally required details for where the studio is registered */}
            <p className="type-caption mt-3 max-w-[60ch] text-(--color-muted)">{site.name}, illustrator. Studio in {site.studio}. Contact: {site.email}. All maps, drawings and texts on this site are by {site.name} unless a credit says otherwise.</p>
          </div>
        </div>
      </section>
    </>
  )
}
