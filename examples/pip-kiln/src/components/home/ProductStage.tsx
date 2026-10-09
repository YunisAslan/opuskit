'use client'
// Home → First screen, "Product stage": the Morning Person Mug alone on a big surface disc, offset right; the headline
// huge on the left with its price and one action. The remembered moment: a raspberry starburst price pops onto the
// stage once the page is readable, and as you scroll away the mug tilts and lifts off its disc, as if picked up.
// Phones: the stage first, the words beneath, and the action sticks to the bottom while the stage is in view.
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { MediaAsset } from '@/components/media/MediaAsset'
import { DrawnLink } from '@/components/pieces/DrawnLink'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Starburst } from '@/components/parts/Starburst'
import { Sticker } from '@/components/parts/Sticker'
import { useAddToBag } from '@/components/parts/use-add-to-bag'
import { home } from '@/content/home'
import { productBySlug } from '@/content/products'
import { price } from '@/lib/format'
import { useReduced } from '@/lib/use-media'

export function ProductStage() {
  const h = home.hero
  const p = productBySlug(h.product)!
  const { add, added } = useAddToBag()
  const reduce = useReduced()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -9])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const lift = useTransform(scrollYProgress, [0, 1], [1, 1.04])

  const buy = (
    <Button size="lg" onClick={() => add(p)} className="min-w-[11rem]" aria-live="polite">{added ? 'Added' : `${h.action}`}</Button>
  )

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative px-(--gutter) md:min-h-[calc(100svh-var(--nav-h))]">
      <div className="mx-auto grid max-w-(--container) items-center gap-x-(--gutter) gap-y-8 pt-6 md:min-h-[calc(100svh-var(--nav-h))] md:grid-cols-24 md:py-12">
        {/* The stage */}
        <div className="relative md:order-2 md:col-span-12 md:col-start-13">
          <div className="relative mx-auto aspect-square w-full max-w-[44rem]">
            <div aria-hidden className="absolute inset-[4%] rounded-full bg-(--color-surface)" />
            <div aria-hidden className="absolute inset-x-[16%] bottom-[9%] h-[7%] rounded-[50%] bg-(--color-secondary)" />
            <motion.div style={reduce ? undefined : { rotate, y, scale: lift }} className="absolute left-[23%] top-[15%] w-[54%] origin-bottom">
              <MediaAsset id="hero" priority sizes="(min-width: 768px) 30vw, 54vw" className="rounded-(--radius-media)" />
            </motion.div>
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -30 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: -10 }}
              transition={reduce ? { duration: 0.2, delay: 0.4 } : { type: 'spring', duration: 0.6, bounce: 0.4, delay: 0.5 }}
              className="absolute left-[2%] top-[8%] w-[27%] md:left-[0%]">
              <Starburst className="w-full"><span className="type-display block [font-size:clamp(1.6rem,4.2vw,3.6rem)] leading-none">{price(p.price)}</span></Starburst>
            </motion.div>
            <div className="absolute bottom-[14%] right-[4%]"><Sticker tilt={6}>{h.sticker}</Sticker></div>
          </div>
        </div>

        {/* The words */}
        <div className="relative z-10 md:order-1 md:col-span-12 md:col-start-1">
          <Badge variant="ink">{h.badge}: Sunshine</Badge>
          <h1 id="hero-title" className="mt-5">
            <span className="t-hero block">{h.lines[0]}</span>
            <span className="t-hero block">{h.lines[1]}</span>
            <span className="t-sticker mt-3 block md:mt-5">{h.tail}</span>
          </h1>
          <p className="type-body mt-6 max-w-[40ch]">{h.line}</p>
          <div className="mt-8 hidden flex-wrap items-center gap-x-8 gap-y-5 md:flex">
            {buy}
            <DrawnLink link={Link} href="/shop" className="t-action py-3">{h.secondary}</DrawnLink>
          </div>
          <p className="mt-6 md:hidden"><DrawnLink link={Link} href="/shop" className="t-action py-3">{h.secondary}</DrawnLink></p>
        </div>
      </div>

      {/* Phones: the action stays at the bottom while the first screen is in view */}
      <div className="sticky bottom-0 z-20 -mx-(--gutter) mt-8 border-t border-(--color-text) bg-(--color-background) px-(--gutter) pb-[calc(12px+env(safe-area-inset-bottom,0px))] pt-3 md:hidden">
        <div className="flex items-center justify-between gap-4">
          <p className="min-w-0"><span className="t-card text-room block truncate">{p.name}</span><span className="type-caption tabular-nums text-(--color-muted)">{price(p.price)}</span></p>
          <Button onClick={() => add(p)} className="shrink-0 min-w-[9.5rem]">{added ? 'Added' : h.action}</Button>
        </div>
      </div>
    </section>
  )
}
