import type { Metadata } from 'next'
import { ChapterWord } from '@/components/motion/ChapterWord'
import { Reveal } from '@/components/motion/Reveal'
import { NewsletterSection } from '@/components/sections/Newsletter'
import { ScheduleSection } from '@/components/sections/Schedule'
import { lastSeason, site, upcoming } from '@/content/site'

export const metadata: Metadata = {
  title: 'Live',
  description: 'Where to hear Sela Mor next: Night Shift, Rain, Caspian and Room Tone in Baku, Tbilisi, Istanbul and Berlin, and last season’s shows.',
}

export default function Live() {
  return (
    <>
      <section className="pt-36 md:pt-44">
        <ChapterWord word="Live" as="h1" />
        <Reveal>
          <ScheduleSection title="Next: Baku, Tbilisi, Istanbul and Berlin" days={upcoming} />
        </Reveal>
      </section>
      <section className="pt-(--section-gap)">
        <ChapterWord word="Before" side="right" />
        <Reveal>
          <ScheduleSection title="Last season" days={lastSeason} />
        </Reveal>
      </section>
      <NewsletterSection title="Dates near you, once a month" text="New dates go to the letter first, a week before they go anywhere else. One short email at the start of each month; reply “stop” and you’re off the list."
        placeholder="you@example.com" button="Subscribe" note="Once a month. Nothing else." to={site.email} />
    </>
  )
}
