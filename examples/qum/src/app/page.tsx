import Link from 'next/link'
import { EditorialStorySection } from '@/components/sections/EditorialStory'
import { JournalSection } from '@/components/sections/Journal'
import { PressSection } from '@/components/sections/Press'
import { ProductGridSection } from '@/components/sections/ProductGrid'
import { StatementSection } from '@/components/sections/Statement'
import { StepsSection } from '@/components/sections/Steps'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { ClipReveal } from '@/components/site/ClipReveal'
import { Hero } from '@/components/site/Hero'
import { Newsletter } from '@/components/site/Newsletter'
import { Stop } from '@/components/site/Stop'
import { assets } from '@/config/assets'
import { testimonials } from '@/data/shop'
import { gridItems, journalEntries } from '@/lib/grid'

export default function Home() {
  return (
    <>
      <Stop id="shelf" name="The shelf" fade={false}><Hero /></Stop>
      <Stop id="coast" name="The coast">
        <StatementSection variant="lead" label="Made on the Absheron coast"
          statement="Six things for your face and body, made by hand from salt we rake ourselves and saffron grown a few kilometres inland."
          body="QUM is three people and a small lab in Mardakan. Every batch is 300 bottles, poured, labelled and numbered by us, and when it is gone the next one is a few weeks away. Come in and have a look around." />
      </Stop>
      <Stop id="counter" name="The counter">
        <div className="focus-grid"><ProductGridSection link={Link} title="The six, and a small extra" products={gridItems()} /></div>
      </Stop>
      <Stop id="pans" name="The salt pans">
        <ClipReveal>
          <EditorialStorySection media="side" title="It starts with a pink lake" image={assets.saltCrystals.src} alt={assets.saltCrystals.alt}
            caption="Masazir salt after its second wash. The grey is magnesium, and it stays."
            paragraphs={[
              'Twenty minutes from the centre of Baku, the lake at Masazir turns pink every summer and then, slowly, white. The white is salt, a crust of it along the shore, and every August we rake it by hand.',
              'It dries on the roof of our lab for a week, then we wash it twice in water from the lake itself. What is left is coarse and faintly grey, with the minerals of the Caspian still in it. That salt is in five of our six products.',
              'The saffron comes from Bilgah, a few kilometres inland, where two growers pick the flowers at dawn for three weeks every October. We buy everything they can spare. It is never quite enough, which is why our batches stay small.',
            ]} />
        </ClipReveal>
      </Stop>
      <Stop id="basin" name="The basin">
        <StepsSection variant="cards" title="One ritual, three steps, about four minutes" steps={[
          { name: 'Wash with salt', text: 'One pump of the Salt Cleanser on damp skin, half a minute of slow circles, then rinse with lukewarm water.', duration: 'About a minute', image: assets.bathroom.src, alt: assets.bathroom.alt },
          { name: 'Press in the serum', text: 'Three drops of the Saffron Serum, warmed between your fingertips and pressed in, not rubbed.', duration: 'Half a minute', image: assets.ritualFace.src, alt: assets.ritualFace.alt },
          { name: 'Seal it in', text: 'The Day Cream in the morning, four drops of Night Oil at night. This is the step that keeps the other two working.', duration: 'About a minute', image: assets.ritualHands.src, alt: assets.ritualHands.alt },
        ]} />
      </Stop>
      <Stop id="bathrooms" name="Other bathrooms">
        <TestimonialsSection tone="surface" variant="lead" title="From the forty people who tested every batch" quotes={testimonials} />
      </Stop>
      <Stop id="papers" name="The papers">
        <PressSection variant="quote" title="What they wrote" quotes={[
          { outlet: 'Absheron Weekly', quote: 'The most quietly convincing skincare to come out of Baku in years.' },
          { outlet: 'The Caspian Review', quote: 'Salt, saffron and a great deal of patience.' },
          { outlet: 'Salt & Stone', quote: 'A serum that smells faintly of autumn fields.' },
        ]} />
      </Stop>
      <Stop id="reading-room" name="The reading room">
        <JournalSection link={Link} title="From the journal" entries={journalEntries()} allHref="/journal" />
      </Stop>
      <Stop id="way-in" name="The way in"><Newsletter /></Stop>
    </>
  )
}
