'use client'
// What the presses printed — About's remembered moment. One sentence, "Since 1891 this hall has printed …", pinned
// while you scroll; the last words change with the years (railway timetables, seed catalogues, the evening paper,
// nothing at all) until they land on "photographs". The year stands huge beside it and a rule of five years marks
// where you are. Each change is a cut: the old words leave upward out of a hard mask, the new ones rise into it.
// Phones and reduced motion: no pin — the five years as a ruled list, read straight down.
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { i } from '@/components/motion/stagger'
import { cn } from '@/lib/utils'

type Year = { year: string; word: string }
const ease = [0.65, 0, 0.35, 1] as const

export function Presses({ lead, years, label }: { lead: string; years: Year[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [n, setN] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (p) => setN(Math.min(years.length - 1, Math.max(0, Math.floor(p * years.length)))))
  const cut = { initial: { y: '105%' }, animate: { y: 0 }, exit: { y: '-105%' }, transition: { duration: 0.7, ease } }

  const list = (
    <Reveal as="ol" aria-label={label} className="border-t border-(--color-text) md:hidden motion-reduce:md:block">
      {years.map((y, k) => (
        <li key={y.year} className="rv-text grid grid-cols-[4.5rem_1fr] items-baseline gap-4 border-b border-(--color-border) py-5 md:grid-cols-[10rem_1fr]" style={i(k)}>
          <span className="type-utility tabular-nums">{y.year}</span>
          <span className="type-heading">{lead.replace(/^Since \d+ /, '').replace(/^this hall has /, 'The hall ')} {y.word}.</span>
        </li>
      ))}
    </Reveal>
  )

  return (
    <>
      {list}
      <div ref={ref} className="relative hidden md:block motion-reduce:md:hidden" style={{ height: `${years.length * 60 + 40}svh` }}>
        <p className="sr-only">{years.map((y) => `${y.year}: ${y.word}.`).join(' ')}</p>
        <div aria-hidden className="sticky top-0 flex h-svh flex-col justify-center">
          <div className="grid grid-cols-12 items-end gap-x-(--gutter)">
            {/* the year, huge, cut in and out with the words */}
            <div className="relative col-span-4 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p key={years[n].year} {...cut} className="type-display tabular-nums [font-size:clamp(5rem,11vw,10.5rem)] leading-none pt-[0.06em]">{years[n].year}</motion.p>
              </AnimatePresence>
            </div>
            <div className="col-span-8 pb-[0.35em]">
              <p className="type-heading [font-size:clamp(1.75rem,3.4vw,3.25rem)] text-(--color-muted)">{lead}</p>
              <div className="relative overflow-hidden pb-[0.22em] -mb-[0.1em]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p key={years[n].word} {...cut} className="type-display [font-size:clamp(3rem,6.4vw,6.25rem)]">{years[n].word}.</motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
          {/* five years on a rule: where you are in the building's story */}
          <ol className="mt-[clamp(48px,8svh,96px)] grid grid-cols-5 border-t border-(--color-border)">
            {years.map((y, k) => (
              <li key={y.year} className="relative pt-4">
                <span className={cn('absolute -top-px left-0 h-px w-full origin-left bg-(--color-text) transition-transform duration-500 ease-(--ease-page)', k <= n ? 'scale-x-100' : 'scale-x-0')} />
                <span className={cn('type-utility tabular-nums transition-colors duration-300', k === n ? 'text-(--color-text)' : 'text-(--color-muted)')}>{y.year}</span>
                <span className={cn('type-caption block text-(--color-muted) transition-opacity duration-300', k <= n ? 'opacity-100' : 'opacity-0')}>{y.word}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  )
}
