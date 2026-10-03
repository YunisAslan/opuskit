import Link from 'next/link'
import { assets } from '@/config/assets'
import { rooms, reservation, PHONE } from '@/content'
import { HeroVideo } from '@/components/site/HeroVideo'
import { Chapter } from '@/components/site/Motif'
import { BookingForm } from '@/components/site/BookingForm'
import { Button } from '@/components/ui/button'
import { IntroSection } from '@/components/sections/Intro'
import { CollectionSection } from '@/components/sections/Collection'
import { FeatureRowsSection } from '@/components/sections/FeatureRows'
import { JournalSection } from '@/components/sections/Journal'
import { ReservationSection } from '@/components/sections/Reservation'

export default function Home() {
  return (
    <>
      <section className="relative h-svh min-h-[560px] overflow-hidden">
        <HeroVideo />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-(--color-background)/25" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-(--color-background)/70 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-(--color-background) via-(--color-background)/70 to-transparent" />
        <div className="shell absolute inset-x-0 bottom-0 pb-24 md:pb-20">
          <Chapter pose="hero">
            <h1 className="type-display [font-size:clamp(2.5rem,10.4vw,4.5rem)] md:[font-size:clamp(3rem,7.2vw,6.5rem)]">
              Warm water,<br />cold air,<br />long mornings.
            </h1>
          </Chapter>
          <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-center md:gap-10">
            <p className="type-body max-w-[36ch]">Nine rooms and a bathhouse on a lake in the Gabala hills.</p>
            <Button asChild size="lg" className="self-start md:self-auto"><Link href="/book">Check availability</Link></Button>
          </div>
        </div>
      </section>

      <IntroSection
        label="The house"
        statement={['A lake house for people', 'who like warm water,', 'cold air and nowhere', 'they need to be.']}
        body="We are three and a half hours from Baku, at the end of a road through the firs. Breakfast runs until eleven, the sauna is lit every afternoon, and the mist usually lifts off the water by ten."
      />

      <CollectionSection
        season="Autumn and winter 2026"
        title="Nine rooms, one lake"
        text="Every room faces the water or the firs. Wide floorboards, linen, heating under the floor so you can stand at the glass barefoot in January, and no televisions. Here are three of the nine."
        image={assets.arrival.src}
        alt={assets.arrival.alt}
        pieces={rooms.map((r) => ({ name: `${r.number}, ${r.name.replace('The ', '')}`, price: r.price, tag: r.tag, image: r.img.src, alt: r.img.alt, width: r.img.width, height: r.img.height, href: `/rooms#${r.id}` }))}
        more={{ text: 'Six more rooms, each a little different.', label: 'See the rooms', href: '/rooms' }}
      />

      <FeatureRowsSection
        link={Link}
        title="The bathhouse"
        rows={[
          { name: 'Warm water under a wooden roof', text: 'The pool is open on three sides and kept at 36 degrees all year. In January the snow settles on the firs a few metres away while you float.', image: assets.bath.src, alt: assets.bath.alt, width: assets.bath.width, height: assets.bath.height, link: { label: 'More of the bathhouse', href: '/gallery#bathhouse' } },
          { name: 'A sauna lit with birch and oak', text: 'A cast-iron stove, plank benches and one long window onto the trees. We light it at four each afternoon; by five it is ready, and the lake is twenty steps away.', image: assets.sauna.src, alt: assets.sauna.alt, width: assets.sauna.width, height: assets.sauna.height },
          { name: 'The lake, a step from the door', text: 'An old dock runs out from the garden. Swim from May to September, or take the rowing boat out at first light, while the mist still sits on the water.', image: assets.lake.src, alt: assets.lake.alt, width: assets.lake.width, height: assets.lake.height, link: { label: 'How to find us', href: '/getting-here' } },
        ]}
      />

      <JournalSection
        link={Link}
        title="Notes from the lake"
        entries={[
          { title: 'The first fog of October', date: '28 September 2026', dateTime: '2026-09-28', category: 'Seasons', href: '/gallery#firs-in-fog', image: assets.gallery2.src, alt: assets.gallery2.alt },
          { title: 'What we pour before breakfast', date: '14 September 2026', dateTime: '2026-09-14', category: 'Kitchen', href: '/gallery#morning-tea', image: assets.gallery3.src, alt: assets.gallery3.alt },
          { title: 'Linen, dried in the hill wind', date: '2 September 2026', dateTime: '2026-09-02', category: 'The house', href: '/gallery#towels', image: assets.gallery4.src, alt: assets.gallery4.alt },
        ]}
      />

      <ReservationSection title="Stay a while" text={reservation.text} hours={reservation.hours} phone={PHONE} form={<BookingForm />} />
    </>
  )
}
