import type { Metadata } from 'next'
import { assets } from '@/config/assets'
import { Spot } from '@/components/Drawings'
import { EnquiryForm } from '@/components/EnquiryForm'
import { Lines } from '@/components/Lines'
import { Page } from '@/components/Page'
import { Part } from '@/components/Part'
import { email } from '@/components/SideIndex'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FaqSection } from '@/components/sections/Faq'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const metadata: Metadata = { title: 'Commissions', description: 'Commission a picture book or a cover from Nell Arden: what she takes on, lead times, rough fees and a short enquiry form.' }

const terms = [
  { title: 'What Nell takes on', items: ['Picture books, usually 32 pages, her words or yours', 'Covers for middle-grade and adult novels', 'Spot drawings for magazines and festivals'] },
  { title: 'How long it takes', items: ['Picture book: 9 to 12 months from contract to final art', 'Cover: 6 to 8 weeks', 'Spot drawings: 2 to 3 weeks'] },
  { title: 'Rough fees', items: ['Picture book: from €9,000 advance, plus royalties', 'Cover: from €1,400', 'Spot drawings: from €180 each'] },
]

const faq = [
  { q: 'Do you illustrate other people’s stories?', a: 'Yes, about half the books are. Nell reads the whole manuscript before saying yes, and only takes on stories she can see in pictures straight away.' },
  { q: 'Can the art be digital?', a: 'No. Final art is ink and watercolour on paper. The studio scans every page at 600 dpi and delivers print-ready files with a colour proof checked against the originals.' },
  { q: 'Who keeps the original paintings?', a: 'Nell does, unless agreed otherwise in the contract. Publishers and authors can buy originals at a reduced price once the book is printed.' },
  { q: 'How are picture book fees paid?', a: 'Usually as an advance against royalties, in three parts: on signing, on approved roughs and on delivery of final art. Covers and spot drawings are a flat fee, half on starting.' },
  { q: 'Do you work with self-published authors?', a: 'Occasionally, for one book a year at most. Write with the finished text and your printing plans, and Nell will tell you honestly whether she can help.' },
  { q: 'What should I send first?', a: 'The text (or a summary if it isn’t finished), the page count and trim size if you know them, and the date the book needs to be at the printer.' },
  { q: 'Can I visit the studio?', a: 'Yes, on summer Saturdays by appointment. The old bakery is a short walk below the Khan’s Palace in Sheki; ask for the door with the moth on it.' },
]

export default function Commissions() {
  return (
    <Page>
      <Part id="commission" label="Commission a book">
        <ContactCtaSection as="h1" spot={<Spot kind="nib" className="-rotate-12" />}
          headline={<Lines lines={['Commission a picture', 'book or a cover']} mobile={['Commission', 'a picture book', 'or a cover']} />}
          quiet="Two new books a year, booked about nine months ahead. There is room for one more in 2027."
          action={{ label: 'Write to Nell', href: '#enquiry' }} email={email}>
          <dl className="rise mt-20 grid gap-10 border-t border-(--color-text)/20 pt-10 md:grid-cols-3 md:gap-x-[2vw]">
            {terms.map((t, i) => (
              <div key={t.title} className={i === 1 ? 'md:mt-12' : ''}>
                <dt className="type-heading">{t.title}</dt>
                {t.items.map((it) => <dd key={it} className="type-body mt-3 border-b border-dashed border-(--color-text)/20 pb-3">{it}</dd>)}
              </div>
            ))}
          </dl>
          <div className="mt-24 grid gap-14 md:mt-32 md:grid-cols-12 md:gap-x-[1vw]">
            <figure className="taped self-start bg-(--color-surface) p-2 shadow-[0_12px_26px_rgb(0_0_0/0.15)] md:col-span-4 md:-rotate-2">
              <span className="clip block"><img src={assets.studio.src} alt={assets.studio.alt} loading="lazy" className="aspect-[4/5] w-full rounded-(--radius-media) object-cover" /></span>
              <figcaption className="type-utility mt-2 text-(--color-muted)">{assets.studio.caption}. Your book would be drawn here.</figcaption>
            </figure>
            <div className="md:col-span-7 md:col-start-6">
              <h2 className="type-display text-[clamp(2.2rem,4vw,3.4rem)]">A short note to start</h2>
              <p className="type-body mb-10 mt-4 max-w-[52ch]">Tell Nell about the book. She replies to every note herself, usually within the week, with yes, no or a question.</p>
              <EnquiryForm />
            </div>
          </div>
        </ContactCtaSection>
      </Part>
      <Part id="questions" label="Questions">
        <FaqSection title="Questions publishers and authors ask">
          <Accordion type="single" collapsible>
            {faq.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-b border-(--color-text)/20">
                <AccordionTrigger className="type-heading min-h-14 cursor-pointer items-center rounded-none py-4 [font-size:clamp(1.05rem,1.5vw,1.25rem)] hover:no-underline hover:text-(--color-primary)">{f.q}</AccordionTrigger>
                <AccordionContent className="type-body max-w-[60ch] pb-6">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FaqSection>
      </Part>
    </Page>
  )
}
