import type { ReactNode } from 'react'
import { TextScramble } from '@/components/pieces/TextScramble'

// The top of every inner page: a // label that decodes, the page's one h1, and a lead. Clears the header.
export function PageHead({ label, title, lead, children }: { label: string; title: ReactNode; lead: string; children?: ReactNode }) {
  return (
    <div className="px-6 pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-12">
        <p className="md:col-span-12"><TextScramble duration={0.6} replayOnHover={false} className="type-utility text-(--color-muted)">{`// ${label}`}</TextScramble></p>
        <h1 className="type-display text-balance md:col-span-10">{title}</h1>
        <div className="md:col-span-6">
          <p className="type-body text-[1.125rem] text-(--color-muted) md:text-[1.25rem]">{lead}</p>
          {children}
        </div>
      </div>
    </div>
  )
}
