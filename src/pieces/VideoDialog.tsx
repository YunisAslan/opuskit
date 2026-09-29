'use client'
// OpusKit piece — adapted from Magic UI "Hero Video Dialog" (MIT © Magic UI, https://magicui.design).
// A still (the poster) with a play button; clicking opens the full film with sound in a dialog. Esc or the backdrop closes it.
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

export function VideoDialog({ poster, src, title, className }: { poster: string; src: string; title: string; className?: string }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`group relative block overflow-hidden ${className ?? ''}`} aria-label={`Play: ${title}`}>
        <img src={poster} alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
        <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-(--color-background) text-(--color-text) transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="ml-1 size-7 fill-current" aria-hidden><path d="M7 4.5v15l13-7.5z" /></svg>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-50 grid place-items-center bg-(--color-text)/85 p-4 md:p-12"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.video src={src} poster={poster} controls autoPlay playsInline className="max-h-full w-full max-w-6xl bg-black" onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 20 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} />
            <button type="button" className="absolute right-4 top-4 px-3 py-2 text-(--color-background)" onClick={() => setOpen(false)}>Close</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
