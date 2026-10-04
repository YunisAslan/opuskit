'use client'
// OpusKit piece — a designed preloader for the first page view of a visit: the brand name and a 0→100 count that
// follows real loading (fonts and the page's own load), then the panel lifts away. Never longer than `maxMs`, never a
// flash (≥ 600 ms). Reduced motion: no count — the name shows for the real load time, then fades. Original OpusKit code (MIT).
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const KEY = 'opuskit-preloaded'

export function Preloader({ brand, maxMs = 2500 }: { brand: string; maxMs?: number }) {
  const reduce = useReducedMotion()
  // Rendered by default so the first paint is the panel, not the page; hidden at once when already seen this visit.
  // ponytail: a full reload later in the same visit shows the panel until hydration; an inline head script would fix that.
  const [phase, setPhase] = useState<'on' | 'leaving' | 'off'>('on')
  const count = useRef<HTMLSpanElement>(null)
  const shown = phase !== 'off'

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- on purpose, before paint: a repeat visit must never see the panel
    try { if (sessionStorage.getItem(KEY)) { setPhase('off'); return } } catch { /* storage blocked: once per mount */ }
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    let fonts = 0, loaded = document.readyState === 'complete' ? 1 : 0, value = 0, raf = 0
    const start = performance.now()
    document.fonts?.ready.then(() => { fonts = 1 })
    const onLoad = () => { loaded = 1 }
    window.addEventListener('load', onLoad, { once: true })
    const tick = (now: number) => {
      const t = now - start
      const target = fonts + loaded === 2 || t >= maxMs ? 100 : (fonts + loaded) * 50
      value += (target - value) * 0.12
      if (target === 100 && 100 - value < 0.5) value = 100
      if (count.current) count.current.textContent = String(Math.round(value))
      if (value === 100 && (still || t >= 600)) return setPhase('leaving')
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('load', onLoad) }
  }, [maxMs])

  useEffect(() => {
    if (!shown) return
    const root = document.documentElement, prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => { root.style.overflow = prev }
  }, [shown])

  if (!shown) return null
  return (
    <motion.div role="status" aria-label={`Loading ${brand}`} className="fixed inset-0 z-[110] flex flex-col justify-between bg-(--color-background) p-6 text-(--color-text) sm:p-10"
      initial={false} animate={phase === 'leaving' ? (reduce ? { opacity: 0 } : { y: '-100%' }) : {}}
      transition={reduce ? { duration: 0.2 } : { duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (phase !== 'leaving') return
        try { sessionStorage.setItem(KEY, '1') } catch { /* private mode */ }
        setPhase('off')
      }}>
      <span className="font-(family-name:--font-display) text-[clamp(2.5rem,9vw,8rem)] leading-none tracking-tight">{brand}</span>
      <span ref={count} aria-hidden className="self-end motion-reduce:invisible font-(family-name:--font-utility) text-[clamp(1.5rem,4vw,3rem)] tabular-nums">0</span>
    </motion.div>
  )
}
