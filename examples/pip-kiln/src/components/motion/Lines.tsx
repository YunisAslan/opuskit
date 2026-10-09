'use client'
import type { ElementType } from 'react'
import { useReveal } from './use-reveal'

/**
 * Line-by-line headline reveal. Lines are set by hand: `lines` from md up, `mobile` below it (re-broken for phones).
 * Each line rises out of its own mask, 80ms apart. Screen readers get the sentence once, from aria-label.
 */
export function Lines({ as: Tag = 'h2', text, lines, mobile, className, id }: { as?: ElementType; text?: string; lines: string[]; mobile?: string[]; className?: string; id?: string }) {
  const [ref, state] = useReveal<HTMLElement>()
  const label = text ?? lines.join(' ')
  const set = (ls: string[], cls: string) => (
    <span aria-hidden className={cls}>
      {ls.map((l, i) => <span key={i} className="line-mask"><span style={{ ['--line' as string]: i }}>{l}</span></span>)}
    </span>
  )
  return (
    <Tag ref={ref} id={id} data-lines={state} aria-label={label} className={className}>
      {mobile ? <>{set(mobile, 'block md:hidden')}{set(lines, 'hidden md:block')}</> : set(lines, 'block')}
    </Tag>
  )
}
