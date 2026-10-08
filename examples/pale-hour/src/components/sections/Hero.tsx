'use client'
// Hero — Full-bleed photo with depth. 100svh photograph at scale 1.1 that drifts at 0.3× scroll speed; the headline
// anchored bottom-left on a pale wash, its words cut up out of a mask; the next section slides over as it leaves.
// Phones get their own 4:5 crop and a simple 1.1 → 1.0 scale-down instead of the drift. The cursor leaves a short
// trail of the year's prints (fine pointers only). Reduced motion: a still photograph, no trail.
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { getImageProps } from 'next/image'
import Link from 'next/link'
import { useSyncExternalStore } from 'react'
import { ImageTrail } from '@/components/pieces/ImageTrail'
import { TextEffect } from '@/components/pieces/TextEffect'
import { OpenStatus } from '@/components/site/OpenStatus'
import { buttonVariants } from '@/components/ui/button'
import type { Media } from '@/config/assets'
import { cn } from '@/lib/utils'

const mq = '(max-width: 767px)'
const useIsPhone = () => useSyncExternalStore(
  (cb) => { const m = window.matchMedia(mq); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) },
  () => window.matchMedia(mq).matches,
  () => false,
)

type P = {
  image: Media; mobile: Media; trail: string[]
  headline: string; breaks: { base: number[]; md: number[] }
  line: string; action: { label: string; href: string }
  address: string[]; directions: { label: string; href: string }
  nowOn: { label: string; artist: string; title: string; until: string; href: string }
}

export function HeroSection({ image, mobile, trail, headline, breaks, line, action, address, directions, nowOn }: P) {
  const reduce = useReducedMotion()
  const phone = useIsPhone()
  const { scrollY } = useScroll()
  const drift = useTransform(scrollY, (v) => v * 0.3)
  const settle = useTransform(scrollY, [0, 700], [1.1, 1])
  const leave = useTransform(scrollY, [0, 520], [1, 0])

  // One <picture>: the 4:5 crop on phones, the 16:9 frame from 768px.
  const common = { alt: image.alt, sizes: '100vw', fill: true, loading: 'eager' as const, fetchPriority: 'high' as const }
  const { props: { srcSet: desk } } = getImageProps({ ...common, src: image.src, quality: 75 })
  const { props: { srcSet: phoneSet, ...img } } = getImageProps({ ...common, src: mobile.src, quality: 75 })

  return (
    <section aria-label="Pale Hour" className="relative h-svh min-h-[34rem] overflow-hidden bg-(--color-background)">
      <motion.div className="absolute inset-0 will-change-transform" style={reduce ? { scale: 1.1 } : phone ? { scale: settle } : { y: drift, scale: 1.1 }}>
        <picture>
          <source media="(min-width: 768px)" srcSet={desk} sizes="100vw" />
          <source srcSet={phoneSet} sizes="100vw" />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
          <img {...img} className="object-cover" />
        </picture>
        {process.env.NODE_ENV === 'development' && image.temporary && (
          <span className="type-caption absolute left-[6%] top-[16%] bg-(--color-text) px-2 py-0.5 text-(--color-background)">Temporary: {phone ? mobile.key : image.key}</span>
        )}
      </motion.div>
      {/* The pale wash: text on a picture always sits on a scrim. The hall is a bright, sunlit room, so the scrim is
          the page's own grey rather than black, laid only where words sit and ink set on it: a light band under the
          menu; on desktop a wash fanning out from the bottom-left corner around the headline (the windows on the right
          stay vivid) plus a low band under the address; on the phone crop a band from the bottom up. */}
      <div aria-hidden className="hero-wash pointer-events-none absolute inset-0" />

      <div className="absolute inset-0"><ImageTrail photos={trail} className="h-full">
        <motion.div style={reduce ? undefined : { opacity: leave }} className="mx-auto flex h-full max-w-(--container) flex-col justify-end px-(--gutter) pb-[clamp(32px,6svh,64px)]">
          <div className="grid items-end gap-x-(--gutter) gap-y-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <TextEffect as="h1" preset="cut" breaks={breaks} delay={0.15} trigger="load" 
                className="type-display text-(--color-text) [font-size:clamp(2.75rem,7vw,7.25rem)] md:[font-size:clamp(3rem,7vw,7.25rem)]">
                {headline}
              </TextEffect>
              <p className="type-body mt-6 max-w-[44ch] text-(--color-text) md:mt-8">{line}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link href={action.href} className={cn(buttonVariants({ variant: 'outline' }), 'border-(--color-text) hover:bg-(--color-text) hover:text-(--color-background)')}>{action.label}</Link>
                <a href={directions.href} target="_blank" rel="noreferrer" className="type-utility link-on inline-flex min-h-11 items-center">{directions.label}</a>
              </div>
            </div>
            {/* The practical corner: where, when, what is on — the hero holds the address and hours on every visit */}
            <div className="type-caption hidden space-y-4 border-t border-(--color-border) pt-4 md:col-span-3 md:col-start-10 md:block">
              <address className="not-italic">{address.map((l) => <span key={l} className="block">{l}</span>)}</address>
              <OpenStatus mark />
              <p>
                <span className="block text-(--color-muted)">{nowOn.label}</span>
                <Link href={nowOn.href} className="link">{nowOn.artist}, <span className="label-title">{nowOn.title}</span>, until {nowOn.until}</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </ImageTrail></div>
    </section>
  )
}
