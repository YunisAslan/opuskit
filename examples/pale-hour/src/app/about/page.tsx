import type { Metadata } from 'next'
import { AboutSection } from '@/components/sections/About'
import { Presses } from '@/components/sections/Presses'
import { TeamSection } from '@/components/sections/Team'
import { TextEffect } from '@/components/pieces/TextEffect'
import { media } from '@/config/assets'
import { aboutPage as c } from '@/content/site'

export const metadata: Metadata = { title: 'About', description: c.statement }

export default function About() {
  return (
    <>
      <AboutSection
        title={<TextEffect as="h1" trigger="load" className="type-display" breaks={{ base: [2], md: [2] }}>{c.title}</TextEffect>}
        opening={<Presses lead={c.presses.lead} years={c.presses.years} label={c.presses.sr} />}
        label={c.label}
        image={media('about', 0, c.alt)}
        statement={c.statement}
        bio={c.bio}
      />
      <TeamSection
        title={<TextEffect as="h2" className="type-display [font-size:clamp(2.5rem,6vw,6rem)]" breaks={{ base: [1], md: [1] }}>{c.team.title}</TextEffect>}
        people={c.team.people.map((p, n) => ({ ...p, image: media('team', n, p.alt) }))}
      />
    </>
  )
}
