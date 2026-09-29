'use client'
// OpusKit piece — a cookie notice that looks like part of the brand: a small card with a two-part header (a place and
// a label), plain words and one clear button. Remembers the answer. Original OpusKit code (MIT).
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

export function CookieNote({ text, place = 'Zone 1', label = 'Note', accept = 'Accept', decline = 'Only necessary', storageKey = 'cookie-choice' }: { text: string; place?: string; label?: string; accept?: string; decline?: string; storageKey?: string }) {
  const [open, setOpen] = useState(false)
  useEffect(() => { try { if (!localStorage.getItem(storageKey)) setOpen(true) } catch { setOpen(true) } }, [storageKey])
  const answer = (v: string) => { try { localStorage.setItem(storageKey, v) } catch { /* private mode */ } setOpen(false) }
  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-live="polite" aria-label={label} className="fixed bottom-4 right-4 z-50 w-[min(24rem,calc(100vw-2rem))] border border-(--color-border) bg-(--color-surface) text-(--color-text) shadow-(--shadow-card)"
          initial={{ y: 24, opacity: 0, rotate: 2 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: 24, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
          <div className="type-utility flex items-center gap-3 border-b border-(--color-border) px-4 py-2.5 [font-family:var(--font-body)] [font-size:0.875rem]">
            <span>⌖ {place}</span><span aria-hidden className="h-4 w-px bg-(--color-border)" /><span>✓ {label}</span>
            <button type="button" aria-label="Close" onClick={() => answer('dismissed')} className="ml-auto px-1 text-lg leading-none">×</button>
          </div>
          <p className="type-body px-4 pt-4 [font-size:0.9rem]">{text}</p>
          <div className="flex flex-wrap gap-2 px-4 pb-4 pt-4">
            <button type="button" onClick={() => answer('all')} className="type-body bg-(--color-chapter-1,var(--color-accent)) px-4 py-2 text-(--color-background) [font-size:0.9rem]">{accept} →</button>
            <button type="button" onClick={() => answer('necessary')} className="type-body px-3 py-2 underline underline-offset-4 [font-size:0.9rem]">{decline}</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
