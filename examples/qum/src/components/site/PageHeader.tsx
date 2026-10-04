import type { ReactNode } from 'react'
import { TextEffect } from '@/components/pieces/TextEffect'

// The opening of a page without a photograph: the h1 (words arrive), one plain line under it.
export function PageHeader({ title, line, children }: { title: string; line?: string; children?: ReactNode }) {
  return (
    <section className="px-(--gutter) pb-4 pt-14 md:pt-24">
      <div className="mx-auto max-w-(--container)">
        {children}
        <TextEffect as="h1" className="type-display max-w-[16ch] text-balance">{title}</TextEffect>
        {line && <p className="type-body mt-6 max-w-[56ch] text-(--color-muted)">{line}</p>}
      </div>
    </section>
  )
}
