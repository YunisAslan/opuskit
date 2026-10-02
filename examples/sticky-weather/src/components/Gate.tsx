'use client'
// Signature moment "A playful way in" (Home, Sticker orbit): on the first visit of a session, hold the sticker to
// peel the site open. Holding fills over 1.2s and the sticker lifts at the corner; letting go early lets it settle back.
// Done, the two halves of the cover part (600ms). Skip is focusable first; Esc skips. The page is in the DOM underneath
// all along. Mobile: the same, thumb-sized. Reduced motion: one Enter button, no wipe.
// A head script in app/layout.tsx marks a returning visit before paint, so the cover never flashes (see globals.css).
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { LogoMark } from '@/components/Logo'
import { EASE_IN_OUT } from '@/components/motion'

export const GATE_KEY = 'sw-gate'

/** Runs before paint on a full load and marks a returning visit (globals.css then hides the cover). Rendered as
 *  text/plain on the client so React doesn't warn about a script it won't run (Next.js "Preventing flash" guide). */
export function GateScript() {
  return <script type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'} suppressHydrationWarning
    dangerouslySetInnerHTML={{ __html: `try{if(sessionStorage.getItem('${GATE_KEY}'))document.documentElement.dataset.gate='done'}catch(e){}` }} />
}
const HOLD_MS = 1200

export function Gate({ onOpen }: { onOpen: () => void }) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<'on' | 'opening' | 'off'>('on')
  const fill = useMotionValue(0)
  const peel = useTransform(fill, [0, 1], [0, -18])
  const lift = useTransform(fill, [0, 1], [0, -14])
  const flap = useTransform(fill, [0, 1], [1, 1.9])
  const hold = useRef<ReturnType<typeof animate> | null>(null)
  const skipRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    let seen = false
    try { seen = !!sessionStorage.getItem(GATE_KEY) } catch { /* storage blocked: show it once per mount */ }
    if (seen) setPhase('off') // eslint-disable-line react-hooks/set-state-in-effect -- read storage before paint, like the Preloader piece
  }, [])

  const open = (instant = false) => {
    if (phase !== 'on') return
    try { sessionStorage.setItem(GATE_KEY, '1') } catch { /* private mode */ }
    document.documentElement.dataset.gate = 'done'
    onOpen()
    setPhase(instant || reduce ? 'off' : 'opening')
  }

  useEffect(() => {
    if (phase !== 'on') return
    const root = document.documentElement, prev = root.style.overflow
    root.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') open(true) }
    window.addEventListener('keydown', onKey)
    skipRef.current?.focus({ preventScroll: true })
    return () => { root.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps -- open() only reads phase

  const start = () => {
    hold.current?.stop()
    hold.current = animate(fill, 1, { duration: (HOLD_MS / 1000) * (1 - fill.get()), ease: 'linear', onComplete: () => open() })
  }
  const stop = () => {
    if (fill.get() >= 1) return
    hold.current?.stop()
    hold.current = animate(fill, 0, { duration: 0.35, ease: EASE_IN_OUT })
  }

  if (phase === 'off') return null
  const half = (side: 'top' | 'bottom') => (
    <motion.div aria-hidden className={`absolute inset-x-0 h-1/2 bg-(--color-background) ${side === 'top' ? 'top-0' : 'bottom-0'}`}
      animate={phase === 'opening' ? { y: side === 'top' ? '-100%' : '100%' } : {}} transition={{ duration: 0.6, ease: EASE_IN_OUT }}
      onAnimationComplete={() => { if (side === 'top' && phase === 'opening') setPhase('off') }} />
  )

  return (
    <div data-gate-overlay data-lenis-prevent role="dialog" aria-modal="true" aria-label="Open the site" className="fixed inset-0 z-[105]">
      {half('top')}
      {half('bottom')}
      <motion.div className="relative flex h-full flex-col items-center justify-between p-5 md:p-10" animate={phase === 'opening' ? { opacity: 0 } : {}} transition={{ duration: 0.15 }}>
        <div className="flex w-full items-center justify-between">
          <span className="type-utility">Sticky Weather</span>
          <button ref={skipRef} type="button" onClick={() => open(true)} className="type-utility min-h-11 px-3 underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current focus-visible:decoration-current">Skip</button>
        </div>

        <div className="flex flex-col items-center text-center">
          <motion.div className="relative size-[clamp(9rem,22vw,13rem)]" style={{ rotate: peel, y: lift }}>
            <div className="absolute inset-0 grid place-items-center bg-(--color-paper) text-(--color-accent) [clip-path:polygon(0_0,100%_0,100%_78%,78%_100%,0_100%)]">
              <LogoMark className="w-3/4" />
            </div>
            <motion.div aria-hidden className="absolute right-0 bottom-0 size-[22%] origin-bottom-right bg-(--color-surface) [clip-path:polygon(0_0,100%_0,0_100%)]" style={{ scale: flap }} />
          </motion.div>
          <p className="type-heading mt-10 text-balance">Every good brand starts with a sticker.</p>
          {/* Both versions are in the markup and CSS picks one, so server and client always agree. */}
          <p className="type-body mt-2 text-(--color-muted)"><span className="motion-reduce:hidden">Hold the button to peel this one open.</span><span className="hidden motion-reduce:inline">Come on in.</span></p>
        </div>

        <div>
          <Button onClick={() => open(true)} className="type-body hidden h-14 min-w-56 rounded-(--radius-button) px-8 motion-reduce:inline-flex">Enter</Button>
          <Button onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop} onContextMenu={(e) => e.preventDefault()}
            onKeyDown={(e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); start() } }}
            onKeyUp={(e) => { if (e.key === ' ' || e.key === 'Enter') stop() }}
            className="type-body relative h-14 min-w-64 touch-none overflow-hidden rounded-(--radius-button) px-8 select-none motion-reduce:hidden">
            <motion.span aria-hidden className="absolute inset-0 origin-left bg-(--color-accent)" style={{ scaleX: fill }} />
            <span className="relative">Hold to peel</span>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
