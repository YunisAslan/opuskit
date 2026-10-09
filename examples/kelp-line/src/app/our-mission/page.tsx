import type { Metadata } from 'next'
import { AboutSection } from '@/components/sections/About'
import { EditorialStorySection } from '@/components/sections/EditorialStory'
import { StatsSection } from '@/components/sections/Stats'
import { TeamSection } from '@/components/sections/Team'
import { asset } from '@/config/assets'
import { mission } from '@/content/site'

export const metadata: Metadata = { title: 'Our mission', description: 'Who replants the kelp off Skerra Bay, and why we count every plant.' }

export default function OurMission() {
  return (
    <>
      <AboutSection
        label={mission.about.title}
        heading={mission.about.heading}
        mobileHeading={['We count', 'every plant', 'because nobody', 'else did']}
        alt={asset('about').alt}
        statement={mission.about.statement}
        bio={mission.about.bio}
        caption={mission.about.caption}
      />
      <EditorialStorySection
        image="storyMission"
        media="full"
        title={['Why we count', 'every plant']}
        alt={asset('storyMission').alt}
        caption={mission.story.caption}
        paragraphs={mission.story.paragraphs}
        quote={mission.story.quote}
        quoteBy={mission.story.quoteBy}
      />
      <TeamSection title={mission.team.title} people={mission.team.people.map((p, i) => ({ ...p, image: i, alt: asset('team', i).alt }))} />
      <StatsSection tone="surface" title={mission.stats.title} stats={mission.stats.stats} note={mission.stats.note} />
    </>
  )
}
