import type { Metadata } from 'next'
import { AboutSection } from '@/components/sections/About'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { StatsSection } from '@/components/sections/Stats'
import { TeamSection } from '@/components/sections/Team'
import { Chapter } from '@/components/site/Chapter'
import { MagneticLink } from '@/components/site/links'
import { Reveal } from '@/components/site/Reveal'
import { assets } from '@/config/assets'
import { contact, stats, team } from '@/content/site'

export const metadata: Metadata = { title: 'About', description: 'Brasshand is three people in a studio on Rasul Rza street, Baku, naming things before drawing them since 2017.' }

export default function About() {
  return (
    <>
      <Chapter word="Studio" h1 />
      <Reveal>
        <AboutSection title="About Brasshand" image={assets.studio.src} alt={assets.studio.alt}
          statement="Three people, one room on Rasul Rza street, and a habit of naming things before drawing them."
          bio="Leyla started Brasshand in 2017 after ten years of writing ads she didn’t believe in. Rauf joined to draw the letters, Nigar to get them printed on time. We work for restaurants, labels, festivals and anyone in Baku who opens a door and wants people to walk through it." />
      </Reveal>

      <Chapter word="People" />
      <Reveal><TeamSection title="All three of us" people={team} /></Reveal>
      <Reveal><StatsSection title="Nine years, roughly counted" stats={stats} /></Reveal>

      <ContactCtaSection link={MagneticLink} headline="Come say hello." quiet="The kettle’s on."
        action={{ label: 'Start a project', href: '/contact' }} email={contact.email} />
    </>
  )
}
