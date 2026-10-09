import type { ReactNode } from 'react'
import { Lines } from '@/components/motion/Lines'
import { cn } from '@/lib/utils'

/** Every section title on the site: one Bagel size, lines set by hand, an optional short line and an aside. */
export function SectionHead({ id, text, lines, mobile, line, aside, as = 'h2', className }: { id?: string; text?: string; lines: string[]; mobile?: string[]; line?: ReactNode; aside?: ReactNode; as?: 'h1' | 'h2'; className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-x-10 gap-y-6', className)}>
      <div className="min-w-0 max-w-full">
        <Lines as={as} id={id} text={text} lines={lines} mobile={mobile} className={as === 'h1' ? 't-hero' : 't-section'} />
        {line && <p className="type-body mt-5 max-w-[46ch]">{line}</p>}
      </div>
      {aside}
    </div>
  )
}
