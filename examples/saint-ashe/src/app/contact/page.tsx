import type { Metadata } from 'next'
import { ContactForm } from '@/components/blocks'
import { Lines } from '@/components/motion'
import { SwapLink } from '@/components/RollLink'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FaqSection } from '@/components/sections/Faq'
import { LocationSection } from '@/components/sections/Location'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { assets as a } from '@/config/assets'
import { EMAIL } from '@/data/shop'

export const metadata: Metadata = { title: 'Contact', description: 'Write to the Saint Ashe workshop, visit the shop in Tbilisi, or find answers on payment, delivery, returns and repairs.' }

const faq = [
  { q: 'How do I pay?', a: 'There is no online checkout yet. Check out from your bag and your email app opens with the order written in. We reply within a day with a payment link and the delivery cost.' },
  { q: 'Where do you deliver?', a: 'Anywhere in Georgia in two working days, free over €200. Europe and the UK in five to seven days for €25. Anywhere else, we quote by email.' },
  { q: 'Can I send something back?', a: 'Within 30 days, unworn and with the tag on. Write to us first and we send a label. Trousers we have cut to your length are final.' },
  { q: 'How do the sizes run?', a: 'Our clothes are cut loose on purpose. Between two sizes, take the smaller one, or ask us for the measurements of the piece.' },
  { q: 'Will you repair it?', a: 'Yes, for as long as you own it. Seams and buttons are free. Resoling a pair of boots costs €60.' },
  { q: 'How do I look after waxed wool and leather?', a: 'Brush them, never wash them. Let them dry after rain, away from a radiator. Bring your coat to the shop once a year and we rewax it for free.' },
  { q: 'What do you do with my details?', a: 'We use your name, address and email to send your order, and for nothing else. Your bag is kept in your own browser; we never see it until you send the email.' },
]

export default function Contact() {
  return (
    <>
      <ContactCtaSection as="h1" link={SwapLink} email={EMAIL}
        headline={<Lines lines={['Write to', 'the workshop']} mobile={['Write', 'to the', 'workshop']} />}
        action={{ label: 'Write a message', href: '#message' }}>
        <ContactForm />
      </ContactCtaSection>

      <LocationSection title="The shop" image={a.shop.src} alt={a.shop.alt}
        address={'Saint Ashe\n14 Kote Afkhazi Street\nTbilisi 0105, Georgia'}
        hours={['Tuesday to Saturday, 12:00 to 20:00', 'Sunday, 13:00 to 18:00', 'Closed on Mondays']}
        notes="Ten minutes on foot from Freedom Square metro. If the door is shut, ring the bell: we are upstairs, cutting."
        phone="+995 32 200 1414"
        mapUrl="https://www.google.com/maps/search/?api=1&query=Kote+Afkhazi+Street+Tbilisi" />

      <FaqSection title="Questions">
        <Accordion type="single" collapsible>
          {faq.map(({ q, a }) => (
            <AccordionItem key={q} value={q} className="border-b border-(--color-border)">
              <AccordionTrigger className="type-body min-h-11 py-5 text-[1.05rem] hover:no-underline [&_svg]:text-(--color-muted)">{q}</AccordionTrigger>
              <AccordionContent className="type-body max-w-[60ch] pb-6 text-(--color-muted)">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FaqSection>
    </>
  )
}
