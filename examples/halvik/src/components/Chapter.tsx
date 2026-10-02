import type { ElementType, ReactNode } from 'react'
import { MotifSlot } from '@/components/Motif'
import { TextEffect } from '@/components/pieces/TextEffect'
// A chapter title with the place the travelling mark lands beside it. `effect`: the words arrive (TextEffect) — used on
// the h1 and at most two section headings per page.
export function Chapter({ as = 'h2', children, effect = false, className, slot, aside }: {
  as?: 'h1' | 'h2'; children: string; effect?: boolean; className?: string; aside?: ReactNode
  slot: { className: string; rotate?: number; first?: boolean }
}) {
  const Tag = as as ElementType
  return (
    <div className="flex items-center gap-4 md:gap-5">
      <MotifSlot {...slot} />
      {effect ? <TextEffect as={as} className={className}>{children}</TextEffect> : <Tag className={className}>{children}</Tag>}
      {aside}
    </div>
  )
}
