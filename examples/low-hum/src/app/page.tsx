import Link from 'next/link'
import { ViewTransition } from 'react'
import { TextEffect } from '@/components/pieces/TextEffect'
import { MenuSection } from '@/components/sections/Menu'
import { ScheduleSection } from '@/components/sections/Schedule'
import { StatementSection } from '@/components/sections/Statement'
import { Band } from '@/components/site/Band'
import { Booking } from '@/components/site/Booking'
import { Hero } from '@/components/site/Hero'
import { t } from '@/components/site/type'
import { home, menuSides, reservation, schedule } from '@/content/site'

// Home: Hero → Intro → Menu → Schedule → Reservation
export default function HomePage() {
  return (
    <>
      <Hero />
      <Band tone="ground">
        <StatementSection variant="lead" label={home.intro.label} statement={home.intro.statement} body={home.intro.body} />
      </Band>
      <Band tone="surface">
        <MenuSection
          heading={
            <ViewTransition name="menu-title">
              <TextEffect as="h2" preset="slide" className={`${t.h2} inline-block`}>{home.menu.title}</TextEffect>
            </ViewTransition>
          }
          sides={menuSides}
          note={home.menu.note}
          after={
            <p className="mt-10 text-center">
              <Link href="/menu" className="type-utility inline-flex h-13 items-center rounded-(--radius-button) border border-(--color-text) px-7 transition-colors duration-150 outline-none [font-size:0.9375rem] hover:bg-(--color-text) hover:text-(--color-background) focus-fill">{home.menu.more}</Link>
            </p>
          }
        />
      </Band>
      <Band tone="inverse" id="programme">
        <ScheduleSection heading={<h2 className={t.h2}>{home.schedule.title}</h2>} intro={home.schedule.intro} days={schedule} />
      </Band>
      <Band tone="ground">
        <Booking heading={<TextEffect as="h2" preset="slide" className={t.h2}>{reservation.title}</TextEffect>} />
      </Band>
    </>
  )
}
