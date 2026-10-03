import { Hero } from '@/components/Hero'
import { ChapterTitle } from '@/components/ChapterTitle'
import { Lines, ClipReveal } from '@/components/Reveal'
import { MediaAsset } from '@/components/MediaAsset'
import { MenuTabs } from '@/components/MenuTabs'
import { BookingForm } from '@/components/BookingForm'
import { TextLink } from '@/components/TextLink'
import { IntroSection } from '@/components/sections/Intro'
import { ReservationSection } from '@/components/sections/Reservation'
import { LocationSection } from '@/components/sections/Location'
import { menus, site } from '@/config/site'

// Home: the one moment is the mark leaving the oven fire and landing, larger, beside this week's menu.
export default function Home() {
  return (
    <main id="main">
      {/* The hero stays while the intro slides over it. */}
      <div>
        <Hero lines={['Cooked over', 'one wood fire']} action={{ label: 'Book a table', href: '/reservations' }}
          line="Forty seats in Bristol, vegetables from two farms and bread from the same oven. The menu changes every week." />
        <div className="relative z-10 rounded-t-(--radius-card) bg-(--color-background)">
          <IntroSection
            label={<ChapterTitle pose={-6}>Two farms, one oven</ChapterTitle>}
            statement={<>
              <Lines className="hidden lg:block" lines={['What the farms send on', 'Monday is on the table', 'by Wednesday.']} />
              <Lines className="lg:hidden" lines={['What the farms', 'send on Monday', 'is on the table', 'by Wednesday.']} />
            </>}
            body="Larkrise Farm grows our vegetables and Stonepit our grain, apples and cider, both under an hour away. Bread goes into the oven at dawn, vegetables follow while the bricks are hottest, and by evening the fire has settled for fish and slow lamb."
            media={
              <ClipReveal className="aspect-[4/5] rounded-[999px_999px_var(--radius-media)_var(--radius-media)]">
                <div className="drift absolute inset-0"><MediaAsset id="farm" sizes="(min-width: 768px) 380px, 90vw" /></div>
              </ClipReveal>
            }
          />
        </div>
      </div>
      <MenuTabs id="menu" title={<ChapterTitle size={72} pose={8} morph="menu-title">This week’s menu</ChapterTitle>}
        menus={menus.map((m) => ({ ...m, groups: m.groups.slice(0, 2) }))}
        note={<>A taste of this week. <TextLink href="/menu" className="text-(--color-text)">See the whole menu and the room</TextLink></>} />
      <ReservationSection id="book" title={<ChapterTitle pose={-4} morph="book-title">Book a table</ChapterTitle>}
        text={`Choose a day and a time and we will hold the table. ${site.groups}`} hours={site.hours} phone={site.phone} form={<BookingForm />} />
      <LocationSection id="location" title={<ChapterTitle pose={6}>Find us on Larder Street</ChapterTitle>}
        address={site.address} hours={site.hours} notes={site.transit} mapUrl={site.mapUrl} phone={site.phone}
        media={<ClipReveal className="aspect-[4/3] rounded-(--radius-media)"><div className="drift absolute inset-0"><MediaAsset id="location" sizes="(min-width: 768px) 680px, 90vw" /></div></ClipReveal>} />
    </main>
  )
}
