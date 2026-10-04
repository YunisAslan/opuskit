import type { Metadata } from 'next'
import { Block } from '@/components/Block'
import { Cover } from '@/components/Cover'
import { DonateBlock } from '@/components/DonateBlock'
import { FaqSection } from '@/components/sections/Faq'
import { TrustSection } from '@/components/sections/Trust'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const metadata: Metadata = { title: 'Donate', description: 'Give once or monthly: 10 AZN takes a sack of rubbish out of the Kür, 45 AZN pays for a month of water tests, 120 AZN for a boat day.' }

const FAQ = [
  { q: 'Why can’t I pay on this page?', a: 'We’re a small volunteer association and we keep card details off our website. Leave your pledge here and we email you a secure payment link from our bank, Kapital Bank, within one working day.' },
  { q: 'Can I stop a monthly gift?', a: 'Yes, any time, with one email. No questions, and nobody will phone you to talk you out of it.' },
  { q: 'Where are your accounts?', a: 'Every April we publish the past year’s accounts and the auditor’s letter in the logbook, next to the tonnes and the water results. Ask us and we’ll send the last three years.' },
  { q: 'Do I get a receipt?', a: 'Yes. Every gift gets a receipt from the association by email, with our registration number. Whether you can deduct it from tax depends on where you pay tax.' },
  { q: 'Do you take money from companies?', a: 'Yes, unless they’re the ones dumping in the river. We turn down any company whose rubbish we’ve pulled off the banks, and we list every company gift over 1,000 AZN in the yearly report.' },
  { q: 'Can I give my time instead?', a: 'Please do. Cleanups run every Saturday from April to November. Write to us and we’ll put you on the list for the next one.' },
]

export default function Donate() {
  return (
    <>
      <Cover word="Give" title="Donate" intro="Every amount pays for something you can point at: a sack out of the reeds, a month of water tests, a day on the boats." />
      <DonateBlock />
      <Block id="where">
        <TrustSection
          label="Where the money goes"
          items={[
            { title: '64% to the river', text: 'Sacks, gloves, skips and the truck for the cleanup days.' },
            { title: '19% to the lab', text: 'The monthly water tests in Baku.' },
            { title: '11% to the boats', text: 'Fuel, repairs and the skipper’s day rate.' },
            { title: '6% to running costs', text: 'Bank fees, this website and the yearly audit.' },
          ]}
        />
      </Block>
      <Block id="questions">
        <FaqSection title="Questions">
          <Accordion type="single" collapsible>
            {FAQ.map(({ q, a }) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FaqSection>
      </Block>
    </>
  )
}
