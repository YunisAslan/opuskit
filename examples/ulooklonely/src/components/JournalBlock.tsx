'use client'
// Journal with client-side pages of three — the section itself stays the ready OpusKit component.
import { useState } from 'react'
import { JournalSection, type Entry } from '@/components/sections/Journal'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

const PER_PAGE = 3

export function JournalBlock({ entries }: { entries: Entry[] }) {
  const [page, setPage] = useState(0)
  const pages = Math.ceil(entries.length / PER_PAGE)
  const go = (p: number) => (e: React.MouseEvent) => { e.preventDefault(); setPage(Math.min(Math.max(p, 0), pages - 1)) }

  return (
    <JournalSection
      title="Journal"
      entries={entries.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)}
      footer={pages > 1 && (
        <Pagination className="mt-12 justify-start">
          <PaginationContent className="type-utility gap-2">
            <PaginationItem><PaginationPrevious href="#journal" onClick={go(page - 1)} aria-disabled={page === 0} className="h-11 aria-disabled:opacity-40" /></PaginationItem>
            {Array.from({ length: pages }, (_, i) => (
              <PaginationItem key={i}><PaginationLink href="#journal" isActive={i === page} onClick={go(i)} className="size-11">{i + 1}</PaginationLink></PaginationItem>
            ))}
            <PaginationItem><PaginationNext href="#journal" onClick={go(page + 1)} aria-disabled={page === pages - 1} className="h-11 aria-disabled:opacity-40" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    />
  )
}
