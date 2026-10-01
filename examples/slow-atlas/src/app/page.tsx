import Link from 'next/link'
import { CategoriesSection } from '@/components/sections/Categories'
import { EditorialStorySection } from '@/components/sections/EditorialStory'
import { JournalSection } from '@/components/sections/Journal'
import { NewsletterSection } from '@/components/sections/Newsletter'
import { Hero } from '@/components/site/Hero'
import { MediaAsset } from '@/components/site/MediaAsset'
import { ChapterWord, Reveal } from '@/components/site/motion'
import { assets } from '@/config/assets'
import { categories, countLabel, entry, essays, essaysIn, formatDate } from '@/content/magazine'
import { newsletter } from '@/content/newsletter'

export default function Home() {
  const [lead, ...rest] = essays
  return (
    <>
      <Hero issue={lead.issue} date={formatDate(lead.date)} latest={{ title: lead.title, href: `/articles/${lead.slug}` }} />
      <EditorialStorySection link={Link} title={lead.title} image={<MediaAsset id={lead.image} className="size-full object-cover" />}
        caption={lead.caption} meta={[{ label: 'Place', value: lead.place }, { label: 'Written by', value: lead.author }]}
        paragraphs={lead.paragraphs.slice(0, 2)} more={{ href: `/articles/${lead.slug}`, label: 'Read the whole essay' }} />
      <ChapterWord word="Dispatches" />
      <Reveal><JournalSection link={Link} title="The last three issues" entries={rest.slice(0, 3).map(entry)} allHref="/articles" /></Reveal>
      <Reveal>
        <CategoriesSection link={Link} title="Four ways to arrive" items={categories.map((c) => ({
          name: c.name, href: `/routes/${c.slug}`, image: assets[c.image].src, alt: assets[c.image].alt, count: countLabel(essaysIn(c.slug).length),
        }))} />
      </Reveal>
      <div className="border-t border-(--color-border)"><NewsletterSection {...newsletter} /></div>
    </>
  )
}
