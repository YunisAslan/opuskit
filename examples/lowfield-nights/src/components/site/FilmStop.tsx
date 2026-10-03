'use client'
// A film window on Home: a see-through stretch of page where the film plays on its own, pinned to its scene
// (data-scene-at, read by ScrollFilm). The scene's message arrives line by line from a mask, holds while the window
// fills the screen, and leaves before the next section; the stop card follows it. Reduced motion: shown in place.
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useReducedMotionSafe } from '@/lib/motion'
import { useRef, type ReactNode } from 'react'
import type { Scene } from '@/config/scenes'
import { StopCard } from './StopCard'

function Line({ p, i, children, quiet }: { p: MotionValue<number>; i: number; children: string; quiet?: boolean }) {
  const y = useTransform(p, [0.26 + i * 0.03, 0.4 + i * 0.03], ['105%', '0%'])
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span style={{ y }} className={`block ${quiet ? 'quiet' : ''}`}>{children}</motion.span>
    </span>
  )
}

export function FilmStop({ scene, children }: { scene: Scene; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotionSafe()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const leave = useTransform(p, [0.64, 0.74], [1, 0])
  const lift = useTransform(p, [0.64, 0.74], [0, -24])
  const cardIn = useTransform(p, [0.38, 0.48, 0.64, 0.74], [0, 1, 1, 0])
  const cardY = useTransform(p, [0.38, 0.48], [16, 0])
  const [a, b] = scene.lines

  return (
    <div ref={ref} data-scene-at={scene.at} className="relative h-[120svh] md:h-[150svh]">
      <div className="sticky top-0 flex h-svh items-end px-5 pb-16 md:px-10 md:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_100%,color-mix(in_srgb,var(--color-background)_75%,transparent),transparent_75%)]" />
        <div className="relative mx-auto grid w-full max-w-[1440px] items-end gap-8 md:grid-cols-12">
          {reduce ? (
            <>
              <p className="type-display text-balance [font-size:clamp(2.75rem,5.6vw,5.25rem)] md:col-span-8 md:whitespace-nowrap"><span className="block">{a}</span><span className="quiet block">{b}</span></p>
              <StopCard {...scene.card} className="md:col-span-4 md:col-start-9 md:justify-self-end">{children}</StopCard>
            </>
          ) : (
            <>
              <motion.p style={{ opacity: leave, y: lift }} className="type-display text-balance [font-size:clamp(2.75rem,5.6vw,5.25rem)] md:col-span-8 md:whitespace-nowrap">
                <Line p={p} i={0}>{a}</Line>
                <Line p={p} i={1} quiet>{b}</Line>
              </motion.p>
              <motion.div style={{ opacity: cardIn, y: cardY }} className="md:col-span-4 md:col-start-9 md:justify-self-end">
                <StopCard {...scene.card}>{children}</StopCard>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
