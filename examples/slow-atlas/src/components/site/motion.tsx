'use client'

import type { CSSProperties, ReactNode } from 'react'
import { LazyMotion, MotionConfig, domAnimation, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'

const ease = [0.22, 1, 0.36, 1] as const

// reducedMotion="user": with prefers-reduced-motion, Motion drops every transform and keeps opacity only.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation} strict><MotionConfig reducedMotion="user">{children}</MotionConfig></LazyMotion>
}

// Fade & rise reveal: opacity 0→1, y 16px→0, once, when 20% is in view. `delay` staggers siblings (60ms steps).
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduce ? { duration: 0.2 } : { duration: 0.6, ease, delay }}
    >
      {children}
    </m.div>
  )
}

type Tag = 'h1' | 'h2' | 'p'
/**
 * Line-by-line headline reveal with manual line breaks.
 * `lines` are the desktop lines; a line given as an array is split into those pieces on mobile (< 768px),
 * so every breakpoint gets intentional breaks. Each piece is masked and rises from 100%, 80ms apart.
 * `onLoad` plays it with CSS on first paint (the hero) instead of on viewport entry.
 */
export function Headline({ lines, as = 'h2', className, onLoad = false }: { lines: (string | string[])[]; as?: Tag; className?: string; onLoad?: boolean }) {
  let n = 0
  const pieces = lines.map((line, li) => (Array.isArray(line) ? line : [line]).map((text) => ({ text, i: n++, li })))
  const label = lines.flat().join(' ')

  if (onLoad) {
    const T = as
    return (
      <T className={className}>
        <span className="sr-only">{label}</span>
        {pieces.map((line, li) => (
          <span key={li} aria-hidden className="block">
            {line.map((p, pi) => (
              <span key={pi}>
                <span className="line-mask hero-line md:inline-block md:align-top" style={{ '--d': `${p.i * 80}ms`, '--dd': `${p.li * 80}ms` } as CSSProperties}>
                  <span className="line-inner">{p.text}</span>
                </span>
                {pi < line.length - 1 && ' '}
              </span>
            ))}
          </span>
        ))}
      </T>
    )
  }

  const M = { h1: m.h1, h2: m.h2, p: m.p }[as]
  return (
    <M className={className} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.4 }}>
      <span className="sr-only">{label}</span>
      {pieces.map((line, li) => (
        <span key={li} aria-hidden className="block">
          {line.map((p, pi) => (
            <span key={pi}>
              <span className="line-mask md:inline-block md:align-top">
                <m.span
                  className="line-inner"
                  variants={{ hidden: { y: '105%' }, shown: { y: 0, transition: { duration: 0.7, ease, delay: p.i * 0.08 } } }}
                >
                  {p.text}
                </m.span>
              </span>
              {pi < line.length - 1 && ' '}
            </span>
          ))}
        </span>
      ))}
    </M>
  )
}
