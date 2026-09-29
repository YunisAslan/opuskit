'use client'
// OpusKit piece — adapted from Motion Primitives "Text Loop" (MIT © 2024 ibelick, https://motion-primitives.com).
// One word of a headline cycles through a short list ("We build | shops | archives | tools").
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

export function TextLoop({ words, interval = 2.4, className }: { words: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce || words.length < 2) return
    const t = setInterval(() => setI((x) => (x + 1) % words.length), interval * 1000)
    return () => clearInterval(t)
  }, [reduce, words.length, interval])
  return (
    <span className={`relative inline-block whitespace-nowrap align-bottom ${className ?? ''}`} aria-live="off">
      <span className="sr-only">{words.join(', ')}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={i} aria-hidden className="inline-block" initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
