import type { Metadata } from 'next'
import { AboutSection } from '@/components/sections/About'
import { EditorialStorySection } from '@/components/sections/EditorialStory'
import { LocationSection } from '@/components/sections/Location'
import { TimelineSection } from '@/components/sections/Timeline'
import { ClipReveal } from '@/components/site/ClipReveal'
import { LiveStatus } from '@/components/site/LiveStatus'
import { PageHeader } from '@/components/site/PageHeader'
import { SaltWalk } from '@/components/site/SaltWalk'
import { Stop } from '@/components/site/Stop'
import { assets } from '@/config/assets'

export const metadata: Metadata = {
  title: 'The salt',
  description: 'Where QUM comes from: the salt pans at Masazir, the saffron fields at Bilgah, the small lab in Mardakan, and the three people who make every batch.',
}

export default function TheSalt() {
  return (
    <>
      <PageHeader title="Where QUM comes from" line="The salt pans at Masazir, the saffron fields at Bilgah, the small lab in Mardakan, and the three of us who make every batch. Walk with us; it is not far." />
      <Stop id="us" name="The three of us">
        <ClipReveal>
          <AboutSection media="side" title="Leyla, Nigar and Rauf" image={assets.founder1.src} alt={assets.founder1.alt}
            statement="We are three people from the Absheron coast who got tired of skincare that could have come from anywhere."
            bio="Leyla started QUM at her kitchen table in Mardakan in 2019, with a jar of lake salt and sunflower oil for her mother’s hands. Nigar, a chemist who spent ten years in a pharmacy lab in Baku, joined in 2021 and wrote the formulas. Rauf grew up in Bilgah between the saffron fields; he buys the threads, runs the lab and drives every box to the post office himself." />
        </ClipReveal>
      </Stop>
      <Stop id="lake" name="The lake">
        <ClipReveal>
          <EditorialStorySection media="full" title="Salt you can trace to one shore" image={assets.saltLake.src} alt={assets.saltLake.alt}
            caption="Masazir lake in late August, when the salt shows."
            paragraphs={[
              'Every August, when the lake at Masazir has dried back from its edges, we rake about four hundred kilos of salt from the same strip of shore. It is all we use for a year.',
              'The salt dries on the lab roof for a week and is washed twice in the lake’s own water. Some is ground fine for the cleanser and the cream; some stays coarse for the scrub; a little is dissolved back into water for the toner, which is as close as we can get to bottling the lake.',
              'The saffron is bought from two growers in Bilgah, a few kilometres inland, picked at dawn over three weeks in October. It steeps in squalane for six weeks before Nigar pours it. Nothing about it is fast, and we have stopped trying to make it so.',
            ]} />
        </ClipReveal>
      </Stop>
      <Stop id="years" name="The years">
        <TimelineSection title="How we got here" text="Seven years, one jar at a time." steps={[
          { when: '2019', title: 'A jar on the kitchen table', detail: 'Leyla mixes Masazir salt with sunflower oil for her mother’s hands. Neighbours start asking for jars.' },
          { when: '2021', title: 'Nigar joins, the first formulas', detail: 'The scrub becomes a cleanser and a toner, tested on forty volunteers over six months.' },
          { when: '2022', title: 'The first saffron from Bilgah', detail: 'Rauf brings back 30 grams from two growers. It becomes the first Saffron Serum, batch No. 1.' },
          { when: '2024', title: 'A lab of our own in Mardakan', detail: 'A small room near the fortress, with a roof for drying salt and space to pour 300 bottles a day.' },
          { when: '2026', title: 'Six products, and a shop', detail: 'Batch No. 14 is poured in September. Orders open to everyone in spring.' },
        ]} />
      </Stop>
      <SaltWalk
        stops={[
          { id: 'pans', name: 'The pans', image: 'saltAerial', text: 'Masazir, twenty minutes from Baku. The lake turns pink in July and white in August; that is when we rake.', link: { label: 'Read: why we rake salt in August', href: '/journal/why-we-rake-salt-in-august' } },
          { id: 'fields', name: 'The fields', image: 'saffronField', text: 'Bilgah, a few kilometres inland. The crocus flowers for three weeks in October, picked at dawn, dried by the evening.', link: { label: 'The serum it becomes', href: '/shop/saffron-serum' } },
        ]}
        last={{ id: 'visit', name: 'The lab', children: (
          <LocationSection media="side" title="The lab, Mardakan" image={assets.lab.src} alt={assets.lab.alt}
            address={'QUM lab\nMardakan, near the fortress\nAbsheron, Baku, Azerbaijan'}
            hours={['Saturdays 10:00 to 14:00, visitors welcome', 'Monday to Friday 09:00 to 18:00, by appointment']}
            notes={<>Forty minutes from central Baku along the coast road. Ring the bell; someone is always pouring something.<span className="mt-4 block"><LiveStatus /></span></>}
            mapUrl="https://www.google.com/maps/search/?api=1&query=Mardakan%2C%20Baku%2C%20Azerbaijan" />
        ) }} />
    </>
  )
}
