import type { ReactNode } from 'react'

// The big idea: one coral disc guides the scroll. Every chapter title carries a mark where the disc comes to rest.
// Desktop: the marks sit in the left margin and the travelling disc (MotifTraveller) lands on each one in turn.
// Phone: each mark shows as a small still disc at the chapter start. Reduced motion: only the hero's mark shows.
export type MotifPose = 'hero' | 'chapter' | 'moment' | 'end'

export function MotifMark({ pose = 'chapter' }: { pose?: MotifPose }) {
  return <span aria-hidden className="motif-mark" data-pose={pose} data-hero={pose === 'hero' || undefined} />
}

/** A chapter title with its motif mark beside it. */
export function Chapter({ pose = 'chapter', children, className = '' }: { pose?: MotifPose; children: ReactNode; className?: string }) {
  return <div className={`relative ${className}`}><MotifMark pose={pose} />{children}</div>
}
