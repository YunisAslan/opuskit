'use client'
// OpusKit piece — adapted from Motion Primitives "Scroll Progress" (MIT © 2024 ibelick, https://motion-primitives.com).
// A hairline across the top that fills as the visitor reads. For long pages: journal posts, case studies, FAQs.
import { motion, useScroll, useSpring } from 'motion/react'

export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50, restDelta: 0.001 })
  return <motion.div aria-hidden className={`fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-(--color-accent) ${className ?? ''}`} style={{ scaleX }} />
}
