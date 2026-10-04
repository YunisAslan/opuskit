import type { ReactNode } from 'react'
import { TextScramble } from '@/components/pieces/TextScramble'

// A chapter of a page: a hairline rule, a numbered // label that decodes as it arrives, then the section.
// `grid` lays the 1px hairline grid behind it. The wrapper is what the reveal observer watches.
export function Chapter({ n, name, grid = false, id, children }: { n: string; name: string; grid?: boolean; id?: string; children: ReactNode }) {
  return (
    <div id={id} data-reveal className={`relative border-t border-(--color-border) ${grid ? 'hairline-grid' : ''}`}>
      <div className="absolute inset-x-0 top-0 px-6 pt-8">
        <p className="mx-auto max-w-[1440px]">
          <TextScramble duration={0.6} replayOnHover={false} className="type-utility text-(--color-muted)">{`// ${n} ${name}`}</TextScramble>
        </p>
      </div>
      {children}
    </div>
  )
}
