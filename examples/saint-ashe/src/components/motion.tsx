'use client'
// The site's motion, in one place. Reveals are CSS (globals.css) switched on by one IntersectionObserver;
// the giant chapter word drifts with Motion's useScroll. Every effect has its reduced-motion version in globals.css.
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useSyncExternalStore } from 'react'

/** Adds .is-in to [data-reveal] / [data-curtain] / [data-lines] once they enter the viewport. Re-scans on every page. */
export function MotionObserver() {
  const path = usePathname()
  useEffect(() => {
    // A curtain is clipped to nothing until it opens, and the observer counts its own clip-path, so its parent is watched.
    const owner = new Map<Element, Element[]>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { owner.get(e.target)?.forEach((el) => el.classList.add('is-in')); io.unobserve(e.target) }
    }, { rootMargin: '0px 0px -15% 0px' }) // any height: fires once the top passes 85% of the screen
    document.querySelectorAll('[data-reveal]:not(.is-in), [data-curtain]:not(.is-in), [data-lines]:not(.is-in)').forEach((el) => {
      const watched = el.hasAttribute('data-curtain') ? el.parentElement! : el
      owner.set(watched, [...(owner.get(watched) ?? []), el])
      io.observe(watched)
    })
    return () => io.disconnect()
  }, [path])
  return null
}

/** A headline split into lines by hand; each line rises out of its own mask, 80 ms apart. `mobile` re-breaks it for phones. */
export function Lines({ lines, mobile }: { lines: string[]; mobile?: string[] }) {
  const set = (ls: string[], cls?: string) => (
    <span aria-hidden className={cls}>
      {ls.map((l, i) => <span key={i} className="line"><span style={{ ['--i' as string]: i }}>{l}</span></span>)}
    </span>
  )
  return (
    <span data-lines className="block">
      <span className="sr-only">{lines.join(' ')}</span>
      {mobile ? <>{set(lines, 'hidden md:block')}{set(mobile, 'block md:hidden')}</> : set(lines, 'block')}
    </span>
  )
}

const desktopQuery = '(min-width: 768px)'
export function useDesktop() {
  return useSyncExternalStore(
    (cb) => { const m = matchMedia(desktopQuery); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) },
    () => matchMedia(desktopQuery).matches,
    () => false,
  )
}

/** Signature moment: a chapter opens on one giant word, drifting 8vw sideways as the band scrolls past.
 *  Sized by its letter count so the whole word always reads, through the full drift. Phones: bigger, no drift.
 *  Reduced motion: it stands still. The word is a real heading for screen readers. */
export function GiantWord({ word, as: H = 'h2', id }: { word: string; as?: 'h1' | 'h2'; id?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const desktop = useDesktop()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Starts 6vw in from the gutter, ends 2vw past it: never further than the gutter, so the first letter stays whole.
  const x = useTransform(scrollYProgress, [0, 1], ['6vw', '-2vw'])
  return (
    // clip only sideways: the J's descender hangs below the tight line box
    <div ref={ref} id={id} className="overflow-x-clip px-4 pt-8 md:px-10 md:pt-12">
      <H className="sr-only">{word}</H>
      {/* ~0.46em per letter at most: phones keep the word within 88vw, desktop within 83vw (+8vw drift) */}
      <motion.p aria-hidden style={{ x: desktop && !reduce ? x : 0, ['--n' as string]: word.length }}
        className="type-display whitespace-nowrap pb-[0.12em] [font-size:min(30vw,calc(190vw/var(--n)))] leading-[0.8]! tracking-[-0.02em] md:[font-size:min(26vw,calc(180vw/var(--n)))]">
        {word}
      </motion.p>
    </div>
  )
}
