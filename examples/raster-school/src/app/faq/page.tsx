import type { Metadata } from 'next'
import { FaqSearch } from '@/components/site/FaqSearch'
import { Section } from '@/components/site/SectionHead'

export const metadata: Metadata = { title: 'FAQ', description: 'Every question about the course, applying and the online cohorts, answered.' }

export default function FaqPage() {
  return (
    <Section className="pt-[calc(var(--nav-top)+var(--nav-h)+clamp(40px,6vw,96px))]">
      <FaqSearch />
    </Section>
  )
}
