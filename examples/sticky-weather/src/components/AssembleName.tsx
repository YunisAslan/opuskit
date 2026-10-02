'use client'
// The footer's reward: "Sticky Weather" assembles letter by letter, each letter landing like a sticker slapped on,
// when the footer comes into view. Each letter wobbles under the hand. Reduced motion: the name is simply there.
import { motion, useReducedMotion } from 'motion/react'
import { LogoMark } from '@/components/Logo'

// Fixed scatter per letter (no Math.random, so server and client agree).
const scatter = (i: number) => ({ x: ((i * 37) % 60) - 30, y: -40 - ((i * 53) % 50), rotate: ((i * 71) % 70) - 35 })

export function AssembleName({ name }: { name: string }) {
  const reduce = useReducedMotion()
  let n = 0
  return (
    <div>
      <LogoMark className="size-14 text-(--color-chapter-2)" />
      <motion.p aria-label={name} className="type-display mt-6 [font-size:clamp(3.25rem,7vw,6rem)]" initial="off" whileInView="on" viewport={{ once: true, amount: 0.6 }}
        transition={{ staggerChildren: reduce ? 0 : 0.05 }}>
        {name.split(' ').map((word) => (
          <span key={word} aria-hidden className="block whitespace-nowrap">
            {word.split('').map((ch) => {
              const s = scatter(n++)
              return (
                <motion.span key={n} className="inline-block" variants={{ off: { opacity: 0, scale: 1.6, ...s }, on: { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 } }}
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 22 }}
                  whileHover={reduce ? undefined : { rotate: s.rotate / 3, y: -6 }}>{ch}</motion.span>
              )
            })}
          </span>
        ))}
      </motion.p>
    </div>
  )
}
