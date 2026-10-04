'use client'
import { motion, useReducedMotion } from 'motion/react'
import type { ComponentProps } from 'react'

// Soft fade: a section settles in like light changing. Opacity only, once, as it enters the viewport.
// Reduced motion: the same fade at 200 ms.
export function Reveal({ off, ...props }: ComponentProps<typeof motion.div> & { off?: boolean }) {
  const reduce = useReducedMotion()
  if (off) return <motion.div {...props} />
  return <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    transition={{ duration: reduce ? 0.2 : 0.9, ease: [0.25, 0.1, 0.25, 1] }} {...props} />
}
