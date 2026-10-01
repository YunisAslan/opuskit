import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AboutSection } from '@/components/sections/About'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { IntroSection } from '@/components/sections/Intro'
import { JournalSection } from '@/components/sections/Journal'
import { Headline } from '@/components/site/motion'
import { SubscribeForm } from '@/components/site/SubscribeForm'
import { about, essays, site, subscribeHref } from '@/content/magazine'
import { toEntry } from '@/content/entries'

// Home: Hero → Intro → Journal → About → Closing CTA
export default function Home() {
  return (
    <>
      {/* Hero — Typographic statement: one sentence at display scale on the grid, metadata row beneath (4 × 3 columns). */}
      <section className="px-6 pt-12 pb-12 md:pt-16 md:pb-16">
        <Headline
          as="h1"
          onLoad
          lines={['One place,', ['told', 'slowly.']]}
          className="type-display text-[15vw] leading-[0.88] tracking-[-0.05em] md:text-[min(14vw,16rem)]"
        />
        <dl className="mt-12 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-(--color-border) pt-4 md:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <dt className="type-utility text-(--color-muted)">{site.issue}</dt>
            <dd className="type-utility mt-1 [font-size:1rem]">{site.issueDate}</dd>
          </div>
          <div className="lg:col-span-3">
            <dt className="type-utility text-(--color-muted)">This issue</dt>
            <dd className="type-utility mt-1 [font-size:1rem]">{essays[0].place}</dd>
          </div>
          <div className="col-span-2 lg:col-span-3">
            <dt className="sr-only">What it is</dt>
            <dd className="type-body max-w-[36ch]">Long-form travel essays, each about a single place, sent free every second Sunday.</dd>
          </div>
          <div className="col-span-2 lg:col-span-3 lg:justify-self-start">
            <dt className="sr-only">Subscribe</dt>
            <dd><Button asChild size="lg" className="w-full sm:w-auto"><Link href={subscribeHref}>Subscribe</Link></Button></dd>
          </div>
        </dl>
      </section>

      <IntroSection
        label="What this is"
        statement={['One essay every second Sunday.', 'One place per essay.', 'Written by someone who stayed long enough to be bored.']}
        body="For readers who would rather know one town well than ten towns badly. No lists, no rankings, no sponsored hotels."
      />

      <JournalSection link={Link} title="Latest essays" entries={essays.slice(0, 3).map(toEntry)} all={{ label: 'Read the archive', href: '/articles' }} />

      <AboutSection title={about.label} image="team1" caption={about.caption} statement={about.statement} bio={about.bio} />

      <ContactCtaSection id="subscribe" headline="Get the next issue." quiet="One place, every second Sunday." email={site.email}>
        <SubscribeForm />
      </ContactCtaSection>
    </>
  )
}
