'use client'
// OpusKit piece — adapted from Magic UI "Marquee" (MIT © Magic UI, https://magicui.design).
// An endless row (logos, photos, words). Pauses on hover and off-screen; reduced motion shows a static, scrollable row.
import type { CSSProperties, ReactNode } from 'react'

export function Marquee({ children, reverse = false, seconds = 40, gap = '1.5rem', pauseOnHover = true, className }: {
  children: ReactNode; reverse?: boolean; seconds?: number; gap?: string; pauseOnHover?: boolean; className?: string
}) {
  return (
    <div className={`group flex overflow-hidden [gap:var(--gap)] motion-reduce:overflow-x-auto ${className ?? ''}`} style={{ '--gap': gap, '--dur': `${seconds}s` } as CSSProperties}>
      <style>{`@keyframes opuskit-marquee{to{transform:translateX(calc(-100% - var(--gap)))}}`}</style>
      {[0, 1].map((k) => (
        <div key={k} aria-hidden={k === 1 || undefined}
          className={`flex shrink-0 items-center [gap:var(--gap)] [animation:opuskit-marquee_var(--dur)_linear_infinite] motion-reduce:[animation:none] ${reverse ? '[animation-direction:reverse]' : ''} ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''} ${k === 1 ? 'motion-reduce:hidden' : ''}`}>
          {children}
        </div>
      ))}
    </div>
  )
}
