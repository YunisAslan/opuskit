import type { Metadata } from 'next'
import { AboutSection } from '@/components/sections/About'
import { TeamSection } from '@/components/sections/Team'
import { about, team } from '@/content/magazine'

export const metadata: Metadata = { title: 'About', description: 'Who makes Slow Atlas, and why every essay stays with one place.' }

// About: About → Team
export default function AboutPage() {
  return (
    <>
      {/* No portrait here: Marit appears in The editors below, so each face shows once. */}
      <AboutSection headingAs="h1" title={about.label} statement={about.statement} bio={about.bio} />
      <TeamSection id="team" title="The editors" people={team} />
    </>
  )
}
