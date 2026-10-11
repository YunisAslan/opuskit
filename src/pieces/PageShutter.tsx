'use client'
// OpusKit piece — page transition: clicking an internal link drops a row of vertical bars over the page one after
// another, like a shutter closing; the next page arrives behind them and the bars lift away in the same order (under
// 800 ms in all). Mount once in the root layout. Reduced motion: plain navigation. Original OpusKit code (MIT).
import { motion, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const EASE = [0.76, 0, 0.24, 1] as const

export function PageShutter({ bars = 5, color = 'var(--color-text)' }: { bars?: number; color?: string }) {
  const path = usePathname()
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<'idle' | 'cover' | 'reveal'>('idle')
  useEffect(() => {
    if (reduce) return
    let replaying = false
    const onClick = (e: MouseEvent) => {
      if (replaying) return
      const a = (e.target as HTMLElement).closest('a')
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank' || a.hasAttribute('download')) return
      const url = new URL(a.href, location.href)
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return
      e.preventDefault()
      e.stopPropagation() // capture phase: hold the click before next/link sees it, then replay it once the page is covered
      setPhase('cover')
      setTimeout(() => { replaying = true; a.click(); replaying = false }, 340) // next/link navigates (basePath, prefetch, its own handlers)
      setTimeout(() => setPhase((p) => (p === 'cover' ? 'reveal' : p)), 1200) // same pathname: lift anyway
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [reduce])
  // The new page arrived: lift the bars (state adjusted while rendering, not in an effect).
  const [seenPath, setSeenPath] = useState(path)
  if (seenPath !== path) { setSeenPath(path); if (phase === 'cover') setPhase('reveal') }
  if (phase === 'idle') return null
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] flex">
      {Array.from({ length: bars }, (_, i) => (
        <motion.span key={i} className="h-full flex-1" style={{ background: color, transformOrigin: phase === 'cover' ? 'bottom' : 'top' }}
          initial={{ scaleY: 0 }} animate={{ scaleY: phase === 'cover' ? 1 : 0 }}
          transition={{ duration: 0.26, delay: i * 0.035, ease: EASE }}
          onAnimationComplete={() => { if (phase === 'reveal' && i === bars - 1) setPhase('idle') }} />
      ))}
    </div>
  )
}
