import Link from 'next/link'
import { ProofSequence } from '@/components/home/ProofSequence'
import { BreathingName } from '@/components/home/BreathingName'
import { ScrollFilm } from '@/components/home/ScrollFilm'
import { ChapterWord } from '@/components/motion/ChapterWord'
import { Reveal } from '@/components/motion/Reveal'
import { Magnetic } from '@/components/pieces/Magnetic'
import { AboutSection } from '@/components/sections/About'
import { ClientsSection } from '@/components/sections/Clients'
import { NewsletterSection } from '@/components/sections/Newsletter'
import { ScheduleSection } from '@/components/sections/Schedule'
import { assets } from '@/config/assets'
import { about, madeFor, site, upcoming, works } from '@/content/site'

// Home: the name → Work (proof, one at a time) → the film band → About → Live → Made for → the letter.
export default function Home() {
  return (
    <>
      <BreathingName first="Sela" last="Mor" line={site.line}
        action={
          <Magnetic>
            <Link href="/listen" className="type-body inline-flex h-12 items-center rounded-button border border-(--color-text) px-7 font-semibold transition-colors duration-150 hover:bg-(--color-text) hover:text-(--color-background)">Listen to six tracks</Link>
          </Magnetic>
        } />

      <section className="pt-(--section-gap)">
        <ChapterWord word="Work" as="h2" />
        <ProofSequence works={works} />
      </section>

      <ScrollFilm />

      <section className="pt-(--section-gap)">
        <ChapterWord word="About" side="right" />
        <Reveal>
          <AboutSection title="About Sela" image={assets.portrait.src} alt={assets.portrait.alt} statement={about.statement} bio={about.bio} />
        </Reveal>
        <div className="px-5 md:px-8">
          <Link href="/about" className="type-body mx-auto flex min-h-11 max-w-[1440px] items-center underline decoration-1 underline-offset-4 md:pl-[calc((100%+2rem)/12*6)]">More about her, and what the press wrote</Link>
        </div>
      </section>

      <section className="pt-(--section-gap)">
        <ChapterWord word="Live" />
        <Reveal>
          <ScheduleSection title="The next dates" days={upcoming.slice(0, 2)} />
        </Reveal>
        <div className="px-5 md:px-8">
          <Link href="/live" className="type-body mx-auto flex min-h-11 max-w-[1440px] items-center underline decoration-1 underline-offset-4">Every date, and last season’s shows</Link>
        </div>
      </section>

      <Reveal>
        <ClientsSection title="Made for and with" names={madeFor} />
      </Reveal>

      <NewsletterSection title="One letter a month" text="New recordings, dates near you and a field note from wherever the recorder was. One short email at the start of each month; reply “stop” to any of them and you’re off the list."
        placeholder="you@example.com" button="Subscribe" note="Once a month. Nothing else." to={site.email} />
    </>
  )
}
