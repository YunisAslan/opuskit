'use client'
import Link from 'next/link'
import { useState, type ElementType } from 'react'
import { Badge } from '@/components/ui/badge'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination'
import { TextEffect } from '@/components/pieces/TextEffect'
// OpusKit section — Journal: the latest entries as an editorial list — date, category, title — three at a time.
export type Entry = { title: string; date: string; category: string; href: string; image?: string; alt?: string }

const PER = 3

export function JournalSection({ link: L = Link, title, eyebrow, entries }: { link?: ElementType; title: string; eyebrow?: string; entries: Entry[] }) {
  const [page, setPage] = useState(0)
  const pages = Math.ceil(entries.length / PER)
  return (
    <section id="journal" className="section-y scroll-mt-24 px-5 md:px-6">
      <div className="mx-auto max-w-[1200px]">
        {eyebrow && <p className="type-body max-w-[40ch]">{eyebrow}</p>}
        <TextEffect className="type-heading mt-3">{title}</TextEffect>
        <ul className="mt-10 grid border-t border-(--color-text)/25 md:grid-cols-3 md:gap-8 md:border-t-0">
          {entries.slice(page * PER, page * PER + PER).map((e) => (
            <li key={e.href + e.title} className="border-b border-(--color-text)/25 md:border-t md:border-b-0"><L href={e.href} className="group block py-6">
              <p className="type-utility flex items-center gap-3 text-(--color-muted)">
                <Badge className="h-6 rounded-(--radius-button) border border-(--color-text) bg-transparent px-2 text-(--color-text) type-utility">{e.category}</Badge>
                <time>{e.date}</time>
              </p>
              <h3 className="type-heading mt-4 text-balance decoration-current decoration-wavy decoration-2 underline-offset-[6px] [font-size:clamp(1.3rem,1.8vw,1.6rem)] group-hover:underline group-focus-visible:underline">{e.title}</h3>
            </L></li>
          ))}
        </ul>
        {pages > 1 && (
          <Pagination className="mt-10 justify-start">
            <PaginationContent className="gap-2">
              {Array.from({ length: pages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink href="#journal" isActive={i === page} aria-label={`Journal page ${i + 1}`}
                    onClick={(ev) => { ev.preventDefault(); setPage(i) }}
                    className={`type-utility size-11 rounded-(--radius-button) border border-(--color-text) ${i === page ? 'bg-(--color-text) text-(--color-background)' : 'bg-transparent text-(--color-text) hover:bg-(--color-surface)'}`}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  )
}
