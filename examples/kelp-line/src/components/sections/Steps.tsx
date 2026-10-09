'use client'
// OpusKit section — Steps, "rail" design, fitted to Kelp Line as Programs' remembered moment, "The seeded line": the
// title holds still while the year of one plant runs down a line. As you read, the line draws itself down like a
// seeded line paid out into the water; each stage lights (its dot fills, its words come up to full ink) as the line
// reaches it, and the still column says where the line has got to. Numbered, because it is a real sequence.
// Phones: the same line down the left edge, the readout hidden. Reduced motion: the line stands fully drawn and every
// stage is lit — the words still settle in with a short fade.
import { useReduced } from '@/components/motion/useReduced'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type Step = { name: string; text: string; duration?: string }

export function StepsSection({ tone, title, steps, note }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; steps: Step[]; note?: string }) {
  const t = tone === 'ground' ? undefined : tone
  const list = useRef<HTMLOListElement>(null)
  const reduce = useReduced()
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 72%', 'end 55%'] })
  // the line only ever pays out further: scrolling back up leaves it drawn (a reveal plays once)
  const furthest = useRef(0)
  const paid = useTransform(scrollYProgress, (v) => (furthest.current = Math.max(furthest.current, v)))
  const drawn = useSpring(paid, { stiffness: 140, damping: 30, restDelta: 0.001 })
  const [reached, setReached] = useState(-1)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const li = list.current?.querySelectorAll<HTMLElement>(':scope > li')
    if (!li || !list.current) return
    const h = list.current.offsetHeight
    let n = -1
    for (let i = 0; i < li.length; i++) if (li[i].offsetTop <= v * h + 4) n = i
    setReached((r) => Math.max(r, n))
  })
  const lit = (i: number) => reduce || i <= reached
  const current = reduce ? null : steps[Math.max(0, reached)]

  if (!steps.length) return null
  return (
    <section data-tone={t} className="section-pad">
      <div className="frame grid gap-12 md:grid-cols-12 md:gap-x-(--gutter)">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <h2 data-fade className="type-heading max-w-[18ch]">{title}</h2>
            {note && <p data-fade className="type-body mt-4 max-w-[34ch] text-(--color-muted)">{note}</p>}
            {current && (
              <p className="type-caption mt-10 hidden items-baseline gap-3 text-(--color-muted) md:flex" aria-hidden>
                <span className="h-px w-6 -translate-y-[0.3em] bg-(--color-accent)" />
                <span>The line has reached</span>
                <span className="inline-block min-w-[8ch] text-(--color-text)">{reached < 0 ? 'the water' : current.name}</span>
              </p>
            )}
          </div>
        </div>
        <ol ref={list} className="relative md:col-span-6 md:col-start-7">
          <span aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-(--color-border)" />
          <motion.span aria-hidden className="absolute bottom-2 left-0 top-2 w-px origin-top bg-(--color-text)" style={{ scaleY: reduce ? 1 : drawn }} />
          {steps.map((s, i) => (
            <li key={s.name} data-fade className="relative pb-14 pl-9 last:pb-0 md:pl-12">
              <span aria-hidden className={cn('absolute -left-[5px] top-[0.4em] size-[11px] rounded-full border transition-colors duration-300', lit(i) ? 'border-(--color-accent) bg-(--color-accent)' : 'border-(--color-muted) bg-(--color-background)')} />
              <p className="type-utility flex items-baseline gap-3 text-(--color-muted)">
                <span className="type-number [font-size:1.15rem]">{i + 1}</span>
                {s.duration && <span>{s.duration}</span>}
              </p>
              <h3 className={cn('type-title mt-2 transition-colors duration-300', lit(i) ? 'text-(--color-text)' : 'text-(--color-muted)')}>{s.name}</h3>
              <p className="type-body mt-3 max-w-[46ch] text-(--color-muted)">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
