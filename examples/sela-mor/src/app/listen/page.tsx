import type { Metadata } from 'next'
import Link from 'next/link'
import { Tracks } from '@/components/listen/Tracks'
import { ChapterWord } from '@/components/motion/ChapterWord'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { IntroSection } from '@/components/sections/Intro'
import { site, tracks } from '@/content/site'

export const metadata: Metadata = {
  title: 'Listen',
  description: 'Six tracks by Sela Mor, one from each record, installation and live set, and one unreleased: where each was recorded and what it was made for.',
}

export default function Listen() {
  return (
    <>
      {/* Signature moment: the chapter opens on one giant word, cropped at the edges. */}
      <section className="pt-36 md:pt-44">
        <ChapterWord word="Listen" as="h1" />
        <IntroSection label="Six tracks" statement="One from each work, and one nobody has heard yet. Headphones help."
          body="Each is a 75-second excerpt. Only one plays at a time, and starting one turns the site’s own sound off." />
        <Tracks tracks={tracks} />
      </section>
      <ContactCtaSection link={Link} headline="Heard something you need?" quiet="Scores, licences and commissions."
        action={{ label: 'Write to Sela', href: '/contact' }} email={site.email} />
    </>
  )
}
