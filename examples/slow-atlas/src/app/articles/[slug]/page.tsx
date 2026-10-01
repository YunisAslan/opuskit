import type { Metadata } from 'next'
import Link from 'next/link'
import { EditorialStorySection } from '@/components/sections/EditorialStory'
import { JournalSection } from '@/components/sections/Journal'
import { NewsletterSection } from '@/components/sections/Newsletter'
import { MediaAsset } from '@/components/site/MediaAsset'
import { Reveal } from '@/components/site/motion'
import { categoryOf, entry, essays, formatDate } from '@/content/magazine'
import { newsletter } from '@/content/newsletter'

export const dynamicParams = false
export const generateStaticParams = () => essays.map((e) => ({ slug: e.slug }))
const find = (slug: string) => essays.find((e) => e.slug === slug)!

export async function generateMetadata({ params }: PageProps<'/articles/[slug]'>): Promise<Metadata> {
  const e = find((await params).slug)
  return { title: e.title, description: e.dek }
}

// The Article page: the story opens like a cover (title at display scale, the photo revealed like a curtain), then the
// calm column. After it: more essays, then the one quiet sign-up.
export default async function Article({ params }: PageProps<'/articles/[slug]'>) {
  const e = find((await params).slug)
  const more = essays.filter((x) => x.slug !== e.slug).slice(0, 3)
  return (
    <>
      <EditorialStorySection as="h1" link={Link} title={e.title} image={<MediaAsset id={e.image} priority className="size-full object-cover" />}
        caption={e.caption} pullQuote={e.pullQuote} paragraphs={e.paragraphs}
        meta={[{ label: 'Place', value: e.place }, { label: 'Issue', value: `${e.issue}, ${formatDate(e.date)}` }, { label: 'Route', value: categoryOf(e.category).name }, { label: 'Written by', value: e.author }]} />
      <div className="border-t border-(--color-border)">
        <Reveal><JournalSection link={Link} title="Keep reading" entries={more.map(entry)} allHref="/articles" /></Reveal>
      </div>
      <div className="border-t border-(--color-border)"><NewsletterSection {...newsletter} /></div>
    </>
  )
}
