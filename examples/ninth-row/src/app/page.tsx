import Link from 'next/link'
import { ScrollFilm } from '@/components/home/ScrollFilm'
import { StatementSection } from '@/components/sections/Statement'
import { ScheduleSection } from '@/components/sections/Schedule'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWork'
import { NewsletterSection } from '@/components/sections/Newsletter'
import { TitleCard } from '@/components/TitleCard'
import { intro, newsletter } from '@/content/home'
import { scheduleCopy, seasons, seasonsCopy, week } from '@/content/programme'
import { site } from '@/content/site'

export default function Home() {
  return (
    <>
      <ScrollFilm />
      <StatementSection label={intro.label} lines={['A hundred and', 'twenty seats,', 'one screen,', 'a film every night.']} body={intro.body} />
      <ScheduleSection title={scheduleCopy.home.title} line={scheduleCopy.home.line} days={week} action={scheduleCopy.repeatAction} empty={scheduleCopy.empty} />
      <TitleCard lines={[seasonsCopy.title]} line={seasonsCopy.line} className="pt-(--section-y)" />
      <FeaturedWorkSection link={Link} projects={seasons.map((s, i) => ({ ...s, href: '/programme', image: i, action: seasonsCopy.action }))} />
      <NewsletterSection copy={newsletter} to={site.email} titleLines={['The week,', 'on Monday morning']} />
    </>
  )
}
