import Link from 'next/link'
import { assets } from '@/config/assets'
import { books } from '@/content/books'
import { ChapterColours } from '@/components/ChapterColours'
import { Spot } from '@/components/Drawings'
import { DeskGallery } from '@/components/Galleries'
import { Gate } from '@/components/Gate'
import { Hero } from '@/components/Hero'
import { Lines } from '@/components/Lines'
import { Page } from '@/components/Page'
import { Part } from '@/components/Part'
import { email } from '@/components/SideIndex'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWork'

const desk = [assets.desk1, assets.desk3, assets.desk2, assets.desk4, assets.desk5]
const places = [
  { x: '1%', y: '8%', w: '34%', rotate: -4 },
  { x: '33%', y: '1%', w: '19%', rotate: 3 },
  { x: '55%', y: '9%', w: '36%', rotate: 5 },
  { x: '15%', y: '44%', w: '18%', rotate: -6 },
  { x: '68%', y: '42%', w: '18%', rotate: -2 },
]

export default function Home() {
  return (
    <Page>
      <div>
        <Gate />
        <Hero />
        <ChapterColours id="books" label="Four books">
          <FeaturedWorkSection link={Link} title="Four books from the bakery table"
            intro={<p>Each one started as a pencil drawing at the same long table. Scroll slowly: every book brings its own colours with it.</p>}
            projects={books.map((b) => ({ id: `home-${b.id}`, chapter: b.chapter, title: b.title, meta: `${b.publisher}, ${b.year}`, line: b.line, image: b.image.src, alt: b.image.alt, caption: b.image.caption, href: `/books#${b.id}` }))} />
        </ChapterColours>
        <Part id="desk" label="On the desk">
          <section className="px-5 py-24 md:px-10 md:py-32">
            <div className="mx-auto max-w-[1440px]">
              <div className="rise mb-10 md:mb-6 md:ml-[42%] md:max-w-[48ch]">
                <Spot kind="nib" className="-rotate-12" />
                <h2 className="type-display mt-2 text-[clamp(2.4rem,5vw,4.4rem)]">On the desk this week</h2>
                <p className="type-body mt-4">Sketches for the next book, lying where they were left. <span className="hidden md:inline">Pick one up and move it; they don’t mind.</span></p>
              </div>
              <DeskGallery photos={desk} places={places} />
            </div>
          </section>
        </Part>
        <Part id="say-hello" label="Say hello">
          <ContactCtaSection link={Link} spot={<Spot kind="moth" />}
            headline={<Lines lines={['Have a story', 'that needs drawing?']} mobile={['Have a story', 'that needs', 'drawing?']} />}
            quiet="Nell takes on two new picture books a year, and reads every manuscript that arrives."
            action={{ label: 'Commission a book', href: '/commissions' }} email={email} />
        </Part>
      </div>
    </Page>
  )
}
