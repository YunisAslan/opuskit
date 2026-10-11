'use client'
// OpusKit piece — letters that gather into a sentence: as the line comes up the page, its letters arrive from scattered
// places — tumbled, faint — and settle into the words exactly as the scroll goes, so the sentence is read the moment it
// is whole. GSAP ScrollTrigger scrubs it (gsap, its own standard licence). The full sentence is always in the page for
// screen readers; reduced motion shows it still.
// Original OpusKit code (MIT).
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, type JSX } from 'react'

// A fixed scatter per letter (the same on server and client).
const rnd = (i: number, k: number) => (((i + 1) * (k * 7919 + 104729)) % 1009) / 1009 - 0.5

export function LettersAssemble({ children, as = 'p', spread = 1, className }: {
  /** One sentence, up to ~12 words. */ children: string
  as?: keyof JSX.IntrinsicElements
  /** How far the letters start from home (0.5–1.5). */ spread?: number
  className?: string
}) {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const chars = gsap.utils.toArray<HTMLElement>('[data-ch]', root.current)
      gsap.fromTo(chars, {
        x: (i) => rnd(i, 1) * innerWidth * 0.6 * spread, y: (i) => rnd(i, 2) * innerHeight * 0.5 * spread,
        rotate: (i) => rnd(i, 3) * 120, opacity: 0.08,
      }, { x: 0, y: 0, rotate: 0, opacity: 1, ease: 'power1.inOut', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'center 55%', scrub: 0.8 } }) // an even ease: the scroll, not the curve, sets the pace
    })
    return () => mm.revert()
  }, [spread])

  const Tag = as as 'p'
  let n = 0
  return (
    <Tag ref={root as never} className={className}>
      <span className="sr-only">{children}</span>
      {children.split(' ').map((word, w) => (
        <span key={w} aria-hidden>
          <span className="inline-block whitespace-nowrap">{[...word].map((ch) => <span key={n++} data-ch className="inline-block will-change-transform">{ch}</span>)}</span>{' '}
        </span>
      ))}
    </Tag>
  )
}
