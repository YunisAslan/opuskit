import type { Metadata } from 'next'
import Link from 'next/link'
import { Block } from '@/components/Block'
import { Cover } from '@/components/Cover'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { ProcessSection } from '@/components/sections/Process'
import { ServicesSection } from '@/components/sections/Services'
import { assets, type AssetKey } from '@/config/assets'
import { contact } from '@/content/site'

export const metadata: Metadata = { title: 'What we do', description: 'Cleanup Saturdays, the monthly water test, boat days, bird counts and school visits on the lower Kür.' }

const img = (k: AssetKey) => ({ src: assets[k].src, alt: assets[k].alt })

export default function WhatWeDo() {
  return (
    <>
      <Cover
        word="The work"
        title="What we do"
        intro="Five things, done the same way every time, so the numbers can be compared year on year."
        image="cleanup5"
      />
      <Block id="work">
        <ServicesSection
          title="Our work"
          items={[
            { name: 'Cleanup Saturdays', line: 'Every Saturday from April to November, on the banks and in the reeds between the bridge and the sea. Every sack is weighed before it goes in the skip.', image: img('cleanup2') },
            { name: 'The monthly water test', line: 'Six fixed sampling points on the first Sunday of the month. A lab in Baku measures oxygen, nitrates, phosphates, oil products and five more; we publish all of it.', image: img('waterTest') },
            { name: 'Boat days', line: 'Two boats reach the side channels you can’t walk to, where most of the rubbish ends up. A good boat day brings out half a tonne.', image: img('boat1') },
            { name: 'Bird counts', line: 'Spring and autumn, on the same route by boat, with Gulnara Sadigova who has counted here since the 1980s. 63 species last time.', image: img('heron2') },
            { name: 'School visits', line: 'Forty minutes in a classroom, then an afternoon on the bank with gloves and a scale. Twenty-three schools so far.', image: img('volunteerDay') },
          ]}
        />
      </Block>
      <Block id="saturday">
        <ProcessSection
          title="A cleanup Saturday"
          steps={[
            { name: 'Sign in at the boat shed', text: 'Gloves, sacks, a grabber and waders if you need them. Bring water and boots you don’t mind ruining.', duration: '08:00, 15 minutes' },
            { name: 'The briefing', text: 'Which stretch, where the boats go, and what not to touch: needles and gas canisters get flagged, and we call the municipality.', duration: '15 minutes' },
            { name: 'Bag it', text: 'Teams of four work along the bank and into the reeds. The boats take the channels.', duration: '3 hours' },
            { name: 'Weigh it', text: 'Every sack is hung on the scale and written in the logbook before it goes in the skip.', duration: '30 minutes' },
            { name: 'Tea and the number', text: 'The day’s total is read out before anyone goes home.', duration: '20 minutes' },
          ]}
        />
      </Block>
      <Block id="join">
        <ContactCtaSection link={Link} headline="Come out on a Saturday." quiet="Bring boots. We bring the rest." action={{ label: 'Sign up to volunteer', href: '/contact#message' }} email={contact.email} />
      </Block>
    </>
  )
}
