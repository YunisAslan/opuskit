import type { Metadata } from 'next'
import { ResidenceList } from '@/components/ResidenceList'
import { Motif } from '@/components/Motif'
import { FeatureGridSection } from '@/components/sections/FeatureGrid'
import { FaqSection } from '@/components/sections/Faq'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { media } from '@/config/assets'

export const metadata: Metadata = { title: 'Residences', description: 'All twelve houses of Aster House: the hour each faces, floor area, bedrooms, terrace, price and whether it is available, reserved or sold.' }

const questions = [
  { q: 'When are the houses finished?', a: 'All twelve are handed over together in spring 2027. The rock work and the shells are complete; fitting out began in September 2026. The show house, Ten, is finished and open every weekend.' },
  { q: 'How does reserving a house work?', a: 'After a viewing you can hold a house for fourteen days with a refundable deposit of ₼20,000. Signing the sale contract within those days turns it into the first payment; if you walk away, it is returned in full.' },
  { q: 'How is the price paid?', a: 'Thirty per cent on signing, forty per cent when the fitting out is finished, and the rest at handover. Two Baku banks offer mortgages on the project; the sales office can introduce you.' },
  { q: 'Can I change the interior?', a: 'Kitchens, bathrooms and floors can be chosen from three palettes until January 2027. The hour room, its window and its bare wall stay as drawn: they are the reason the house exists.' },
  { q: 'Who looks after the cliff, the paths and the sea terraces?', a: 'An owners’ company maintains the shared paths, the funicular lift and the sea defences, with a resident caretaker. The service charge is set at ₼6 per square metre a month for the first three years.' },
  { q: 'Can buyers from outside Azerbaijan purchase?', a: 'Yes. Foreign buyers can own the house and its land share outright. We work with a Baku notary who handles the registration in English or Russian.' },
]

export default function Residences() {
  return (
    <>
      <ResidenceList />
      <FeatureGridSection
        title={<><Motif len={72} rot={0} />In every house</>}
        features={[
          { name: 'Cut into the rock', text: 'The back half of every house is inside the cliff: sixty centimetres of limestone keep the rooms cool in August and warm in January.', image: media('terraceStone').src, alt: media('terraceStone').alt },
          { name: 'The hour room', text: 'One room per house, set at the angle of its hour, with a wall left bare so the light has something to land on.', image: media('hourMorning').src, alt: media('hourMorning').alt },
          { name: 'A terrace at the water', text: 'A private stone terrace at sea level, between 34 and 71 square metres, with a plunge pool fed with filtered sea water.', image: media('terracePool').src, alt: media('terracePool').alt },
          { name: 'The stair through the cliff', text: 'One concrete stair runs from the living floor at the top down through the rock to the sea rooms.', image: media('stair').src, alt: media('stair').alt },
          { name: 'Heat from the sea', text: 'A shared sea-water heat pump warms the floors and the pools. Nothing burns on site.', image: media('cliff2').src, alt: media('cliff2').alt },
          { name: 'Quiet by design', text: 'Twelve houses and no more. No shared pool deck, no restaurant, no visitors’ car park on the cliff.', image: media('detailJug').src, alt: media('detailJug').alt },
        ]}
      />
      <FaqSection id="questions" title={<><Motif len={64} rot={3} />Questions</>}>
        <Accordion type="single" collapsible>
          {questions.map(({ q, a }) => (
            <AccordionItem key={q} value={q} className="border-(--color-border)">
              <AccordionTrigger className="type-heading min-h-14 items-center py-4 [font-size:clamp(1.1rem,1.5vw,1.3rem)] hover:no-underline focus-visible:underline">{q}</AccordionTrigger>
              <AccordionContent className="type-body max-w-[60ch] pb-6 text-(--color-muted)">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FaqSection>
    </>
  )
}
