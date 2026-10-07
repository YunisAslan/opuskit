import type { Metadata } from 'next'
import { AboutSection } from '@/components/sections/About'
import { StepsSection } from '@/components/sections/Steps'
import { TeamSection } from '@/components/sections/Team'
import { about } from '@/content/site'

export const metadata: Metadata = { title: 'About', description: 'A small architecture studio in Herefordshire that works on old barns, and only on old barns.' }

// About: About → Process → Team.
export default function About() {
  return (
    <>
      <AboutSection id="studio" title={about.label} image={about.image} image2={about.image2} statement={about.statement} statementMobile={about.statementMobile} bio={about.bio} />
      <StepsSection id="process" title={about.process.title} steps={about.process.steps} />
      <TeamSection id="people" title={about.people.title} people={about.people.team} />
    </>
  )
}
