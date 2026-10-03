// Fennwood's mark: the oven's arch with the fire inside. It is also the motif that travels down every page.
import type { CSSProperties } from 'react'

export const MARK_W = 48
export const MARK_H = 56

export function Mark({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 48 56" fill="none" aria-hidden className={className} style={style}>
      <path d="M8 53V25a16 16 0 0 1 32 0v28" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M3 53h42" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M24 48c-5.5 0-9-3.6-9-8.4 0-4.6 3.4-7 5-10.6 1.6 2.4 1.6 4.6 1 6.6 2.4-1.4 3.6-4.6 3-9.6 4.6 3.4 9 8.4 9 13.6 0 4.8-3.5 8.4-9 8.4z" fill="currentColor" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-end gap-2.5 ${className ?? ''}`}>
      <Mark className="h-8 w-auto" />
      <span className="font-(family-name:--font-display) text-[1.65rem] leading-[0.9] font-semibold tracking-[-0.03em]">Fennwood</span>
    </span>
  )
}

/**
 * Where the travelling motif comes to rest beside a chapter title. On desktop the moving motif (TravellingMotif) lands
 * here, so the slot itself stays invisible; on smaller screens the slot shows the mark as a still image; with reduced
 * motion only the hero (and the footer logo) keep it.
 */
// Where the page margin is wide enough (from 1340px: the 1200px column leaves 70px+ each side), a chapter stop moves
// out of the title row into the margin beside it, shrunk to fit, so the resting mark never sits in the text column.
const IN_MARGIN = 'min-[1340px]:absolute min-[1340px]:top-1/2 min-[1340px]:right-full min-[1340px]:mr-4 min-[1340px]:-translate-y-1/2 min-[1340px]:w-[min(var(--s),calc(50vw-624px))]'

export function MotifStop({ size = 40, pose = 0, tone = 'accent', place = 'chapter' }: { size?: number; pose?: number; tone?: 'accent' | 'light'; place?: 'hero' | 'chapter' | 'end' }) {
  const visibility = place === 'chapter' ? `motion-reduce:invisible lg:invisible ${IN_MARGIN}` : 'lg:motion-safe:invisible'
  return (
    <span aria-hidden data-motif-stop={tone} data-pose={pose} data-pinned={place === 'hero' ? '' : undefined}
      className={`inline-block w-(--s) shrink-0 ${visibility}`} style={{ '--s': `${size}px`, aspectRatio: `${MARK_W} / ${MARK_H}` } as CSSProperties}>
      <Mark className={`h-full w-full ${tone === 'light' ? 'text-(--color-background)' : 'text-(--color-accent)'}`} style={{ rotate: `${pose}deg` }} />
    </span>
  )
}
