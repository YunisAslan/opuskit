'use client'
import type { ElementType, ComponentPropsWithoutRef } from 'react'
import { useReveal } from './use-reveal'

/** Hard cut: the direct children snap in (fade 120ms, 24px slide 250ms), 40ms apart, once. */
export function Cut<T extends ElementType = 'div'>({ as, ...props }: { as?: T } & ComponentPropsWithoutRef<T>) {
  const Tag = (as ?? 'div') as ElementType
  const [ref, state] = useReveal<HTMLElement>()
  return <Tag ref={ref} data-cut={state} {...props} />
}
