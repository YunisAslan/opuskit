'use client'
// Home → First screen, "Product stage", built from layers: the word MORNING as wide as the screen allows, the
// Morning Person Mug (a cut-out) floating in front of its middle letters with a soft shadow breathing beneath it, and
// the headline, its line, the price and Add to bag at the foot. The remembered moment: the screen pins for ~2.3
// screens — the word slides off left, the mug rises, rolls in its own plane and shrinks a little, and the headline
// hands over to a second line in the display face. Fine pointers pull the mug toward them and push the word away.
// The mug is a flat photo: it only ever moves in 2D — no 3D turn, no added light.
// Phones: the word just above the middle with the mug over its top half, the words and action beneath, a shorter
// and gentler scroll, no pointer. Reduced motion: the same layers, standing still, no pin (CSS motion-reduce).
import { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { MediaAsset } from '@/components/media/MediaAsset'
import { Button } from '@/components/ui/button'
import { useAddToBag } from '@/components/parts/use-add-to-bag'
import { home } from '@/content/home'
import { productBySlug } from '@/content/products'
import { price } from '@/lib/format'
import { useMedia, useReduced } from '@/lib/use-media'

const spring = { stiffness: 90, damping: 18, mass: 0.6 }

export function ProductStage() {
  const h = home.hero
  const p = productBySlug(h.product)!
  const { add, added } = useAddToBag()
  const reduce = useReduced()
  const phone = useMedia('(max-width: 767px)')
  const finePointer = useMedia('(hover: hover) and (pointer: fine)')
  const ref = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)

  // Scroll: 0 → 1 across the pin
  const { scrollYProgress: s } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const wordX = useTransform(s, [0, phone ? 0.5 : 0.4], ['0vw', '-115vw'])
  const mugY = useTransform(s, [0, 1], ['0svh', phone ? '-7svh' : '-15svh'])
  const mugRoll = useTransform(s, [0, 1], [0, phone ? 9 : 16])
  const mugScale = useTransform(s, [0, 1], [1, phone ? 0.92 : 0.84])
  const shadowFade = useTransform(s, [0, 0.35], [1, 0])
  const footOut = useTransform(s, [0, 0.18], [1, 0])
  const footY = useTransform(s, [0, 0.18], [0, -24])
  // Once faded, the action can't be pressed or focused unseen
  const actionVis = useTransform(s, (v) => (v > 0.17 ? 'hidden' : 'visible'))
  const afterIn = useTransform(s, [0.42, 0.62], [0, 1])
  const afterY = useTransform(s, [0.42, 0.62], [48, 0])

  // Pointer: the mug drifts toward it (≤ 35px) and leans (≤ 6°); the word answers the other way
  const px = useSpring(0, spring)
  const py = useSpring(0, spring)
  const mugPX = useTransform(px, (v) => v * 35)
  const mugPY = useTransform(py, (v) => v * 35)
  const mugLean = useTransform(px, (v) => v * 6)
  const wordPX = useTransform(px, (v) => v * -12)
  const wordPY = useTransform(py, (v) => v * -6)
  const pointerOn = finePointer && !reduce
  useEffect(() => {
    if (!pointerOn) { px.set(0); py.set(0); return }
    const move = (e: PointerEvent) => {
      const r = stage.current?.getBoundingClientRect()
      if (!r || r.bottom < 0 || r.top > innerHeight) return
      const clamp = (v: number) => Math.max(-1, Math.min(1, v))
      px.set(clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2)))
      py.set(clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2)))
    }
    const leave = () => { px.set(0); py.set(0) }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => { window.removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', leave) }
  }, [pointerOn, px, py])

  const still = reduce

  return (
    <section ref={ref} aria-labelledby="hero-title"
      className="relative h-[calc(250svh-var(--nav-h))] md:h-[calc(330svh-var(--nav-h))] motion-reduce:h-auto md:motion-reduce:h-auto">
      <div ref={stage} className="hero-stage sticky top-(--nav-h) h-[calc(100svh-var(--nav-h))] min-h-[34rem] overflow-clip px-(--gutter) motion-reduce:static">
        {/* The word and the mug share one centre line: the middle of the screen, just above it on phones */}
        <div className="absolute inset-x-(--gutter) top-[43%] md:top-[46%]">
          {/* Behind: the word, as wide as the stage allows */}
          <motion.div aria-hidden style={still ? undefined : { x: wordX }} className="hero-word-box -translate-y-1/2">
            <motion.p style={still ? undefined : { x: wordPX, y: wordPY }}
              className="hero-word select-none whitespace-nowrap text-center text-(--color-text)">
              {h.word}
            </motion.p>
          </motion.div>

          {/* The shadow on the ground, under the mug: breathes with the float, fades as the mug lifts */}
          <motion.div aria-hidden style={still ? undefined : { x: mugPX, opacity: shadowFade }}
            className="hero-shadow-pos absolute left-1/2">
            <div className="hero-shadow" />
          </motion.div>

          {/* In front: the mug — scroll layer → pointer layer → float layer, all 2D */}
          <motion.div style={still ? undefined : { y: mugY, rotate: mugRoll, scale: mugScale }}
            className="hero-mug-pos absolute left-1/2">
            <motion.div style={still ? undefined : { x: mugPX, y: mugPY, rotate: mugLean }}>
              <div className="hero-float">
                <MediaAsset id="heroMug" priority sizes="(min-width: 768px) 34vw, 70vw"
                  className="bg-transparent" imgClassName="object-contain" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* The foot: headline and line on the left, price and the action on the right */}
        <div className="absolute inset-x-(--gutter) bottom-0 pb-[calc(20px+env(safe-area-inset-bottom,0px))] md:pb-9">
          <motion.div style={still ? undefined : { opacity: footOut, y: footY }}
            className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="max-w-[34rem]">
              <h1 id="hero-title" className="type-heading text-balance">
                <span className="block">{h.lines[0]} {h.lines[1]}</span>
                <span className="block">{h.tail}</span>
              </h1>
              <p className="type-body mt-2 max-w-[44ch] md:mt-3">{h.line}</p>
            </div>
            <motion.div style={still ? undefined : { visibility: actionVis }} className="flex shrink-0 items-center justify-between gap-5 md:justify-end md:gap-7">
              <p className="t-price">{price(p.price)}</p>
              <Button size="lg" onClick={() => add(p, 'Raspberry')} className="min-w-[11rem]" aria-live="polite">{added ? 'Added' : h.action}</Button>
            </motion.div>
          </motion.div>

          {/* Arrives as the screen scrolls away — in the display face, where the headline stood */}
          {!still && (
            <motion.p style={{ opacity: afterIn, y: afterY }}
              className="t-section pointer-events-none max-md:text-[min(14vw,3.6rem)] absolute inset-x-0 bottom-[calc(20px+env(safe-area-inset-bottom,0px))] md:bottom-9 motion-reduce:hidden">
              <span className="sr-only">{h.after}</span>
              <span aria-hidden>
                <span className="block">{h.afterLines[0]}</span>
                <span className="block">{h.afterLines[1]}</span>
              </span>
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
