'use client'
// Cart's remembered moment, "Fill the mug": a drawn mug fills with tea as the bag grows towards free delivery; the
// line on the glass marks the threshold. Cross it and steam rises and a starburst pops: "Delivery's on us!". An empty
// bag is an empty mug. Phones: the mug sits small beside its line. Reduced motion: the tea level changes with no
// rise, the steam stays still, the starburst simply appears.
import { AnimatePresence, motion } from 'motion/react'
import { Starburst } from '@/components/parts/Starburst'
import { cn } from '@/lib/utils'
import { useReduced } from '@/lib/use-media'

// The mug's inside (where tea goes), in a 120 × 120 box
const INSIDE = 'M22 34 H82 V92 Q82 106 68 106 H36 Q22 106 22 92 Z'

export function MugGauge({ fill, done, doneLabel, className }: { fill: number; done: boolean; doneLabel: string; className?: string }) {
  const reduce = useReduced()
  const f = Math.max(0, Math.min(1, fill))
  return (
    <div className={cn('relative', className)}>
      <svg viewBox="0 0 120 120" aria-hidden className="w-full overflow-visible">
        <defs><clipPath id="mug-inside"><path d={INSIDE} /></clipPath></defs>
        <g clipPath="url(#mug-inside)">
          <rect x="18" y="30" width="70" height="80" className="fill-(--color-surface)" />
          <rect x="18" y="30" width="70" height="80" className="fill-(--color-muted) transition-transform duration-700 ease-(--ease-out) motion-reduce:duration-200"
            style={{ transformBox: 'fill-box', transformOrigin: 'bottom', transform: `scaleY(${0.05 + f * 0.85})` }} />
        </g>
        <path d={INSIDE} fill="none" strokeWidth="4" strokeLinejoin="round" className="stroke-(--color-text)" />
        <path d="M82 50 Q104 50 104 68 Q104 86 82 86" fill="none" strokeWidth="8" strokeLinecap="round" className="stroke-(--color-text)" />
        <path d="M26 42 H78" strokeWidth="2" strokeDasharray="4 4" className="stroke-(--color-text)" />
        {done && [36, 52, 68].map((x, i) => (
          <motion.path key={x} d={`M${x} 26 q-6 -8 0 -14 q6 -6 0 -14`} fill="none" strokeWidth="3" strokeLinecap="round" className="stroke-(--color-text)"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }} />
        ))}
      </svg>
      <AnimatePresence>
        {done && (
          <motion.div key="done" className="absolute -right-[18%] -top-[16%] w-[58%]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -25 }} animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 8 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }} transition={reduce ? { duration: 0.2 } : { type: 'spring', duration: 0.55, bounce: 0.45, delay: 0.3 }}>
            <Starburst className="w-full"><span className="type-display block leading-none [font-size:clamp(0.85rem,1.5vw,1.3rem)]">{doneLabel}</span></Starburst>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
