import type { Metadata } from 'next'
import Link from 'next/link'
import { JournalSection } from '@/components/sections/Journal'
import { ChapterWord } from '@/components/site/motion'
import { categories, categoryOf, countLabel, entry, essaysIn, type CategorySlug } from '@/content/magazine'

export const dynamicParams = false
export const generateStaticParams = () => categories.map((c) => ({ slug: c.slug }))

export async function generateMetadata({ params }: PageProps<'/routes/[slug]'>): Promise<Metadata> {
  const c = categoryOf((await params).slug as CategorySlug)
  return { title: c.name, description: c.line }
}

// One route (category): the Articles page, narrowed to the essays that arrive this way.
export default async function Route({ params }: PageProps<'/routes/[slug]'>) {
  const c = categoryOf((await params).slug as CategorySlug)
  const list = essaysIn(c.slug)
  return (
    <>
      <ChapterWord word={c.name} as="h1" />
      <p className="type-body max-w-[52ch] px-6 pt-10 text-(--color-muted)">{c.line}</p>
      <JournalSection link={Link} layout="list" title={`${countLabel(list.length)} ${c.name.toLowerCase()}`} entries={list.map(entry)} allHref="/articles" />
    </>
  )
}
