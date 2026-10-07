'use client'
// Hero — Full-bleed photo with depth. 100svh, the picture 1.1× the frame so it can drift at 0.3× the scroll; the
// headline sits bottom-left on a scrim and its lines lift away one after another as the page moves on; the next
// section slides over the pinned hero. Phones get the 4:5 crop and a plain scale-down (1.1 → 1.0) instead.
// The first screen is complete before anything moves: nothing here animates until the visitor scrolls.
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'
import { ArtDirected } from '@/components/MediaAsset'
import { Button } from '@/components/ui/button'
import { home } from '@/content/site'

export function Hero() {
  const reduce = useReducedMotion()
  const [wide, setWide] = useState(true)
  useEffect(() => {
    const mq = matchMedia('(min-width: 768px)')
    const on = () => setWide(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  const { scrollY } = useScroll()
  // Ranges are clamped, so nothing keeps moving once the hero is covered.
  const drift = useTransform(scrollY, [0, 1000], reduce ? [0, 0] : [0, 300])
  const settle = useTransform(scrollY, [0, 700], reduce ? [1, 1] : [1.1, 1])
  // The first line lifts fastest, so the lines open apart as they rise.
  const line0 = useTransform(scrollY, [0, 700], reduce ? [0, 0] : [0, -260])
  const line1 = useTransform(scrollY, [0, 700], reduce ? [0, 0] : [0, -190])
  const line2 = useTransform(scrollY, [0, 700], reduce ? [0, 0] : [0, -120])
  const fade = useTransform(scrollY, [0, 400], reduce ? [1, 1] : [1, 0])
  const lifts = [line0, line1, line2]
  const { lines, mobile, line, action } = home.hero

  const set = (ls: string[], cls: string) => (
    <span aria-hidden className={`block ${cls}`}>
      {ls.map((l, i) => <motion.span key={l} className="block" style={{ y: lifts[i] }}>{l}</motion.span>)}
    </span>
  )

  return (
    <section aria-label="Fieldhouse" className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden lg:top-0 lg:h-svh">
      <motion.div className="absolute inset-0" style={wide ? { y: drift, scale: 1.1 } : { y: 0, scale: settle }}>
        <ArtDirected wide="hero" narrow="heroMobile" sizes="(min-width: 1024px) calc(100vw - 220px), 100vw" className="object-[40%_50%] md:object-[50%_60%]" />
      </motion.div>
      {/* Scrim: the headline never sits on the busy glazing. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-background via-background/70 to-transparent" />

      <div className="relative flex h-full flex-col justify-end px-(--gutter) pb-10 md:pb-16">
        <div className="mx-auto w-full max-w-(--container)">
          <h1 className="type-display max-w-[14ch] text-balance">
            <span className="sr-only">{lines.join(' ')}</span>
            {set(mobile, 'md:hidden')}
            {set(lines, 'max-md:hidden')}
          </h1>
          <motion.div style={{ opacity: fade }} className="mt-8 flex flex-col items-start gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
            <p className="type-body max-w-[42ch] text-(--color-text)">{line}</p>
            <Button asChild size="lg" className="max-md:w-full"><Link href={action.href}>{action.label}</Link></Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
