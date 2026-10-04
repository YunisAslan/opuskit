'use client'
// Illustrated hero: the inkwell drawing in three depths. Scrolling pulls the layers apart (moon sinks, moths rise and
// spread); the moths also lean a little toward the pointer. Reduced motion: one still drawing.
import Link from 'next/link'
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform, useMotionValue } from 'motion/react'
import { useRef } from 'react'
import { HeroBack, HeroInkwell, HeroMothsLeft, HeroMothsRight } from './Drawings'
import { Button } from './ui/button'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const k = reduce ? 0 : 1 // reduced motion: the layers stay put (same first render either way, so hydration matches)
  const backY = useTransform(scrollYProgress, [0, 1], [0, 90 * k])
  const midY = useTransform(scrollYProgress, [0, 1], [0, -30 * k])
  const frontY = useTransform(scrollYProgress, [0, 1], [0, -170 * k])
  const leftX = useTransform(scrollYProgress, [0, 1], [0, -60 * k])
  const rightX = useTransform(scrollYProgress, [0, 1], [0, 60 * k])
  const px = useMotionValue(0), py = useMotionValue(0)
  const leanX = useSpring(px, { stiffness: 60, damping: 18 }), leanY = useSpring(py, { stiffness: 60, damping: 18 })

  const lean = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return
    const b = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - b.left) / b.width - 0.5) * 24)
    py.set(((e.clientY - b.top) / b.height - 0.5) * 16)
  }

  return (
    <section ref={ref} id="inkwell" data-spy="The inkwell" onPointerMove={lean} data-still={inView ? undefined : ''}
      className="relative overflow-hidden lg:min-h-svh">
      {/* The drawing: a portrait detail on top on mobile, cropped by the right edge on desktop. */}
      <div className="relative mx-auto h-[58svh] w-[118%] -translate-x-[8%] md:h-[70svh] lg:absolute lg:inset-y-0 lg:right-[-14%] lg:h-full lg:w-[70%] lg:translate-x-0">
        <motion.div className="absolute inset-0" style={{ y: backY }}><HeroBack /></motion.div>
        <motion.div className="absolute inset-0" style={{ y: midY }}><HeroInkwell /></motion.div>
        <motion.div className="absolute inset-0" style={{ y: frontY, x: leftX }}>
          <motion.div className="absolute inset-0" style={{ x: leanX, y: leanY }}><HeroMothsLeft /></motion.div>
        </motion.div>
        <motion.div className="absolute inset-0" style={{ y: frontY, x: rightX }}>
          <motion.div className="absolute inset-0" style={{ x: leanX, y: leanY }}><HeroMothsRight /></motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 px-5 pb-20 md:px-10 lg:flex lg:min-h-svh lg:flex-col lg:justify-end lg:pb-24 lg:pt-32">
        <h1 className="type-display mt-2 max-w-[11ch] text-[clamp(2.6rem,12.4vw,4.4rem)] md:text-[clamp(4rem,9vw,6.5rem)] lg:mt-0 lg:text-(length:--type-display-size)">
          Small night <br />creatures, <br />drawn by hand.
        </h1>
        <div className="mt-8 grid gap-6 md:grid-cols-12 lg:mt-10">
          <p className="type-body max-w-[42ch] md:col-span-7 lg:col-span-5">
            Picture books in ink and watercolour by Nell Arden, painted at a long table in an old bakery in Sheki.
          </p>
          <div className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-6 lg:self-end">
            <Button asChild size="lg" className="h-14 rounded-(--radius-button) bg-(--color-primary) px-7 text-base text-(--color-background) hover:bg-(--color-text)">
              <Link href="/commissions">Commission a book</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
