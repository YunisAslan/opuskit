import type { Metadata } from 'next'
import { AboutSection } from '@/components/sections/About'
import { TeamSection } from '@/components/sections/Team'
import { ChapterWord, Reveal } from '@/components/site/motion'
import { assets } from '@/config/assets'
import { editors } from '@/content/magazine'

export const metadata: Metadata = { title: 'About', description: 'Slow Atlas is made by three editors in Bergen who would rather go back to one place than see ten.' }

export default function About() {
  return (
    <>
      <ChapterWord word="Masthead" as="h1" />
      <Reveal>
        <AboutSection title="Who makes Slow Atlas" image={assets.article6.src}
          alt="The view from a train window, a landscape blurred by speed. Most of our essays are edited on trains."
          statement="Three editors in Bergen who would rather go back to one place than see ten."
          bio={[
            'We started in 2024 with a shared document and one rule: every essay is about a single place, written by someone who stayed there for at least a week. We pay writers for the week, not for the word count.',
            'There are no ads, no affiliate links and no lists of ten best anything. The letter is free. Readers who want to keep it that way can pay what they like, and about one in nine of them do.',
          ]} />
      </Reveal>
      <div className="border-t border-(--color-border)">
        <Reveal>
          <TeamSection title="The editors" people={editors.map((p) => ({ ...p, image: assets[p.image].src, alt: assets[p.image].alt }))} />
        </Reveal>
      </div>
    </>
  )
}
