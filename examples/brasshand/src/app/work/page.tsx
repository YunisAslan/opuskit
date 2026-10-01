import type { Metadata } from 'next'
import Link from 'next/link'
import { CaseStudySection } from '@/components/sections/CaseStudy'
import { ClientsSection } from '@/components/sections/Clients'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWork'
import { Chapter } from '@/components/site/Chapter'
import { MagneticLink } from '@/components/site/links'
import { Reveal } from '@/components/site/Reveal'
import { assets } from '@/config/assets'
import { clients, contact, projectCard, projects } from '@/content/site'

export const metadata: Metadata = { title: 'Case studies', description: 'Six projects from Brasshand: menus, festival posters, coffee bags, a tape label, wayfinding and a bakery, all made in Baku.' }

export default function Work() {
  const lead = projects[0]
  return (
    <>
      <Chapter word="Case studies" h1 />
      <Reveal><FeaturedWorkSection link={Link} title="Six projects, newest first" projects={projects.map(projectCard)} /></Reveal>

      <Chapter word={lead.client} />
      <Reveal>
        <CaseStudySection link={Link} title={`${lead.client}, in depth`} image={assets[lead.image].src} alt={assets[lead.image].alt}
          facts={lead.facts} paragraphs={lead.paragraphs} href={`/work/${lead.slug}`} />
      </Reveal>

      <Reveal><ClientsSection title="Everyone we have worked for so far" names={clients} /></Reveal>

      <ContactCtaSection link={MagneticLink} headline="Your turn." quiet="Tell us yours."
        action={{ label: 'Start a project', href: '/contact' }} email={contact.email} />
    </>
  )
}
