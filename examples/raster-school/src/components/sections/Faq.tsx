// OpusKit section — FAQ: real questions in a narrow column beside the title. The list itself is the project's own
// shadcn/ui Accordion (type="single" collapsible) — see FaqList. Fitted to Raster School: the title (with its count)
// holds columns 1–4, the questions run from column 6 to 12 on the hairline; a link to every question sits under the title.
import type { ElementType, ReactNode } from 'react'
import { Section } from '@/components/site/SectionHead'
import { FaqList } from '@/components/site/FaqList'
import type { Faq } from '@/content/site'

export function FaqSection({ tone, title, items, more, link: L = 'a', children }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; items?: Faq[]; more?: { label: string; href: string }; link?: ElementType; children?: ReactNode
}) {
  return (
    <Section tone={tone}>
      <div className="raster gap-y-8 border-t border-(--color-text) pt-4">
        <div className="col-span-4 sm:col-span-6 lg:col-span-4">
          <h2 className="type-heading">
            {title}
            {items && <span className="type-utility ml-2 align-top text-(--color-muted)">({items.length})</span>}
          </h2>
          {more && <L href={more.href} className="press type-utility link-line mt-4 inline-flex min-h-11 items-center underline decoration-current">{more.label}</L>}
        </div>
        <div className="col-span-4 sm:col-span-6 lg:col-span-7 lg:col-start-6">{children ?? (items && <FaqList items={items} />)}</div>
      </div>
    </Section>
  )
}
