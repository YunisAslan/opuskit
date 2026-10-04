'use client'
// The film band mid-page (Home, after the works): a live set in a dark room, played forwards and back by the scroll.
// A 100svh stage pins inside a 300vh block (180vh on phones, with the 9:16 encode); Motion's useScroll gives the
// block's progress, smoothed with a spring, and that sets video.currentTime. Both encodes carry a keyframe every
// 6 frames, so seeking is instant. The video loads only as the band nears the viewport (preload="none" until then).
// Type appears at three chapter points. Reduced motion: no pin and no film, the poster with all three lines.
import Link from 'next/link'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useEffect, useRef } from 'react'
import { assets } from '@/config/assets'

const { film } = assets

function Beat({ progress, at, children, className = '' }: { progress: MotionValue<number>; at: [number, number]; children: React.ReactNode; className?: string }) {
  const [a, b] = at
  const opacity = useTransform(progress, [a, a + 0.06, b - 0.06, b], [0, 1, 1, b >= 1 ? 1 : 0])
  const y = useTransform(progress, [a, a + 0.06], [24, 0])
  return <motion.div style={{ opacity, y }} className={`absolute inset-x-0 bottom-0 px-5 pb-12 md:px-8 md:pb-16 ${className}`}>{children}</motion.div>
}

export function ScrollFilm() {
  const block = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll({ target: block, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useMotionValueEvent(smooth, 'change', (p) => {
    const v = video.current
    if (v && v.readyState >= 1 && v.duration) v.currentTime = Math.min(v.duration - 0.05, Math.max(0, p * v.duration))
  })

  useEffect(() => {
    const v = video.current, el = block.current
    if (!v || !el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      v.src = matchMedia('(min-width: 768px)').matches ? film.desktop : film.mobile
      v.preload = 'auto'
      v.load()
      // iOS paints seeked frames only after the video has played once.
      v.play().then(() => v.pause()).catch(() => {})
    }, { rootMargin: '100% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const lines = [
    <h2 key="a" className="type-display max-w-[12ch]">Night Shift</h2>,
    <p key="b" className="type-heading max-w-[22ch]">Seventy minutes in the dark. Wind, rain and machines, played live.</p>,
    <div key="c">
      <p className="type-heading max-w-[22ch]">Next in Baku, Tbilisi, Istanbul and Berlin.</p>
      <Link href="/live" className="type-body mt-6 inline-flex h-11 items-center rounded-button border border-(--color-text) px-6 transition-colors duration-150 hover:bg-(--color-text) hover:text-(--color-background)">See the dates</Link>
    </div>,
  ]

  return (
    <section ref={block} aria-label="Night Shift, the live set" className="relative motion-safe:h-[180vh] motion-safe:md:h-[300vh]">
      {/* Reduced motion: no pin and no film, the poster and all three lines. */}
      <div className="hidden motion-reduce:block">
        <picture>
          <source media="(min-width: 768px)" srcSet={film.poster.src} />
          <img src={film.posterMobile.src} alt="Night Shift: musicians in a dark, smoky room under rows of white light" className="aspect-[9/16] w-full object-cover md:aspect-[21/9]" loading="lazy" />
        </picture>
        <div className="space-y-8 px-5 py-16 md:px-8">{lines}</div>
      </div>
      <div className="sticky top-0 h-svh overflow-hidden motion-reduce:hidden">
        <picture>
          <source media="(min-width: 768px)" srcSet={film.poster.src} />
          <img src={film.posterMobile.src} alt="" className="absolute inset-0 size-full object-cover" loading="lazy" />
        </picture>
        <video ref={video} muted playsInline preload="none" aria-label="Night Shift: musicians in a dark, smoky room under rows of white light, the camera circling slowly"
          className="absolute inset-0 size-full object-cover" />
        {/* An even dim in the ground colour keeps the type readable over the light rigs. */}
        <div aria-hidden className="absolute inset-0 bg-(--color-background)/25" />
        <Beat progress={smooth} at={[-0.06, 0.36]}>{lines[0]}</Beat>
        <Beat progress={smooth} at={[0.36, 0.68]}>{lines[1]}</Beat>
        <Beat progress={smooth} at={[0.68, 1]}>{lines[2]}</Beat>
      </div>
    </section>
  )
}
