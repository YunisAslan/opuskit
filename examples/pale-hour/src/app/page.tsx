import Link from 'next/link'
import { HeroSection } from '@/components/sections/Hero'
import { StatementSection } from '@/components/sections/Statement'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWork'
import { ScheduleSection } from '@/components/sections/Schedule'
import { JournalSection } from '@/components/sections/Journal'
import { TextEffect } from '@/components/pieces/TextEffect'
import { Rsvp } from '@/components/site/Rsvp'
import { media, mediaSet, sized } from '@/config/assets'
import { exhibitions, home, journal, lightbox, site, talks } from '@/content/site'

const works = exhibitions.map((e, n) => ({ ...e, image: media('featuredWork', n, e.alt), href: `/exhibitions#${e.slug}` }))
const now = exhibitions.find((e) => e.status === 'Now on')!

export default function Home() {
  return (
    <>
      <HeroSection
        image={media('hero')}
        mobile={media('mobileHeroCrop')}
        trail={[...mediaSet('featuredWork'), ...mediaSet('gallery')].map((m) => sized(m, 180).src)}
        headline={home.hero.headline}
        breaks={{ base: [1, 3, 4], md: [1, 3] }}
        line={home.hero.line}
        action={{ label: home.hero.action, href: '/visit' }}
        address={site.address.lines}
        directions={{ label: home.hero.directions, href: site.mapUrl }}
        nowOn={{ label: home.hero.nowOn, artist: now.artist, title: now.title, until: now.dates.split(' to ')[1] ?? now.dates, href: `/exhibitions#${now.slug}` }}
      />

      <StatementSection label={home.intro.label} statement={home.intro.statement} body={home.intro.body} />

      <FeaturedWorkSection
        variant="grid"
        title={<TextEffect as="h2" className="type-display [font-size:clamp(2.5rem,6vw,6rem)]" breaks={{ md: [2] }}>{home.featured.title}</TextEffect>}
        more={{ label: home.featured.more, href: '/exhibitions' }}
        open={home.featured.open}
        projects={works}
        lightbox={lightbox}
      />

      <ScheduleSection
        tone="surface"
        title={<TextEffect as="h2" className="type-display [font-size:clamp(2.5rem,6vw,6rem)]" breaks={{ base: [0], md: [0] }}>{home.schedule.title}</TextEffect>}
        intro={home.schedule.intro}
        days={talks}
        after={<Rsvp />}
      />

      <JournalSection
        link={Link}
        title={<h2 className="type-heading">{home.journal.title}</h2>}
        entries={journal.map((j, n) => ({ ...j, image: media('journal', n, j.alt) }))}
      />
    </>
  )
}
