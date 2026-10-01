import type { Metadata } from 'next'
import Link from 'next/link'
import { JournalSection } from '@/components/sections/Journal'
import { NewsletterSection } from '@/components/sections/Newsletter'
import { ChapterWord, Reveal } from '@/components/site/motion'
import { entry, essays } from '@/content/magazine'
import { newsletter } from '@/content/newsletter'

export const metadata: Metadata = { title: 'Newsletter', description: 'One essay, one place, every second Sunday morning. Free, and easy to leave.' }

export default function Newsletter() {
  return (
    <>
      <ChapterWord word="Sundays" as="h1" />
      <NewsletterSection {...newsletter} title="One essay, every second Sunday"
        text="Each issue is a single long essay about a single place, with one photograph and nothing else. It arrives on Sunday at seven, early enough to read before the day starts. Leaving takes one click." />
      <div className="border-t border-(--color-border)">
        <Reveal><JournalSection link={Link} title="What recent issues looked like" entries={essays.slice(0, 3).map(entry)} allHref="/articles" allLabel="Read the archive" /></Reveal>
      </div>
    </>
  )
}
