import type { Metadata } from 'next'
import Link from 'next/link'
import { assets } from '@/config/assets'
import { books } from '@/content/books'
import { Spot } from '@/components/Drawings'
import { SpreadGallery } from '@/components/Galleries'
import { Lines } from '@/components/Lines'
import { Page } from '@/components/Page'
import { Part } from '@/components/Part'
import { email } from '@/components/SideIndex'
import { CaseStudySection } from '@/components/sections/CaseStudy'
import { ClientsSection } from '@/components/sections/Clients'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWork'

export const metadata: Metadata = { title: 'Books', description: 'Four picture books by Nell Arden, a closer look at The Moths Who Came to Tea, and pages from other books and sketchbooks.' }

const spreads = [assets.spread1, assets.spread2, assets.spread3, assets.spread4, assets.spread5, assets.spread6, assets.spread7, assets.spread8]

export default function Books() {
  return (
    <Page>
      <Part id="the-books" label="The books">
        <FeaturedWorkSection link={Link} as="h1" title="The books"
          intro={<p>Picture books from the bakery table, some written by Nell and some by authors she was lucky to be paired with. Ink first, then watercolour, all by hand. The first one, the moth book, gets a closer look below.</p>}
          projects={books.filter((b) => b.id !== 'moths').map((b) => ({ id: b.id, chapter: b.chapter, title: b.title, meta: `${b.kind}. ${b.publisher}, ${b.year}`, line: `${b.line} ${b.more}`, image: b.image.src, alt: b.image.alt, caption: b.image.caption, href: `#${b.id}` }))} />
      </Part>
      <Part id="moths" label="The moth book, closer">
        <CaseStudySection title="The Moths Who Came to Tea, closer" spot={<Spot kind="moth" />}
          image={assets.bookMoths.src} alt={assets.bookMoths.alt} caption={assets.bookMoths.caption}
          aside={assets.mothSpecimens}
          facts={[{ label: 'Publisher', value: 'Hollin & Pike' }, { label: 'First printed', value: '2016' }, { label: 'Nell did', value: 'Words and pictures' }, { label: 'Since then', value: '8 printings, 9 languages' }]}
          paragraphs={[
            'The brief was a bedtime book about moths. The trouble is that most children meet moths as small grey things banging at a lamp, and nobody asks those to tea.',
            'So Nell drew every guest from three old specimen plates: real species with their real markings, the Tiger, the Emperor, the Garden Carpet. Then she let each one do a single wrong thing: hold a spoon, wear a ribbon, sit far too close to the lamp.',
            'The book has been reprinted eight times and read aloud in nine languages. It also gave the studio its name, after a reader wrote to ask whether the moths had been drawn in an inkwell.',
          ]} />
      </Part>
      <Part id="sketchbooks" label="From the sketchbooks">
        <section className="px-5 py-24 md:px-10 md:py-40">
          <div className="mx-auto max-w-[1440px]">
            <div className="rise mb-12 md:ml-[8%] md:max-w-[50ch]">
              <Spot kind="drop" className="rotate-6" />
              <h2 className="type-display mt-2 text-[clamp(2.4rem,5vw,4.4rem)]">From other books and sketchbooks</h2>
              <p className="type-body mt-4">Keep scrolling and the table stands up. Pages from covers, counting books and the sketchbooks in between.</p>
            </div>
            <SpreadGallery photos={spreads} />
          </div>
        </section>
      </Part>
      <Part id="publishers" label="Publishers">
        <ClientsSection title="Publishers and friends of the studio" note="The houses that have printed Nell’s books, and the people who keep asking for drawings."
          names={['Larkmoor Books', 'Tidewell Press', 'Fenlark Editions', 'Hollin & Pike', 'Little Lantern Magazine', 'The Paper Kite Festival', 'Saffron Street Theatre', 'Caspian Reading Club']} />
      </Part>
      <Part id="next-book" label="The next book">
        <ContactCtaSection link={Link} spot={<Spot kind="nib" className="-rotate-12" />}
          headline={<Lines lines={['Your book, next', 'on the table?']} mobile={['Your book,', 'next on', 'the table?']} />}
          quiet="Picture books and covers, from the first pencil rough to print-ready pages."
          action={{ label: 'Commission a book', href: '/commissions' }} email={email} />
      </Part>
    </Page>
  )
}
