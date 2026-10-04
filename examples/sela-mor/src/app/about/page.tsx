import type { Metadata } from 'next'
import Link from 'next/link'
import { ChapterWord } from '@/components/motion/ChapterWord'
import { Reveal } from '@/components/motion/Reveal'
import { AboutSection } from '@/components/sections/About'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { PressSection } from '@/components/sections/Press'
import { assets } from '@/config/assets'
import { about, awards, press, site } from '@/content/site'

export const metadata: Metadata = {
  title: 'About',
  description: 'Sela Mor is a sound artist and composer from Baku who records wind, rain and machines and makes them into records, installations and live sets.',
}

export default function About() {
  return (
    <>
      <section className="pt-36 md:pt-44">
        <ChapterWord word="About" as="h1" />
        <Reveal>
          <AboutSection title="Sela Mor" image={assets.portrait.src} alt={assets.portrait.alt} statement={about.statement} bio={about.bio} />
        </Reveal>
        <Reveal className="px-5 py-12 md:px-8">
          <figure className="mx-auto grid max-w-[1440px] gap-4 md:grid-cols-12 md:gap-8">
            <img src={assets.fieldRecording.src} alt={assets.fieldRecording.alt} width={assets.fieldRecording.width} height={assets.fieldRecording.height} loading="lazy"
              className="aspect-[4/5] w-full rounded-media object-cover md:col-span-10 md:aspect-[21/9]" />
            <figcaption className="type-body text-(--color-muted) md:col-span-2">On the dunes at Shuvalan with Teymur Aliyev, recording for Wind Archive.</figcaption>
          </figure>
        </Reveal>
      </section>
      <section className="pt-(--section-gap)">
        <ChapterWord word="Press" side="right" />
        <PressSection title="What they wrote" quotes={press} awards={awards} />
      </section>
      <ContactCtaSection link={Link} headline="Say hello." quiet="Commissions, live dates, film." action={{ label: 'Write to Sela', href: '/contact' }} email={site.email} />
    </>
  )
}
