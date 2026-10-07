'use client'
// The three entrances of the motion system. Every section enters like a cut in a film: the picture first
// (ImageReveal), then the headline line by line (Lines), then the words (Reveal). Each has its reduced-motion form.
//
// The element that watches the viewport is never the masked one: an IntersectionObserver counts a target hidden by
// its own clip or its parent's overflow as not visible, so the unmasked wrapper observes and hands the state down
// through variants.
import { motion, type Variants } from 'motion/react'
import { createContext, useContext, type ReactNode } from 'react'
import { DUR, EASE_CUT, EASE_LINE, STAGGER, TEXT_AFTER_MEDIA, useStill } from '@/lib/motion'

const VIEW = { once: true, amount: 0.2 } as const

// The first screen is complete before anything animates (award checklist): a section that opens a page wraps its
// content in <FirstScreen>, and every entrance inside it renders in place, already there.
const Immediate = createContext(false)
export function FirstScreen({ children }: { children: ReactNode }) {
  return <Immediate.Provider value>{children}</Immediate.Provider>
}
const watch = { initial: 'hidden', whileInView: 'show', viewport: VIEW } as const

/** Image clip reveal — clip-path inset(100% 0 0 0) → inset(0) while the picture inside settles from 1.15 to 1.
 *  Reduced motion: a 200 ms fade. */
export function ImageReveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const still = useStill()
  if (useContext(Immediate)) return <div className={className}>{children}</div>
  if (still) return (
    <motion.div className={className} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEW} transition={{ duration: DUR.still }}>
      {children}
    </motion.div>
  )
  const mask: Variants = {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
    show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: DUR.cut, ease: EASE_CUT, delay } },
  }
  const settle: Variants = {
    hidden: { scale: 1.15 },
    show: { scale: 1, transition: { duration: DUR.cut + 0.2, ease: EASE_CUT, delay } },
  }
  return (
    <motion.div className={className} {...watch}>
      <motion.div className="h-full w-full overflow-hidden" variants={mask}>
        <motion.div className="h-full w-full" variants={settle}>{children}</motion.div>
      </motion.div>
    </motion.div>
  )
}

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p } as const

/** Line-by-line headline — each line masked and lifted from 100% to 0, 80 ms apart. Lines are split by hand in the
 *  markup; `mobile` gives the phone its own breaks. Reduced motion (or `immediate`): shown at once. */
export function Lines({ as = 'h2', lines, mobile, className = '', delay = 0, immediate = false, id }: {
  as?: keyof typeof tags; lines: string[]; mobile?: string[]; className?: string; delay?: number; immediate?: boolean; id?: string
}) {
  const still = useStill()
  const first = useContext(Immediate)
  const Tag = tags[as]
  const quiet = still || immediate || first
  const line: Variants = {
    hidden: { y: '105%' },
    show: (i: number) => ({ y: '0%', transition: { duration: DUR.line, ease: EASE_LINE, delay: delay + i * STAGGER } }),
  }
  const set = (ls: string[], cls: string) => (
    <span aria-hidden className={cls}>
      {ls.map((l, i) => (
        <span key={l + i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          {quiet ? <span className="block">{l}</span> : <motion.span className="block" variants={line} custom={i}>{l}</motion.span>}
        </span>
      ))}
    </span>
  )
  return (
    <Tag id={id} aria-label={lines.join(' ')} className={className} {...(quiet ? {} : watch)}>
      {mobile ? <>{set(mobile, 'block md:hidden')}{set(lines, 'hidden md:block')}</> : set(lines, 'block')}
    </Tag>
  )
}

/** Words after the picture — opacity and a short 16 px rise. Reduced motion: opacity only, 200 ms. */
export function Reveal({ children, className = '', delay = TEXT_AFTER_MEDIA, as = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'li' | 'p' | 'figure' }) {
  const still = useStill()
  const first = useContext(Immediate)
  const Comp = motion[as]
  if (first) { const Plain = as; return <Plain className={className}>{children}</Plain> }
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      // Reduced motion: the rise is dropped (y lands at once) and only the 200 ms fade remains.
      transition={still ? { duration: DUR.still, y: { duration: 0 } } : { duration: DUR.text, ease: EASE_LINE, delay }}
    >
      {children}
    </Comp>
  )
}
