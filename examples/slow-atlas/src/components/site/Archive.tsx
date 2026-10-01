import Link from 'next/link'
import { JournalSection } from '@/components/sections/Journal'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { entry, essays, pageCount, PER_PAGE } from '@/content/magazine'
import { ChapterWord } from './motion'

const href = (n: number) => (n === 1 ? '/articles' : `/articles/page/${n}`)

// The Articles page: every essay, newest first, PER_PAGE to a page. Static: /articles, /articles/page/2, …
export function Archive({ page }: { page: number }) {
  const list = essays.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  return (
    <>
      <ChapterWord word="Archive" as="h1" />
      <JournalSection link={Link} layout="list" title={page === 1 ? 'Every essay, newest first' : `Every essay, page ${page} of ${pageCount}`}
        entries={list.map(entry)}
        footer={pageCount > 1 && (
          <Pagination className="mt-12 justify-start" aria-label="Archive pages">
            <PaginationContent className="type-utility gap-1">
              {page > 1 && <PaginationItem><PaginationPrevious href={href(page - 1)} text="Newer" /></PaginationItem>}
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <PaginationItem key={n}><PaginationLink href={href(n)} isActive={n === page}>{n}</PaginationLink></PaginationItem>
              ))}
              {page < pageCount && <PaginationItem><PaginationNext href={href(page + 1)} text="Older" /></PaginationItem>}
            </PaginationContent>
          </Pagination>
        )} />
    </>
  )
}
