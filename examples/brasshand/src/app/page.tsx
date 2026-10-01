import { ClientsSection } from '@/components/sections/Clients'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { JournalSection } from '@/components/sections/Journal'
import { ManifestoSection } from '@/components/sections/Manifesto'
import { ServicesSection } from '@/components/sections/Services'
import { Chapter } from '@/components/site/Chapter'
import { Hero } from '@/components/site/Hero'
import { MagneticLink, RollLink } from '@/components/site/links'
import { ProofReel } from '@/components/site/ProofReel'
import { Reveal } from '@/components/site/Reveal'
import { clients, contact, journal, projects, services } from '@/content/site'

export default function Home() {
  return (
    <>
      <Hero line="A three-person studio for food, music and culture. Names, identities and campaigns, made on Rasul Rza street in Baku." />

      <Chapter word="Manifesto" />
      <Reveal>
        <ManifestoSection attribution="Leyla Mammadova, founder"
          statement={'We write the name\nbefore we draw\nanything. In Baku,\npeople talk first\nand look later.'} />
      </Reveal>

      <Chapter word="Projects" />
      <ProofReel title="Selected work, one at a time" projects={projects} />

      <Chapter word="Services" />
      <Reveal><ServicesSection link={RollLink} title="What we make" items={services} /></Reveal>
      <Reveal><ClientsSection title="Who we make it for" names={clients} /></Reveal>

      <Chapter word="Journal" />
      <Reveal>
        <JournalSection link={RollLink} title="Notes from the studio"
          entries={journal.map((e) => ({ title: e.title, date: e.date, category: e.category, href: `/journal/${e.slug}` }))} />
      </Reveal>

      <ContactCtaSection link={MagneticLink} headline="Need a name?" quiet="Come for coffee."
        action={{ label: 'Start a project', href: '/contact' }} email={contact.email} />
    </>
  )
}
