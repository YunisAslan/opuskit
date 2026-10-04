import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArticleSection } from '@/components/sections/Article'
import { JournalSection } from '@/components/sections/Journal'
import { TextEffect } from '@/components/pieces/TextEffect'
import { ClipReveal } from '@/components/site/ClipReveal'
import { Crumbs } from '@/components/site/Crumbs'
import { Newsletter } from '@/components/site/Newsletter'
import { Stop } from '@/components/site/Stop'
import { assets } from '@/config/assets'
import { people, postBySlug, posts } from '@/data/journal'
import { journalEntries } from '@/lib/grid'

export const dynamicParams = false
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: PageProps<'/journal/[slug]'>): Promise<Metadata> {
  const p = postBySlug((await params).slug)
  return p ? { title: p.title, description: p.dek } : {}
}

export default async function Article({ params }: PageProps<'/journal/[slug]'>) {
  const p = postBySlug((await params).slug)
  if (!p) notFound()
  const a = people[p.author]
  return (
    <>
      <Crumbs trail={[{ label: 'Journal', href: '/journal' }]} here={p.title} />
      <Stop id="story" name="The story" fade={false}>
        <ClipReveal>
          <ArticleSection kicker={p.kicker} title={<TextEffect as="span">{p.title}</TextEffect>} dek={p.dek} date={p.date}
            author={{ name: a.name, role: a.role, bio: a.bio, image: assets[a.image].src }}
            image={{ src: assets[p.image].src, alt: assets[p.image].alt, caption: p.caption }}
            body={p.body.map((b) => typeof b === 'object' && 'image' in b ? { image: assets[b.image].src, alt: assets[b.image].alt, caption: b.caption } : b)}
            tags={p.tags} />
        </ClipReveal>
      </Stop>
      <Stop id="next" name="Read next">
        <JournalSection link={Link} title="Read next" entries={journalEntries(p.slug)} allHref="/journal" />
      </Stop>
      <Stop id="way-in" name="The way in"><Newsletter /></Stop>
    </>
  )
}
