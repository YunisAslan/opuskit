import type { Metadata } from 'next'
import Link from 'next/link'
import { Block } from '@/components/Block'
import { Cover } from '@/components/Cover'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { EditorialStorySection } from '@/components/sections/EditorialStory'
import { GallerySection } from '@/components/sections/Gallery'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { assets, type AssetKey } from '@/config/assets'
import { contact } from '@/content/site'

export const metadata: Metadata = { title: 'Field notes', description: 'The people on the banks, the monthly water test, and a photo story from seven years on the lower Kür.' }

const photo = (k: AssetKey, caption: string, text: string) => ({ src: assets[k].src, alt: assets[k].alt, caption, text })

export default function FieldNotes() {
  return (
    <>
      <Cover word="Field notes" title="Field notes" intro="What it looks like from the bank, in the words of the people who turn up." />
      <Block id="voices">
        <TestimonialsSection
          title="In their words"
          quotes={[
            { quote: 'My grandfather fished these channels. The first Saturday I came, we filled a truck. Last month we filled half of one.', name: 'Aysel Huseynova', role: 'volunteer since 2021, teacher at School No. 2' },
            { quote: 'You learn the channels by their rubbish. Bottles where the current slows, bags where the reeds are thick.', name: 'Kamran Aliyev', role: 'skipper on boat days' },
            { quote: 'They send me their samples every month and they never ask me to make the numbers look better. That’s rarer than you’d think.', name: 'Dr Tural Mammadli', role: 'hydrologist, Baku' },
            { quote: 'The herons came back to the old fish ponds in 2023. I had stopped looking for them years before.', name: 'Gulnara Sadigova', role: 'birdwatcher, Neftchala' },
          ]}
        />
      </Block>
      <Block id="water">
        <EditorialStorySection
          title="First Sunday of the month"
          image={assets.waterTest.src}
          alt={assets.waterTest.alt}
          caption="Sampling point 4, the north channel by the old ferry landing."
          paragraphs={[
            'At seven in the morning on the first Sunday of every month, Nigar Rzayeva and two volunteers take the same boat to the same six points and fill the same bottles. They have done it 84 times.',
            'The routine is the point. Water changes with the season, the weather and the time of day, so the only way to see what the river is really doing is to measure it the same way every time, for years.',
            'The bottles go to a lab in Baku by the afternoon bus. The lab measures dissolved oxygen, nitrates, phosphates, oil products and five more; the results come back by Thursday and go up in the logbook on the first Monday, whatever they say.',
            'Most months the numbers are boring. Boring is good. When they aren’t, as below the fish-processing yard this June, we send them to the district environment office and keep sending them until something changes.',
          ]}
        />
      </Block>
      <GallerySection
        id="photos"
        title="Seven years on the bank"
        photos={[
          photo('cleanup4', 'Dusk on the south bank', 'The last net of the day, emptied in the dry reeds.'),
          photo('heron2', 'Breakfast at the fish ponds', 'A grey heron, back where nobody had seen one nest in ten years.'),
          photo('boat3', 'Where the boat can’t go', 'In the shallows you get out and pull.'),
          photo('glove', 'Masks, 2021', 'For a year they were most of what we pulled out of the water.'),
          photo('pelicans', 'The north channel, September', 'Forty-one pelicans, nearly all of them white pelicans.'),
          photo('cleanup1', 'Two sacks each', 'Everything goes on the scale before it goes in the skip.'),
          photo('boat1', 'Boat day', 'The channel to the old ferry landing, cleared in one morning.'),
          photo('heron1', 'Reeds, clean', 'The same stretch held 300 bottles per 100 metres in 2018.'),
        ]}
      />
      <Block>
        <ContactCtaSection link={Link} headline="See it for yourself." quiet="Saturday mornings, April to November." action={{ label: 'Join a cleanup', href: '/contact#message' }} email={contact.email} />
      </Block>
    </>
  )
}
