'use client'
// OpusKit piece — adapted from Motion Primitives "Text Effect" (MIT © 2024 ibelick, https://motion-primitives.com); the `cut`
// preset from Fancy Components "Vertical Cut Reveal" (MIT © 2024 Daniel Petho, https://fancycomponents.dev).
// Reveals a headline word by word once it enters the viewport: `cut` — each word slides up out of a hard mask.
// Pale Hour: hand-set line breaks per breakpoint (`breaks`), the site's page easing, staggers inside 40–80 ms.
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { createElement, Fragment, type JSX } from 'react'

type Preset = 'slide' | 'fade' | 'cut'
const ITEM: Record<Preset, Variants> = {
  slide: { hidden: { opacity: 0, y: '0.6em' }, visible: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  cut: { hidden: { y: '105%' }, visible: { y: 0 } },
}

export function TextEffect({ children, as = 'h2', preset = 'cut', delay = 0, breaks, className, id, trigger = 'view' }: {
  children: string; as?: keyof JSX.IntrinsicElements; preset?: Preset; delay?: number; className?: string; id?: string
  /** `load`: page titles cut in with the first paint (CSS, no wait for JavaScript), so the first screen is never empty. */
  trigger?: 'view' | 'load'
  /** Word indexes (0-based) after which a line breaks: `base` on phones, `md` from 768px. */
  breaks?: { base?: number[]; md?: number[] }
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as as 'h2']
  const words = children.split(/\s+/)
  const br = (n: number) => {
    const b = breaks?.base?.includes(n), m = breaks?.md?.includes(n)
    return b && m ? <br aria-hidden /> : b ? <br aria-hidden className="md:hidden" /> : m ? <br aria-hidden className="hidden md:inline" /> : null
  }

  if (trigger === 'load') return createElement(as, { id, className }, (
    <>
      <span className="sr-only">{children}</span>
      {words.map((w, n) => (
        <Fragment key={n}>
          <span aria-hidden className="inline-flex overflow-hidden pb-[0.1em] align-bottom -mb-[0.1em]">
            <span className="cut-in inline-block whitespace-pre" style={{ animationDelay: `${Math.round(delay * 1000) + n * 70}ms` }}>{w}</span>
          </span>
          {br(n)}
          {n < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  ))
  const timing = reduce ? { duration: 0 } : { duration: preset === 'cut' ? 0.9 : 0.6, ease: [0.65, 0, 0.35, 1] as const }
  return (
    <Tag id={id} className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}
      transition={reduce ? { duration: 0 } : { staggerChildren: 0.07, delayChildren: delay }}> {/* same markup either way (hydration); reduced motion only drops the timing */}
      <span className="sr-only">{children}</span>
      {words.map((w, n) => {
        const gap = n < words.length - 1 ? ' ' : null
        return (
          <Fragment key={n}>
            {preset === 'cut' ? (
              <span aria-hidden className="inline-flex overflow-hidden pb-[0.1em] align-bottom -mb-[0.1em]">
                <motion.span className="inline-block whitespace-pre" variants={ITEM.cut} transition={timing}>{w}</motion.span>
              </span>
            ) : (
              <motion.span aria-hidden className="inline-block whitespace-pre" variants={ITEM[preset]} transition={timing}>{w}</motion.span>
            )}
            {br(n)}
            {gap}
          </Fragment>
        )
      })}
    </Tag>
  )
}
