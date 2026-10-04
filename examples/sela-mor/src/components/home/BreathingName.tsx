'use client'
// Kinetic type hero: the name, huge, breathing. Mona Sans's width axis widens and narrows the letters slowly, like a
// breath (one cycle every 7 s). While the site's sound plays, the width follows the loudness of the loop instead
// (SOUND_ENVELOPE, measured from the file; it advances only while the sound switch reports playing, so it keeps step
// with the audio). On scroll the two words drift apart on desktop; on phones they sit on two lines and slide down
// behind their masks instead. Reduced motion: the name stands still, at its middle width.
// The frame loop runs only while the name is on screen.
import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { SOUND_ENVELOPE, SOUND_ENVELOPE_HZ } from '@/config/sound-envelope'

const MIN = 82, MAX = 125, BREATH = 7 // wdth range and seconds per breath

export function BreathingName({ first, last, line, action }: { first: string; last: string; line: string; action: React.ReactNode }) {
  const section = useRef<HTMLElement>(null)
  const name = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
  const left = useTransform(scrollYProgress, [0, 1], ['0vw', '-20vw'])
  const right = useTransform(scrollYProgress, [0, 1], ['0vw', '20vw'])
  const drop = useTransform(scrollYProgress, [0, 0.7], ['0%', '100%'])

  useEffect(() => {
    const el = name.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0, visible = false, last = performance.now(), breath = 0, heard = 0, width = (MIN + MAX) / 2, mix = 0
    const bars = () => document.querySelector('[data-opuskit-sound] .opuskit-bars')
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000) // a hidden tab doesn't advance the clocks
      last = now
      breath += dt
      const playing = !!bars()?.hasAttribute('data-playing')
      if (playing) heard += dt
      mix += ((playing ? 1 : 0) - mix) * Math.min(1, dt * 1.5) // ease between breathing and listening
      const calm = 0.5 - 0.5 * Math.cos((breath / BREATH) * Math.PI * 2)
      const i = Math.floor(heard * SOUND_ENVELOPE_HZ) % SOUND_ENVELOPE.length
      const loud = SOUND_ENVELOPE[i] / 100
      const target = MIN + (MAX - MIN) * (calm * (1 - mix) + loud * mix)
      width += (target - width) * Math.min(1, dt * 6)
      el.style.fontStretch = `${width.toFixed(1)}%`
      if (visible) frame = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(frame)
      if (visible) { last = performance.now(); frame = requestAnimationFrame(tick) }
    })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(frame) }
  }, [])

  return (
    <section ref={section} className="relative flex min-h-svh flex-col justify-between overflow-hidden px-5 pb-6 pt-28 md:px-8 md:pb-8">
      <h1 ref={name} aria-label={`${first} ${last}`} className="hero-name my-auto">
        {[first, last].map((word, i) => (
          <span key={word} aria-hidden className="block overflow-hidden md:inline-block md:overflow-visible">
            <motion.span className="block motion-safe:max-md:translate-y-(--drop) md:inline-block motion-safe:md:translate-x-(--dx)"
              style={{ '--dx': i ? right : left, '--drop': drop } as never}>
              {word}{i === 0 && <span className="hidden md:inline">&nbsp;</span>}
            </motion.span>
          </span>
        ))}
      </h1>
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <p className="type-body max-w-[40ch] text-(--color-muted) md:col-span-5">{line}</p>
        <div className="md:col-span-3 md:col-start-10 md:justify-self-end">{action}</div>
      </div>
    </section>
  )
}
