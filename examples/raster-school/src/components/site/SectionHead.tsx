// Every part opens the same way: a white rule on the column lines, the heading on column 1, an aside where the grid
// puts it (column 10 on desktop). A list's heading carries its count, like Questions (14).
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function SectionHead({ title, count, aside, as: Tag = 'h2', className }: { title: ReactNode; count?: number; aside?: ReactNode; as?: 'h1' | 'h2'; className?: string }) {
  return (
    <div className={cn('raster gap-y-3 border-t border-(--color-text) pt-4', className)}>
      <Tag className="type-heading col-span-4 sm:col-span-4 lg:col-span-7">
        {title}
        {count !== undefined && <span className="type-utility ml-2 align-top text-(--color-muted)">({count})</span>}
      </Tag>
      {aside && <div className="type-utility col-span-4 text-(--color-muted) sm:col-span-2 lg:col-span-3 lg:col-start-10">{aside}</div>}
    </div>
  )
}

/** A part of the page: on the ground it takes half the section space above and below (so two parts sit one
 *  --section-y apart); as a band (surface, inverse) it takes the full space inside its colour. */
export function Section({ tone, className, children, id, labelledBy }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; className?: string; children: ReactNode; id?: string; labelledBy?: string }) {
  const band = tone && tone !== 'ground'
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-tone={band ? tone : undefined}
      className={cn('relative px-(--gutter)', band ? 'py-(--section-y)' : 'py-[calc(var(--section-y)/2)]', className)}
    >
      {children}
    </section>
  )
}
