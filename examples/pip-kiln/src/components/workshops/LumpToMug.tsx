'use client'
// Workshops' remembered moment, "Lump to mug": beside the Saturday schedule, a drawing on a potter's wheel turns from a
// lump of clay into a thrown pot, a mug with a handle, then a glazed mug, following the time you are reading; the
// wheel spins with your scroll. Phones: the drawing rides small in a band under the menu. Reduced motion: the stages
// swap with a short fade and the wheel stands still.
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import type { RefObject } from 'react'
import { useReduced } from '@/lib/use-media'

const CLAY = 'fill-(--color-surface) stroke-(--color-text)'
const SHAPES = [
  <path key="lump" d="M58 170 C46 146 62 112 98 108 C136 104 156 134 144 170 Z" className={CLAY} strokeWidth="4" strokeLinejoin="round" />,
  <g key="pot"><path d="M66 170 L70 92 Q100 84 130 92 L134 170 Z" className={CLAY} strokeWidth="4" strokeLinejoin="round" /><ellipse cx="100" cy="92" rx="30" ry="7" className={CLAY} strokeWidth="4" /></g>,
  <g key="mug"><path d="M134 108 Q164 108 164 130 Q164 152 134 152" fill="none" strokeWidth="10" strokeLinecap="round" className="stroke-(--color-text)" /><path d="M66 170 L68 92 Q100 84 132 92 L134 170 Z" className={CLAY} strokeWidth="4" strokeLinejoin="round" /><ellipse cx="100" cy="92" rx="32" ry="7" className={CLAY} strokeWidth="4" /></g>,
  <g key="glazed"><path d="M134 108 Q164 108 164 130 Q164 152 134 152" fill="none" strokeWidth="10" strokeLinecap="round" className="stroke-(--color-text)" /><path d="M66 170 L68 92 Q100 84 132 92 L134 170 Z" className={CLAY} strokeWidth="4" strokeLinejoin="round" /><path d="M68 92 Q100 84 132 92 L133 128 Q128 140 124 128 L122 122 Q117 146 111 124 Q104 134 97 124 Q90 148 84 126 Q79 136 74 126 L68 130 Z" className="fill-(--color-accent)" /><ellipse cx="100" cy="92" rx="32" ry="7" className="fill-(--color-accent) stroke-(--color-text)" strokeWidth="4" /><path d="M66 170 L68 92 Q100 84 132 92 L134 170 Z" fill="none" className="stroke-(--color-text)" strokeWidth="4" strokeLinejoin="round" /></g>,
]

export function LumpToMug({ stage, label, scope, compact }: { stage: number; label: string; scope: RefObject<HTMLElement | null>; compact?: boolean }) {
  const reduce = useReduced()
  const { scrollYProgress } = useScroll({ target: scope, offset: ['start end', 'end start'] })
  const spin = useTransform(scrollYProgress, [0, 1], [0, 1080])
  return (
    <figure className={compact ? 'flex items-center gap-4' : ''}>
      <div className={`relative ${compact ? 'w-24 shrink-0' : 'mx-auto w-full max-w-[26rem]'}`}>
        <div className="relative aspect-square [perspective:600px]">
          {/* the wheel head, seen from the side; its stripes turn with the scroll */}
          <div aria-hidden className="absolute inset-x-[8%] bottom-[2%] aspect-square [transform:rotateX(76deg)] [transform-origin:50%_100%]">
            <motion.div style={reduce ? undefined : { rotate: spin }}
              className="size-full rounded-full border-[3px] border-(--color-text) bg-[repeating-conic-gradient(var(--color-secondary)_0deg_15deg,var(--color-surface)_15deg_30deg)]" />
          </div>
          <svg viewBox="0 0 200 200" aria-hidden className="absolute inset-0 size-full overflow-visible">
            <AnimatePresence initial={false}>
              <motion.g key={stage} style={{ transformOrigin: '100px 170px' }}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }} animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0.15 : 0.3, ease: [0.23, 1, 0.32, 1] }}>
                {SHAPES[stage]}
              </motion.g>
            </AnimatePresence>
          </svg>
        </div>
      </div>
      <figcaption aria-live="polite" className={compact ? 't-card' : 't-sticker mt-4 text-center'}>{label}</figcaption>
    </figure>
  )
}
