import type { Metadata } from 'next'
import Link from 'next/link'
import { Lines } from '@/components/motion/Lines'
import { CtaBandSection } from '@/components/sections/CtaBand'
import { ServicesSection } from '@/components/sections/Services'
import { StatsSection } from '@/components/sections/Stats'
import { StepsSection } from '@/components/sections/Steps'
import { programs } from '@/content/site'

export const metadata: Metadata = { title: 'Programs', description: 'Replanting dives, beach days, nursery evenings, the autumn count and shore school.' }

export default function Programs() {
  return (
    <>
      <ServicesSection
        lead={<Lines as="h1" onLoad lines={['Five ways', 'into the water']} className="type-display-2" />}
        title="Programs"
        intro={programs.services.intro}
        items={programs.services.items}
      />
      <StepsSection title={programs.process.title} note="From a ripe blade on a wild plant to a counted plant on the reef, one year." steps={programs.process.steps} />
      <StatsSection tone="surface" title={programs.stats.title} stats={programs.stats.stats} note={programs.stats.note} />
      <CtaBandSection tone="inverse" link={Link} text={programs.ctaBand.text} action={programs.ctaBand.action} note={programs.ctaBand.note} />
    </>
  )
}
