// A chapter opens where the motif comes to rest: the motif's stop, then the title cut out of its mask (CutReveal).
// `morph` names the title for the page transition, so the same title on two pages morphs between them.
import { ViewTransition } from 'react'
import { CutReveal } from '@/components/pieces/CutReveal'
import { MotifStop } from '@/components/Mark'

export function ChapterTitle({ children, as = 'h2', display = false, size = 40, pose = 0, morph }: {
  children: string; as?: 'h1' | 'h2'; display?: boolean; size?: number; pose?: number; morph?: string
}) {
  const heading = <CutReveal as={as} className={`${display ? 'type-display' : 'type-heading'} text-balance`}>{children}</CutReveal>
  return (
    <div className="relative flex items-center gap-4 md:gap-5">
      <MotifStop size={size} pose={pose} />
      {morph ? <ViewTransition name={morph}>{heading}</ViewTransition> : heading}
    </div>
  )
}
