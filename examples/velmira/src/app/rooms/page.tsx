import type { Metadata } from 'next'
import Link from 'next/link'
import { assets } from '@/config/assets'
import { rooms, reservation, PHONE } from '@/content'
import { BookingForm } from '@/components/site/BookingForm'
import { CollectionSection } from '@/components/sections/Collection'
import { LookbookSection } from '@/components/sections/Lookbook'
import { ReservationSection } from '@/components/sections/Reservation'

export const metadata: Metadata = { title: 'Rooms', description: 'Nine rooms on a lake in the Gabala hills, each facing the water or the firs. Three of them, up close.' }

const details = [
  { src: assets.gallery4.src, alt: assets.gallery4.alt },
  { src: assets.gallery3.src, alt: assets.gallery3.alt },
]

export default function Rooms() {
  return (
    <>
      <CollectionSection
        as="h1"
        reveal={false}
        season="Open all year"
        title="Nine rooms, one lake"
        text="Two floors of a long wooden house, five rooms on the lake side and four facing the firs. All of them have linen, a bath or a deep shower, heated floors and windows that open. Prices include breakfast and the bathhouse."
        image={assets.arrival.src}
        alt={assets.arrival.alt}
        pieces={rooms.map((r) => ({ name: `${r.number}, ${r.name.replace('The ', '')}`, price: r.price, tag: r.tag, image: r.img.src, alt: r.img.alt, width: r.img.width, height: r.img.height, href: `#${r.id}` }))}
        more={{ text: 'The other six follow the same plan, in other light.', label: 'Ask about a room', href: '/book' }}
      />
      <LookbookSection
        link={Link}
        title="Three of the nine, up close"
        looks={rooms.map((r, i) => ({
          id: r.id, number: `${r.number}, ${r.name.replace('The ', '')}`, image: r.img.src, alt: r.img.alt,
          detail: details[i]?.src, detailAlt: details[i]?.alt,
          pieces: `${r.text} ${r.tag}, ${r.price} a night with breakfast.`,
          line: i === 2 ? 'Most guests sleep later here than they have in years.' : undefined,
          href: '/book',
        }))}
      />
      <ReservationSection title="Ask for a room" text={reservation.text} hours={reservation.hours} phone={PHONE} form={<BookingForm />} />
    </>
  )
}
