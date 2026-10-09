import type { Metadata } from 'next'
import { DonateSection } from '@/components/sections/Donate'
import { FaqSection } from '@/components/sections/Faq'
import { TrustSection } from '@/components/sections/Trust'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { donate, site } from '@/content/site'

export const metadata: Metadata = { title: 'Donate', description: 'Give once or monthly. See what each gift plants, and where every pound goes.' }

export default function Donate() {
  return (
    <>
      <DonateSection
        title={['Every pound goes', 'into the water']}
        mobileTitle={['Every pound', 'goes into', 'the water']}
        text={donate.text}
        gifts={donate.gifts}
        spend={donate.spend}
        spendTitle={donate.spendTitle}
        note={donate.paymentUrl ? donate.note : donate.noteUntilPayment}
      />
      <TrustSection tone="surface" items={donate.trust} />
      <FaqSection title={donate.faq.title} aside={<>Something else? Write to <a className="link-line text-(--color-text) [overflow-wrap:anywhere]" href={`mailto:${site.email}`}>{site.email}</a>.</>}>
        <Accordion type="single" collapsible>
          {donate.faq.items.map(({ q, a }) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent>{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FaqSection>
    </>
  )
}
