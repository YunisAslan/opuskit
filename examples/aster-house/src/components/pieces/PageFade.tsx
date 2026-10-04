'use client'
// OpusKit piece — page transition: clicking an internal link softly veils the page in its own ground colour, the next
// page loads underneath, and the veil fades away (about half a second in all). For calm sites, where a curtain would
// shout. Mount once in the root layout. Respects reduced motion (plain navigation). Original OpusKit code (MIT).
import { motion, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function PageFade({ color = 'var(--color-background)' }: { color?: string }) {
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
      e.stopPropagation() // capture phase: hold the click, veil the page, then replay it for next/link
      setPhase('cover')
      setTimeout(() => { replaying = true; a.click(); replaying = false }, 220)
      setTimeout(() => setPhase((p) => (p === 'cover' ? 'reveal' : p)), 1200) // same pathname: lift the veil anyway
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [reduce])
  // The new page has arrived: lift the veil (state adjusted while rendering, not in an effect).
  const [shownPath, setShownPath] = useState(path)
  if (shownPath !== path) { setShownPath(path); if (phase === 'cover') setPhase('reveal') }
  if (phase === 'idle') return null
  return (
    <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-[100]" style={{ background: color }}
      initial={{ opacity: 0 }} animate={{ opacity: phase === 'cover' ? 1 : 0 }}
      transition={{ duration: phase === 'cover' ? 0.22 : 0.32, ease: 'easeOut' }}
      onAnimationComplete={() => { if (phase === 'reveal') setPhase('idle') }} />
  )
}
