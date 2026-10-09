'use client'
// OpusKit piece — page transition: clicking an internal link raises a plain panel over the page carrying the link's
// words, then the panel keeps rising off the top to reveal the next page (under 700 ms in all). Mount once in the root
// layout. Respects reduced motion (plain navigation). Original OpusKit code (MIT).
import { motion, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const EASE = [0.76, 0, 0.24, 1] as const

export function PageCurtain({ color = 'var(--color-text)' }: { color?: string }) {
  const path = usePathname()
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<'idle' | 'cover' | 'reveal'>('idle')
  const [name, setName] = useState('')
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
      // A label that is drawn twice (TextRoll) carries its words in aria-label — prefer that over the doubled text.
      const text = (a.getAttribute('aria-label') ?? a.querySelector('[aria-label]')?.getAttribute('aria-label') ?? a.textContent ?? '').trim().replace(/\s+/g, ' ')
      setName(text.length > 40 ? `${text.slice(0, 39)}…` : text)
      setPhase('cover')
      setTimeout(() => { replaying = true; a.click(); replaying = false }, 300) // next/link navigates (basePath, prefetch, its own handlers)
      // Same pathname (only the query changed) never fires the reveal below — lift the curtain anyway.
      setTimeout(() => setPhase((p) => (p === 'cover' ? 'reveal' : p)), 1200)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [reduce])
  // The new page arrived: lift the curtain (state adjusted while rendering, not in an effect).
  const [seenPath, setSeenPath] = useState(path)
  if (seenPath !== path) { setSeenPath(path); if (phase === 'cover') setPhase('reveal') }
  if (phase === 'idle') return null
  return (
    <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-[100] grid place-items-center px-6" style={{ background: color }}
      initial={{ y: '100%' }} animate={{ y: phase === 'cover' ? '0%' : '-100%' }}
      transition={{ duration: phase === 'cover' ? 0.3 : 0.35, ease: EASE }}
      onAnimationComplete={() => { if (phase === 'reveal') setPhase('idle') }}>
      {/* the panel is the white screen from the film; the next page's name is its title card */}
      <span className="type-display text-center text-[clamp(3.5rem,10vw,9rem)] text-(--color-background)">{name}</span>
    </motion.div>
  )
}
