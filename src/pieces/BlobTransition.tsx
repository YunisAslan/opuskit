'use client'
// OpusKit piece — page transition: clicking an internal link sends an organic blob of colour up over the page; the
// next page is revealed as the blob keeps travelling off the top. Mount once in the root layout. Respects reduced
// motion (plain navigation). Original OpusKit code (MIT).
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function BlobTransition({ color = 'var(--color-chapter-1, var(--color-accent))' }: { color?: string }) {
  const path = usePathname()
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<'idle' | 'cover' | 'reveal'>('idle')
  useEffect(() => {
    if (reduce) return
    let replaying = false
    const onClick = (e: MouseEvent) => {
      if (replaying) return
      const a = (e.target as HTMLElement).closest('a')
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank' || a.hasAttribute('download')) return
      const url = new URL(a.href, location.href)
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return
      e.preventDefault()
      e.stopPropagation() // capture phase: hold the click before next/link sees it, then replay it once the page is covered
      setPhase('cover')
      setTimeout(() => { replaying = true; a.click(); replaying = false }, 550) // next/link navigates (basePath, prefetch, its own handlers)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [reduce])
  useEffect(() => { setPhase((p) => (p === 'cover' ? 'reveal' : p)) }, [path])
  return (
    <AnimatePresence onExitComplete={() => setPhase('idle')}>
      {phase !== 'idle' && (
        <motion.div key="blob" aria-hidden className="pointer-events-none fixed inset-x-[-20%] z-[100] h-[140svh]" style={{ background: color }}
          initial={{ y: '100svh', borderRadius: '50% 50% 0 0 / 30% 30% 0 0' }}
          animate={phase === 'cover' ? { y: '-20svh', borderRadius: '40% 60% 0 0 / 12% 18% 0 0' } : { y: '-160svh', borderRadius: '0 0 60% 40% / 0 0 30% 20%' }}
          exit={{ opacity: 0 }} transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => { if (phase === 'reveal') setPhase('idle') }} />
      )}
    </AnimatePresence>
  )
}
