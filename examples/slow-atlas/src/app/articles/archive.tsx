import Link from 'next/link'
import { JournalSection } from '@/components/sections/Journal'
import { essays } from '@/content/magazine'
import { toEntry } from '@/content/entries'

// The archive, split into static pages: /articles is page 1, /articles/page/2 onwards the rest (no query string, so it exports).
export const perPage = 6
export const pageCount = Math.ceil(essays.length / perPage)
export const archiveHref = (n: number) => (n === 1 ? '/articles' : `/articles/page/${n}`)

export function Archive({ page }: { page: number }) {
  return (
    <JournalSection
      link={Link}
      headingAs="h1"
      title="Read the archive."
      titleLines={[['Read the', 'archive.']]}
      lede={`${essays.length} essays so far, newest first. Each one stays with a single place.`}
      entries={essays.slice((page - 1) * perPage, page * perPage).map(toEntry)}
      pages={{ current: page, total: pageCount, href: archiveHref }}
    />
  )
}
