import type { Metadata } from 'next'
import { LocationSection } from '@/components/sections/Location'
import { HourLine } from '@/components/sections/HourLine'
import { ScheduleSection } from '@/components/sections/Schedule'
import { FaqSection } from '@/components/sections/Faq'
import { TextEffect } from '@/components/pieces/TextEffect'
import { Reveal } from '@/components/motion/Reveal'
import { i } from '@/components/motion/stagger'
import { Rsvp } from '@/components/site/Rsvp'
import { Transit } from '@/components/site/Transit'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { media } from '@/config/assets'
import { site, visitPage as c } from '@/content/site'

export const metadata: Metadata = { title: 'Visit', description: `${site.address.lines.join(', ')}. ${site.hoursLines.join('. ')}.` }

export default function Visit() {
  return (
    <>
      <LocationSection
        title={<TextEffect as="h1" trigger="load" className="type-display" breaks={{ base: [2], md: [2] }}>{c.title}</TextEffect>}
        image={media('location')}
        address={{ label: c.addressLabel, lines: site.address.lines }}
        hours={{ label: c.hoursLabel, lines: site.hoursLines }}
        actions={<>
          <a href={site.mapUrl} target="_blank" rel="noreferrer" className={buttonVariants()}>{c.directions}</a>
          <a href={site.phone.href} className="type-utility link-on inline-flex min-h-11 items-center">{c.call}, {site.phone.label}</a>
        </>}
        transit={<Transit label={c.gettingHere} items={c.transit} />}
      >
        <HourLine />
        <Reveal as="ul" className="mt-(--section-y) grid gap-(--gutter) md:grid-cols-3">
          {c.rooms.map((r, n) => (
            <li key={r.id} id={r.id} className="rv scroll-mt-24" style={i(n)}>
              <Card className="h-full">
                <CardTitle>{r.title}</CardTitle>
                <CardContent>
                  <p className="type-utility">{r.hours}</p>
                  <p className="mt-2">{r.note}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </Reveal>
      </LocationSection>

      <ScheduleSection
        id="week"
        tone="surface"
        title={<TextEffect as="h2" className="type-display [font-size:clamp(2.5rem,6vw,6rem)]" breaks={{ base: [1], md: [1] }}>{c.schedule.title}</TextEffect>}
        days={c.schedule.days}
        after={<Rsvp />}
      />

      <FaqSection id="faq" title={<h2 className="type-heading">{c.faq.title}</h2>}>
        <Accordion type="single" collapsible>
          {c.faq.items.map((f) => (
            <AccordionItem key={f.id} value={f.id} id={f.id === 'access' ? 'access' : undefined}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FaqSection>
    </>
  )
}
