import type { Metadata } from 'next'
import { Block } from '@/components/Block'
import { Cover } from '@/components/Cover'
import { AboutSection } from '@/components/sections/About'
import { EditorialStorySection } from '@/components/sections/EditorialStory'
import { TeamSection } from '@/components/sections/Team'
import { assets } from '@/config/assets'

export const metadata: Metadata = { title: 'The river', description: 'Who runs Kür Delta Watch, and the story of the delta where the Kür meets the Caspian.' }

export default function TheRiver() {
  return (
    <>
      <Cover
        word="The river"
        title="The river"
        intro="The Kür runs 1,500 km from the hills of Turkey to the Caspian, and ends here, below Neftchala, in a fan of channels and reeds. This is who looks after the last stretch."
        image="delta1"
      />
      <Block id="who">
        <AboutSection
          title="Who we are"
          image={assets.cleanup1.src}
          alt={assets.cleanup1.alt}
          statement="A few dozen people from Neftchala who got tired of walking past the rubbish."
          bio="Kür Delta Watch started in October 2019, when Leyla Mammadova, a geography teacher at School No. 2, asked eleven neighbours to give up a Saturday on the south bank. They filled 1.8 tonnes of sacks. Since then the watch has registered as a public association, bought two boats, and published every monthly water test. Nobody is paid except the lab and the skipper."
        />
      </Block>
      <Block id="story">
        <EditorialStorySection
          title="A delta that used to be loud"
          image={assets.delta2.src}
          alt={assets.delta2.alt}
          caption="The southern channels, where the river fans out over the mudflats into the sea."
          paragraphs={[
            'Ask anyone in Neftchala over sixty about the delta and they will talk about noise: pelicans on the sandbars, flamingos in the shallows, herons in every reed bed, so many birds that fishermen complained about them.',
            'The change came slowly. Upstream, dams and irrigation canals took more of the river every decade. By the 1990s the Kür reached the sea tired and shallow in summer, the side channels silted up, and in the dry August of 2014 the Caspian pushed its salt water kilometres up the river. Reeds died back. Birds went elsewhere.',
            'The rubbish came with the slow water. Everything dropped in the river between Mingachevir and the coast drifts down, and where the current slows, it stops: in the reeds, on the bends, around the old ferry landing. By 2018 some stretches of bank were more plastic than mud.',
            'We can’t give the river back its water. That is a question for governments. What we can do is take out what shouldn’t be in it, measure what’s left, and keep the record honest. Seven years in, the reeds on the north channel are clean, the herons nest at the old fish ponds again, and the pelicans are back in numbers nobody here expected to see.',
          ]}
        />
      </Block>
      <Block id="team">
        <TeamSection
          title="The people who run the watch"
          people={[
            { name: 'Leyla Mammadova', role: 'Founder and coordinator', line: 'I started this with eleven neighbours and a borrowed boat. I still keep the Saturday sign-in sheet.', image: assets.team1.src, alt: assets.team1.alt },
            { name: 'Nigar Rzayeva', role: 'Water tests', line: 'Six points, first Sunday of the month, same hour. The routine is the whole point.', image: assets.team2.src, alt: assets.team2.alt },
            { name: 'Elshan Guliyev', role: 'Boats and channels', line: 'I know which channel silts up after which storm. That’s where the rubbish waits.', image: assets.team3.src, alt: assets.team3.alt },
            { name: 'Rauf Karimov', role: 'Volunteers and schools', line: 'Most people come because a friend dragged them along. Most of them stay.', image: assets.volunteerDay.src, alt: assets.volunteerDay.alt },
          ]}
        />
      </Block>
    </>
  )
}
