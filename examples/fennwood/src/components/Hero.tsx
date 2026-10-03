'use client'
// Home hero, "Full-bleed photo with depth": 100svh photograph a little larger than the screen (scale 1.1). It stays put
// while the next chapter slides over it, and the tall photo drifts up at 0.3x the scroll. Mobile: its own 9:16 crop that
// settles from 1.1 to 1.0 instead. Reduced motion: a still photo.
import { getImageProps } from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, type CSSProperties } from 'react'
import { assets } from '@/config/assets'
import { CutReveal } from '@/components/pieces/CutReveal'
import { MotifStop } from '@/components/Mark'
import { Button } from '@/components/ui/button'

export function Hero({ lines, line, action }: { lines: string[]; line: string; action: { label: string; href: string } }) {
  const reduce = useReducedMotion()
  const desktop = useRef(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const set = () => { desktop.current = mq.matches }
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, (v) => (reduce || !desktop.current ? 0 : -0.3 * v))
  const scale = useTransform(scrollY, (v) => {
    if (reduce || desktop.current || v === 0) return 1.1
    return 1.1 - 0.1 * Math.min(v / window.innerHeight, 1)
  })

  const d = assets.hero, m = assets.heroMobile
  const { props: { srcSet: wide } } = getImageProps({ src: d.src, alt: d.alt, width: d.width, height: d.height, sizes: '100vw' })
  const { props: { srcSet: tall, ...img } } = getImageProps({ src: m.src, alt: m.alt, width: m.width, height: m.height, sizes: '100vw' })

  return (
    <section className="sticky top-0 h-svh overflow-hidden bg-(--color-text) text-(--color-background)">
      <motion.div className="absolute inset-x-0 top-0 h-svh origin-center will-change-transform lg:h-[130svh] lg:origin-top" style={{ y, scale }}>
        <picture>
          <source media="(min-width: 1024px)" srcSet={wide} sizes="100vw" />
          <img {...img} srcSet={tall} alt={d.alt} fetchPriority="high" loading="eager" className="h-full w-full object-cover [object-position:var(--pos-m)] lg:[object-position:var(--pos-d)]"
            style={{ "--pos-m": m.position, "--pos-d": d.position } as CSSProperties} />
        </picture>
      </motion.div>
      {/* A soft shade under the words; the photo is already dark there. */}
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-(--color-text)/75 via-(--color-text)/10 to-(--color-text)/35" />
      <div className="relative mx-auto flex h-full max-w-[1200px] flex-col items-start justify-end px-5 pb-14 md:px-6 md:pb-20">
        <MotifStop place="hero" tone="light" size={52} pose={-6} />
        <h1 className="type-display mt-6 max-w-[12ch]">
          {lines.map((l, i) => <CutReveal key={l} as="span" className="block" delay={i * 0.08}>{l}</CutReveal>)}
        </h1>
        <p className="type-body mt-6 max-w-[46ch] text-(--color-background)/90">{line}</p>
        <Button asChild size="lg" className="mt-8 bg-(--color-background) text-(--color-text) hover:bg-(--color-surface) focus-visible:bg-(--color-surface)">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      </div>
    </section>
  )
}
