"use client";

import { domAnimation, LazyMotion, useReducedMotion, type Variants } from "motion/react";
import * as motion from "motion/react-m";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade & rise: observes the section wrapper once, staggers RevealItem children by 60ms. */
export function Reveal({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" | "article" | "figure" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <LazyMotion features={domAnimation}>
    <M
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ shown: { transition: { staggerChildren: reduce ? 0 : 0.06 } } }}
    >
      {children}
    </M>
    </LazyMotion>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const variants: Variants = reduce
    ? { hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
  return (
    <LazyMotion features={domAnimation}>
      <motion.div className={className} variants={variants}>
        {children}
      </motion.div>
    </LazyMotion>
  );
}

/** Line-by-line headline reveal. Lines are split by hand in markup; each is masked and rises 100%→0, 80ms apart. */
export function Lines({ lines, className }: { lines: ReactNode[]; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
    <motion.span
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ shown: { transition: { staggerChildren: 0.08 } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: "100%" }, shown: { y: 0, transition: { duration: 0.7, ease } } }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
    </LazyMotion>
  );
}

/** Image clip reveal: the frame wipes open upward once. Reduced motion: shown as-is.
 *  The observer sits on an unclipped wrapper — a fully clipped element never counts as in view. */
export function ClipReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation}>
    <motion.div className={className} initial={reduce ? false : "hidden"} whileInView="shown" viewport={{ once: true, amount: 0.2 }}>
      <motion.div
        className="relative h-full w-full"
        variants={{ hidden: { clipPath: "inset(100% 0% 0% 0%)" }, shown: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.9, ease } } }}
      >
        {children}
      </motion.div>
    </motion.div>
    </LazyMotion>
  );
}
