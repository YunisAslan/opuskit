// Line-by-line headline: lines are split by hand (desktop and phone each get their own breaks), each masked and
// rising into place 80ms apart once the headline enters the viewport. `onLoad` uses the first-screen fade instead
// (the first screen is readable at once). Screen readers hear one sentence, whichever set is showing.
import type { ElementType } from 'react'
import { cn } from '@/lib/utils'

type Props = { as?: ElementType; lines: string[]; mobile?: string[]; className?: string; onLoad?: boolean; id?: string; indent?: boolean }

export function Lines({ as: Tag = 'h2', lines, mobile, className, onLoad = false, id, indent = false }: Props) {
  const set = (list: string[], cls: string) => (
    <span className={cls}>
      {list.map((l, i) => (
        <span key={i} className={cn('line-mask whitespace-nowrap', indent && i % 2 === 1 && 'pl-[0.8em]')}>
          {onLoad
            ? <span className="rise block" style={{ ['--i' as string]: i }}>{l}</span>
            : <span className="line-in" style={{ ['--l' as string]: i }}>{l}</span>}
        </span>
      ))}
    </span>
  )
  return (
    <Tag id={id} data-lines={onLoad ? undefined : ''} className={className}>
      {mobile ? <>{set(mobile, 'block md:hidden')}{set(lines, 'hidden md:block')}</> : set(lines, 'block')}
    </Tag>
  )
}
