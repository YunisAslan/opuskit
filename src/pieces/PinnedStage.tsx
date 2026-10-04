'use client'
// OpusKit piece — a pinned stage: the section holds still on screen while the visitor scrolls through its steps, and a
// thin bar shows how far along they are. The one base for every pinned or scrubbed moment (proof one at a time, scroll
// into an image, a story told in steps). Each step is a real element in the DOM, in order, for screen readers.
// Original OpusKit code (MIT).
import { motion, useMotionValueEvent, useReducedMotion, useScroll, type MotionValue } from 'motion/react'
import { useRef, useState, useSyncExternalStore, type ReactNode } from 'react'

export function PinnedStage({ steps, perStep = 70, label, children }: {
  /** One node per step. */ steps: ReactNode[]
  /** Scroll length per step, in svh. */ perStep?: number
  /** What the steps are, for the progress bar (e.g. "Projects"). */ label?: string
  /** Optional: draw the stage yourself from the scroll progress (0–1) and the active step. */
  children?: (p: { progress: MotionValue<number>; active: number }) => ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  // Reduced motion applies once hydrated, so the server HTML and the first client render match.
  const hydrated = useSyncExternalStore(() => () => {}, () => true, () => false)
  const reduce = useReducedMotion() && hydrated
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(steps.length - 1, Math.floor(v * steps.length))))

  // Reduced motion: no pinning — the steps simply follow each other.
  if (reduce) return <div ref={ref} className="space-y-16">{steps.map((s, i) => <div key={i}>{s}</div>)}</div>

  return (
    <div ref={ref} style={{ height: `${steps.length * perStep + 100}svh` }} className="relative">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        {children ? children({ progress: scrollYProgress, active }) : (
          <div className="relative">
            {steps.map((s, i) => (
              <motion.div key={i} aria-hidden={i !== active} className={i === 0 ? 'relative' : 'absolute inset-0'}
                animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : i < active ? -24 : 24 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>{s}</motion.div>
            ))}
          </div>
        )}
        <div className="absolute inset-x-(--gutter,24px) bottom-6 flex items-center gap-4 font-(family-name:--font-utility) text-sm text-(--color-muted)">
          {label && <span>{label}</span>}
          <span className="relative h-px flex-1 bg-(--color-border)"><motion.span className="absolute inset-y-0 left-0 w-full origin-left bg-(--color-text)" style={{ scaleX: scrollYProgress }} /></span>
          <span className="tabular-nums">{active + 1} of {steps.length}</span>
        </div>
      </div>
    </div>
  )
}
