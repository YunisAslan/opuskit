import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { EditorialStorySection } from '@/components/sections/EditorialStory'
import { JournalSection } from '@/components/sections/Journal'
import { SubscribeForm } from '@/components/site/SubscribeForm'
import { essays, formatDate, site } from '@/content/magazine'
import { toEntry } from '@/content/entries'

export const dynamicParams = false
export const generateStaticParams = () => essays.map((e) => ({ slug: e.slug }))

export async function generateMetadata({ params }: PageProps<'/articles/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const essay = essays.find((e) => e.slug === slug)
  return essay ? { title: essay.title, description: essay.paragraphs[0] } : {}
}

// Article: Editorial Story → Journal → Closing CTA
export default async function ArticlePage({ params }: PageProps<'/articles/[slug]'>) {
  const { slug } = await params
  const essay = essays.find((e) => e.slug === slug)
  if (!essay) notFound()
  const next = essays.filter((e) => e.slug !== slug).slice(0, 3)
  return (
    <>
      <EditorialStorySection
        headingAs="h1"
        title={essay.title}
        titleLines={essay.titleLines}
        meta={[
          { label: 'Place', value: essay.place },
          { label: 'Words', value: essay.author },
          { label: 'Published', value: formatDate(essay.date), dateTime: essay.date },
          { label: 'Section', value: essay.category },
        ]}
        image={essay.image}
        caption={essay.caption}
        quote={essay.quote}
        paragraphs={essay.paragraphs}
      />
      <JournalSection link={Link} title="Read next" entries={next.map(toEntry)} all={{ label: 'Read the archive', href: '/articles' }} />
      <ContactCtaSection id="subscribe" headline="Get the next issue." quiet="One place, every second Sunday." email={site.email}>
        <SubscribeForm />
      </ContactCtaSection>
    </>
  )
}
