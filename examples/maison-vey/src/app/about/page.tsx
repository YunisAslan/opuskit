import type { Metadata } from 'next'
import { AboutSection } from '@/components/sections/About'
import { StepsSection } from '@/components/sections/Steps'
import { about } from '@/content/copy'

export const metadata: Metadata = { title: 'About', description: 'Two people at one bench in Sète, making five scents by hand.' }

// About: About → Process
export default function AboutPage() {
  return (
    <>
      <AboutSection heading={about.masthead} title={about.title} image="about-portrait" statement={about.statement} bio={about.bio} />
      <StepsSection title={about.stepsTitle} steps={about.steps} />
    </>
  )
}
