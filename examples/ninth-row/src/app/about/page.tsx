import type { Metadata } from 'next'
import { AboutSection } from '@/components/sections/About'
import { TeamSection } from '@/components/sections/Team'
import { about, team } from '@/content/about'

export const metadata: Metadata = { title: 'About', description: 'The people who run Ninth Row, a 120-seat arthouse cinema.' }

export default function About() {
  return (
    <>
      <AboutSection titleLines={['Who keeps', 'the lamp lit']} statement={about.statement} bio={about.bio} />
      <TeamSection title={team.title} people={team.people} />
    </>
  )
}
