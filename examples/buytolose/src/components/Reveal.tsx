"use client"
import { motion, type Variants } from "motion/react"
import type { ReactNode } from "react"
import { EASE_IN_OUT, EASE_OUT, useReducedMotion } from "@/lib/motion"

type Tag = "div" | "section" | "ul" | "ol" | "article" | "li"

/** Fade & rise: the wrapper observes the viewport once; direct <RevealItem> children stagger 60ms. */
export function Reveal({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: Tag }) {
  const M = motion[as]
  return (
    <M className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
      {children}
    </M>
  )
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: Tag }) {
  const reduced = useReducedMotion()
  const M = motion[as]
  const variants: Variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } } }
  return <M className={className} variants={variants}>{children}</M>
}

/** Image clip reveal: the frame opens bottom-up while the inner media settles from 1.15 to 1. Parent must size the frame.
 *  The unclipped wrapper is what gets observed: IntersectionObserver ignores fully clipped boxes. */
export function ClipReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  const t = { duration: 1.1, ease: EASE_IN_OUT }
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <motion.div className="relative h-full w-full overflow-hidden rounded-[inherit]" variants={reduced
        ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
        : { hidden: { clipPath: "inset(100% 0 0 0)" }, show: { clipPath: "inset(0% 0 0 0)", transition: t } }}>
        <motion.div className="relative h-full w-full" variants={reduced ? {} : { hidden: { scale: 1.15 }, show: { scale: 1, transition: t } }}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/** Line-by-line headline: lines are split by hand in markup so each breakpoint can re-break deliberately. */
export function LineReveal({ lines, as: Tag = "h2", className = "", id }: { lines: ReactNode[]; as?: "h1" | "h2" | "p"; className?: string; id?: string }) {
  const reduced = useReducedMotion()
  return (
    <Tag id={id} className={className}>
      <motion.span className="block" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em]">
            <motion.span className="block" variants={reduced
              ? { hidden: { y: 0 }, show: { y: 0 } }
              : { hidden: { y: "100%" }, show: { y: "0%", transition: { duration: 0.7, ease: EASE_OUT } } }}>
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
