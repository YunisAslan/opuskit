import type { Metadata } from 'next'
import Link from 'next/link'
import { assets } from '@/config/assets'
import { Spot } from '@/components/Drawings'
import { Lines } from '@/components/Lines'
import { Page } from '@/components/Page'
import { Part } from '@/components/Part'
import { email } from '@/components/SideIndex'
import { AboutSection } from '@/components/sections/About'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { ProcessSection } from '@/components/sections/Process'
import { StatsSection } from '@/components/sections/Stats'
import { TestimonialsSection } from '@/components/sections/Testimonials'

export const metadata: Metadata = { title: 'About', description: 'Nell Arden draws picture books in ink and watercolour at a long table in an old bakery in Sheki. How a book gets made, in four steps.' }

const places = [assets.studio, assets.sheki]

export default function About() {
  return (
    <Page>
      <Part id="nell" label="Nell">
        <AboutSection as="h1" title="About Nell" image={assets.portrait.src} alt={assets.portrait.alt} caption={assets.portrait.caption}
          statement="I draw the small animals people walk past, and give them a reason to stay on the page."
          bio={<>
            <p>Nell Arden has written and illustrated picture books since 2016, when The Moths Who Came to Tea found a publisher. A year later she moved her table into an old bakery in Sheki, under the hills, where the bread ovens used to be.</p>
            <p>Every page starts in pencil, goes down in ink with a dip pen and is coloured in watercolour by hand. Nothing is painted on a screen; the computer only scans what the table made.</p>
          </>}>
          <ul className="mt-14 grid grid-cols-2 gap-5 md:-ml-[6%] md:gap-8">
            {places.map((p, i) => (
              <li key={p.src}>
                <figure className={`taped ${i ? 'tape-right mt-10 rotate-3' : '-rotate-2'} bg-(--color-surface) p-2 shadow-[0_12px_26px_rgb(0_0_0/0.15)]`}>
                  <span className="clip block"><img src={p.src} alt={p.alt} loading="lazy" className="aspect-[4/3] w-full rounded-(--radius-media) object-cover" /></span>
                  <figcaption className="type-utility mt-2 text-(--color-muted)">{p.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </AboutSection>
      </Part>
      <Part id="process" label="How a book gets made">
        <ProcessSection title="How a book gets made" spot={<Spot kind="nib" className="-rotate-12" />}
          intro="The same four steps for every book, whoever wrote it. A 32-page picture book takes about six months at the table."
          steps={[
            { name: 'The pencil rough', text: 'Every spread is drawn small and fast in pencil, with the words pasted beside it, so the author and editor can see the whole book in an afternoon.', duration: '3 to 4 weeks', image: assets.process1.src, alt: assets.process1.alt },
            { name: 'The ink', text: 'Once the roughs are agreed, each page is redrawn full size with a dip pen. This is where the animals get their faces.', duration: '6 to 8 weeks', image: assets.process2.src, alt: assets.process2.alt },
            { name: 'The colour', text: 'Watercolour in thin washes, left to dry overnight between layers. Mistakes stay; sometimes they become the best part of the page.', duration: '8 to 10 weeks', image: assets.process3.src, alt: assets.process3.alt },
            { name: 'The pages laid out', text: 'The paintings are scanned at the studio, set with the text and sent to print with a colour proof Nell checks by eye, page by page.', duration: '2 weeks', image: assets.process4.src, alt: assets.process4.alt },
          ]} />
      </Part>
      <Part id="numbers" label="In numbers">
        <StatsSection title="Counted by hand"
          stats={[{ value: '11', label: 'picture books in print' }, { value: '9', label: 'languages they are read in' }, { value: '2017', label: 'the year the bakery became a studio' }, { value: '2', label: 'new books a year, no more' }]}
          note="Plus around forty covers for other people’s novels, and one very large moth painted on the bakery door." />
      </Part>
      <Part id="kind-words" label="Kind words">
        <TestimonialsSection title="What editors and authors say"
          quotes={[
            { quote: 'Nell’s roughs are so complete you could print them. Then the finished pages arrive and they’re better.', name: 'Hester Vale', role: 'Publisher, Hollin & Pike' },
            { quote: 'She found the joke in my manuscript I didn’t know was there, and drew it on page nine.', name: 'Tomas Reyhan', role: 'author of Sparrow Keeps the Spring' },
            { quote: 'Deadlines kept, proofs checked by eye, and the moths always look like moths.', name: 'Ines Calder', role: 'Art director, Tidewell Press' },
            { quote: 'Our readers wrote in asking where the rooster lives. We told them: Sheki.', name: 'Samira Huseynova', role: 'Editor, Little Lantern Magazine' },
          ]} />
      </Part>
      <Part id="write" label="Write to Nell">
        <ContactCtaSection link={Link} spot={<Spot kind="drop" />}
          headline={<Lines lines={['Bring Nell', 'a story.']} />}
          quiet="She answers every letter herself, usually within the week."
          action={{ label: 'Commission a book', href: '/commissions' }} email={email} />
      </Part>
    </Page>
  )
}
