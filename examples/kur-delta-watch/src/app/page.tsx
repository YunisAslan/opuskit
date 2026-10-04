import Link from 'next/link'
import { Block } from '@/components/Block'
import { FilmBand } from '@/components/FilmBand'
import { GiantWord } from '@/components/GiantWord'
import { KineticHero } from '@/components/KineticHero'
import { NewsletterBlock } from '@/components/NewsletterBlock'
import { CtaBandSection } from '@/components/sections/CtaBand'
import { JournalSection } from '@/components/sections/Journal'
import { ManifestoSection } from '@/components/sections/Manifesto'
import { ServicesSection } from '@/components/sections/Services'
import { StatsSection } from '@/components/sections/Stats'
import { TimelineSection } from '@/components/sections/Timeline'
import { assets } from '@/config/assets'
import { posts } from '@/content/site'

export default function Home() {
  return (
    <>
      <KineticHero />

      <div className="border-t-2 border-(--color-border)">
        <StatsSection
          title="The other numbers, since October 2019"
          stats={[
            { value: '84', label: 'Monthly water tests, every one published' },
            { value: '1,318', label: 'People who have signed in for a cleanup' },
            { value: '63 km', label: 'Of bank and channel cleared at least once' },
            { value: '41', label: 'Pelicans on the north channel this September, up from 9' },
          ]}
          note="Every figure comes from our own logbooks, which anyone can ask to see."
        />
      </div>

      <FilmBand line="The Kür at first light, a few kilometres from the sea." />

      <GiantWord word="Counting" label="Why we count" id="why" />
      <ManifestoSection
        statement={['We don’t campaign.', 'We count.', 'Every sack weighed,', 'every month tested,', 'every number printed,', 'the bad ones too.']}
        attribution="Leyla Mammadova, who started the watch in 2019"
      />

      <Block id="timeline">
        <TimelineSection
          title="The river so far"
          text="People in Neftchala over sixty remember a delta loud with birds. This is what happened since, oldest first."
          steps={[
            { when: '1974', title: 'A delta full of birds', detail: 'The winter count logs more than 90,000 waterbirds between the river mouth and the Gizilagach bay: pelicans, flamingos, herons in every reed bed.' },
            { when: '1993', title: 'Less water reaches the sea', detail: 'Dams and irrigation upstream take more of the Kür every year. In dry summers the river arrives slow and shallow, and the side channels silt up.' },
            { when: '2014', title: 'The sea comes up the river', detail: 'In a low-water August, Caspian salt water pushes kilometres upstream. Reed beds along the lower channels die back for two seasons.' },
            { when: '2018', title: 'Rubbish settles where the current slows', detail: 'Bottles, bags and net floats from upstream towns gather in the reeds and on the bends. A fisherman counts 300 bottles on 100 metres of bank.' },
            { when: '2019', title: 'The watch starts', detail: 'On 12 October, twelve neighbours and one borrowed boat spend a Saturday on the south bank. They weigh what they pull out: 1.8 tonnes.' },
            { when: '2020', title: 'The first water test', detail: 'Six sampling points, the first Sunday of every month, a lab in Baku. Every result since has been published, good or bad.' },
            { when: '2023', title: 'Herons nest at the old fish ponds', detail: 'Grey herons raise young in the reeds by the abandoned ponds for the first time in at least ten years.' },
            { when: '2026', title: '2,140 tonnes out', detail: 'Counted to 30 September. Forty-one pelicans on the north channel this autumn.' },
          ]}
        />
      </Block>

      <Block id="work">
        <ServicesSection
          link={Link}
          title="What we do"
          items={[
            { name: 'Cleanup Saturdays', line: 'April to November, on the banks and in the reeds. Every sack weighed.', href: '/what-we-do#work' },
            { name: 'The monthly water test', line: 'Six fixed points, one lab, every result published.', href: '/what-we-do#work' },
            { name: 'Boat days', line: 'Two boats for the channels you can’t reach on foot.', href: '/what-we-do#work' },
            { name: 'Bird counts', line: 'Spring and autumn, the same route every time.', href: '/what-we-do#work' },
            { name: 'School visits', line: 'A lesson in class, then an afternoon on the bank.', href: '/what-we-do#work' },
          ]}
        />
      </Block>

      <Block>
        <CtaBandSection link={Link} text="10 AZN takes one sack of rubbish out of the reeds." action={{ label: 'Donate', href: '/donate' }} note="45 AZN pays for a month of water tests." />
      </Block>

      <Block id="journal">
        <JournalSection
          link={Link}
          title="From the logbook"
          entries={posts.map((p) => ({ title: p.title, date: p.date, category: p.category, href: `/journal/${p.slug}`, image: assets[p.image].src, alt: assets[p.image].alt }))}
        />
      </Block>

      <Block>
        <NewsletterBlock />
      </Block>
    </>
  )
}
