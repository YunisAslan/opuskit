'use client'
// Home — first screen, "Full-bleed photo with depth": a 100svh photograph at scale 1.1 that drifts at ~0.3× scroll
// speed, the headline anchored bottom-left on a scrim, the intro sliding over it on a wavy edge as it leaves.
// Mobile: a dedicated 4:5 crop and a plain scale-down (1.1 → 1.0). Reduced motion: a still photo.
import Link from 'next/link'
import { getImageProps } from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReduced } from './useReduced'
import { useEffect, useRef, useState } from 'react'
import { TextEffect } from '@/components/pieces/TextEffect'
import { Button } from '@/components/ui/button'
import { asset } from '@/config/assets'
import { home } from '@/content/site'
import { t } from './type'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReduced()
  const [wide, setWide] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const on = () => setWide(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const desk = asset('hero')
  const phone = asset('mobileHeroCrop')
  const common = { alt: desk.alt, sizes: '100vw', priority: true }
  const { props: { srcSet: phoneSet } } = getImageProps({ ...common, src: phone.src, width: phone.width, height: phone.height })
  const { props: deskProps } = getImageProps({ ...common, src: desk.src, width: desk.width, height: desk.height })

  const imgStyle = reduce ? { scale: 1.1 } : wide ? { y, scale: 1.1 } : { scale }

  return (
    <section ref={ref} aria-label="Welcome" className="relative h-svh min-h-[560px] overflow-hidden bg-(--color-surface)">
      <motion.div className="absolute inset-0 will-change-transform" style={imgStyle}>
        <picture>
          <source media="(max-width: 767px)" srcSet={phoneSet} sizes="100vw" />
          <img {...deskProps} alt={desk.alt} className="h-full w-full object-cover" />
        </picture>
      </motion.div>
      {/* scrims: the bar at the top, the headline at the bottom-left — text never sits on bare photo. The photo's lit
          shelves cross the headline zone, so the fade is deep there and leaves the record wall and lamp clear above right. */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-44 bg-linear-to-b from-(--color-background)/90 via-(--color-background)/60 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-(--color-background) from-12% via-(--color-background)/88 via-55% to-transparent to-[92%] md:via-(--color-background)/80 md:via-45% md:to-[80%]" />
      <div aria-hidden className="absolute inset-0 hidden bg-linear-to-r from-(--color-background)/85 via-(--color-background)/55 via-45% to-transparent to-[72%] md:block" />

      <motion.div className="absolute inset-x-0 bottom-0 isolate px-(--gutter) pb-[calc(var(--gutter)+56px)] md:pb-[calc(48px+72px)]" style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}>
        {/* a soft glow of the ground that travels with the headline, so short screens get the same calm behind it */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-32 bottom-0 -z-10 hidden bg-[radial-gradient(ellipse_62%_70%_at_28%_62%,color-mix(in_oklab,var(--color-background)_72%,transparent),transparent_78%)] md:block" />
        <div className="mx-auto max-w-(--container)">
          <TextEffect as="h1" preset="slide" className={`${t.h1} max-w-[11ch] whitespace-pre-line text-(--color-text)`}>{home.hero.title}</TextEffect>
          <p className="type-body mt-6 max-w-[38ch] text-(--color-text) [font-size:clamp(1.0625rem,1.4vw,1.25rem)]">{home.hero.line}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button asChild size="lg"><Link href="/reservations">{home.hero.action}</Link></Button>
            <Link href="/menu" className="type-utility link-hum inline-flex h-11 items-center text-(--color-text) [font-size:0.9375rem]">{home.hero.secondary}</Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
