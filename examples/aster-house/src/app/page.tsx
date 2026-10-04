import Link from 'next/link'
import { HeroFilm } from '@/components/HeroFilm'
import { Lines } from '@/components/Lines'
import { Motif } from '@/components/Motif'
import { TextLink } from '@/components/InkLinks'
import { StatusBadge } from '@/components/StatusBadge'
import { IntroSection } from '@/components/sections/Intro'
import { FeatureRowsSection } from '@/components/sections/FeatureRows'
import { ProductGridSection } from '@/components/sections/ProductGrid'
import { GallerySection } from '@/components/sections/Gallery'
import { LocationSection } from '@/components/sections/Location'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { media } from '@/config/assets'
import { houses, price } from '@/data/houses'
import { site } from '@/data/site'

const hours = [
  { name: 'Dawn and Six', kicker: '05:40 and 06:00, facing east', img: 'hourDawn', slug: 'dawn', text: 'The first two houses take the sunrise over the sea. Their bedrooms are on the east wall, so the day starts with light on the stone, not an alarm.' },
  { name: 'Eight and Ten', kicker: '08:00 and 10:00, facing south-east', img: 'hourMorning', slug: 'ten', text: 'Kitchen hours. Window frames print themselves across the plaster and walk slowly down the wall while the coffee is made.' },
  { name: 'Noon and Two', kicker: '12:00 and 14:00, facing south', img: 'hourNoon', slug: 'two', text: 'The brightest houses keep the sun overhead. A glass roof over the hall takes the light straight down the middle, and the rooms either side stay cool.' },
  { name: 'Four and Golden', kicker: '16:00 and 17:20, facing south-west', img: 'hourAfternoon', slug: 'four', text: 'A slab of afternoon light crosses the long stone wall and holds there. Golden, the largest house, keeps it until the hour before sunset.' },
  { name: 'Six Evening and Dusk', kicker: '18:00 and 19:30, facing west', img: 'hourEvening', slug: 'six-evening', text: 'Low, warm sun reaches the back wall of the living room. The terraces are set lower here, so the sunset stays in view from the sofa.' },
  { name: 'Blue Hour and Night', kicker: '20:00 and 22:00, facing north-west', img: 'hourDusk', slug: 'night', text: 'The last two houses turn to the bay. After the sun has gone, one deep window keeps the blue, and later the lights of Baku come on across the water.' },
] as const

export default function Home() {
  const free = houses.filter((h) => h.status === 'available').slice(0, 4)
  return (
    <>
      <HeroFilm />

      <IntroSection
        label={<><Motif len={96} rot={-3} />Shikhov, on the Caspian</>}
        statement={<Lines
          lines={['Twelve houses cut into the cliff', 'above the Caspian. Each one is', 'built around the light of a single', 'hour of the day.']}
          mobile={['Twelve houses', 'cut into the cliff', 'above the Caspian.', 'Each one is built', 'around the light', 'of a single hour.']} />}
        body="Leyla Gadirli drew the row so that no two houses share an hour. Dawn takes the sunrise, Noon takes the sun overhead, Night looks across the bay to the lights of Baku. One release of twelve, finished in spring 2027."
      />

      <FeatureRowsSection
        link={TextLink}
        title={<><Motif len={72} rot={-1} />The hours</>}
        intro="Each house has one room set to catch its hour: a window cut at the right angle, a wall left bare to hold the light. These are those rooms, two houses to an hour."
        rows={hours.map((h) => ({ name: h.name, kicker: h.kicker, text: h.text, image: media(h.img).src, alt: media(h.img).alt, link: { label: `See ${houses.find((x) => x.slug === h.slug)!.name}`, href: `/residences/${h.slug}` } }))}
      />

      <ProductGridSection
        link={Link}
        title={<><Motif len={72} rot={1} />Still available</>}
        intro="Seven of the twelve houses are free to reserve. Three are reserved and two are sold."
        products={free.map((h) => ({ name: h.name, price: price(h.price), image: media(h.image).src, alt: media(h.image).alt, hoverImage: media(h.second).src, href: `/residences/${h.slug}`, status: <StatusBadge status={h.status} />, details: [`Faces ${h.time}`, `${h.area} m², ${h.bedrooms} bedrooms`] }))}
        more={<span className="type-body"><TextLink href="/residences">All twelve houses, with prices</TextLink></span>}
      />

      <div id="architect" className="scroll-mt-16" />
      <GallerySection
        title={<><Motif len={72} rot={2} />On the rock</>}
        photos={[
          { ...media('cliff2'), caption: 'The row from the air', text: 'The houses step down the limestone in pairs, each turned a few degrees from its neighbour to face its own hour.' },
          { ...media('architect'), caption: `${site.architect.name}, architect`, text: <p className="type-heading [font-size:clamp(1.3rem,2vw,1.75rem)] [font-weight:400]">“I didn’t design twelve houses. I designed twelve windows and built a house behind each one. The sun does the rest, at the same time every day.”</p> },
          { ...media('terracePool'), caption: 'The lower terraces', text: 'Every house has a stone terrace at sea level and a plunge pool fed with filtered sea water.' },
          { ...media('terraceStone'), caption: 'Parapet, Blue Hour', text: 'Walls are the cliff’s own limestone, quarried during the dig and laid back in place.' },
          { ...media('stair'), caption: 'The stair to the sea rooms', text: 'Inside, one stair runs down through the rock from the living floor to the bedrooms by the water.' },
          { ...media('roomBalcony'), caption: 'A sea room', text: 'The lowest rooms open straight onto the water. You hear the Caspian before you see it.' },
        ]}
      />

      <LocationSection
        id="the-site"
        title={<><Motif len={64} rot={3} />The site</>}
        address={site.siteAddress}
        hours={['Show house open Saturday and Sunday, 11:00 to 17:00', 'Weekdays by appointment']}
        notes="Twenty-five minutes from the centre of Baku along the Bayil coast road. We collect visitors from the sales office on Uzeyir Hajibeyov Street."
        mapUrl={site.siteMap}
        image={media('cliff1').src}
        alt={media('cliff1').alt}
      />

      <ContactCtaSection
        link={Link}
        headline={<Lines lines={['Come and stand', 'in the light.']} />}
        quiet="Viewings at the show house, Ten, every weekend."
        action={{ label: 'Book a viewing', href: '/book' }}
        email={site.email}
      />
    </>
  )
}
