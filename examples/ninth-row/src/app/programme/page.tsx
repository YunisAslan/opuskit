import type { Metadata } from 'next'
import Link from 'next/link'
import { DoorsCountdown } from '@/components/programme/DoorsCountdown'
import { ScheduleSection } from '@/components/sections/Schedule'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWork'
import { TitleCard } from '@/components/TitleCard'
import { scheduleCopy, seasons, seasonsCopy, week } from '@/content/programme'

export const metadata: Metadata = { title: 'Programme', description: 'Seven nights of new and old films at Ninth Row, with a late-night series on Fridays.' }

export default function Programme() {
  return (
    <>
      <h1 className="sr-only">Programme</h1>
      <div className="pt-[calc(var(--section-y)+64px)]">
        <DoorsCountdown />
      </div>
      <ScheduleSection id="week" title={scheduleCopy.programme.title} line={scheduleCopy.programme.line} days={week} action={scheduleCopy.repeatAction} empty={scheduleCopy.empty} />
      <TitleCard lines={[seasonsCopy.title]} line={seasonsCopy.line} className="pt-(--section-y)" />
      <FeaturedWorkSection link={Link} projects={seasons.map((s, i) => ({ ...s, href: `/tickets?season=${s.slug}#book`, image: i, action: 'Book a ' + s.title + ' film' }))} />
    </>
  )
}
