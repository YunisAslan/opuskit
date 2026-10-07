'use client'
// Steps — a real sequence, so it is numbered. Two designs, made Halden's own:
//   cards   — a picture per step, four across on desktop, one under another on phones; the steps open in order as
//             they come into view (picture, then words, 80 ms apart).
//   columns — the big numbers. On desktop it is the page's pinned story: the frame holds still while the steps light
//             one after another and a rule fills above each. Phones and reduced motion: a plain list, unpinned.
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { ImageReveal, Lines, Reveal } from '@/components/motion/Reveal'
import { MediaAsset } from '@/components/MediaAsset'
import type { ImageKey } from '@/config/assets'
import { STAGGER, TEXT_AFTER_MEDIA, useDesktop, useStill } from '@/lib/motion'

export type Step = { name: string; text: string; duration?: string; image?: ImageKey; alt?: string }

export function StepsSection({ tone, variant = 'columns', title, steps }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'columns' | 'cards'; title: string; steps: readonly Step[]
}) {
  const t = tone === 'ground' ? undefined : tone
  if (variant === 'cards') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <Lines lines={[title]} className="type-heading max-w-[16ch]" />
        <ol className="mt-12 grid gap-16 md:grid-cols-2 md:gap-x-6 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.name}>
              {s.image && (
                <ImageReveal delay={i * STAGGER} className="aspect-[3/2] w-full">
                  <MediaAsset id={s.image} alt={s.alt} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="h-full w-full" />
                </ImageReveal>
              )}
              <Reveal delay={TEXT_AFTER_MEDIA + i * STAGGER} className="mt-6">
                <p className="type-utility text-(--color-muted)">Step {i + 1}</p>
                <h3 className="type-title mt-2">{s.name}</h3>
                <p className="type-body mt-3 text-(--color-muted)">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
  return <ColumnsSteps tone={t} title={title} steps={steps} />
}

function ColumnsSteps({ tone, title, steps }: { tone?: string; title: string; steps: readonly Step[] }) {
  const still = useStill()
  const desktop = useDesktop()
  if (still || !desktop) return (
    <section data-tone={tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <Lines lines={[title]} className="type-heading" />
        <ol className="mt-12 grid gap-12 md:grid-cols-4 md:gap-6">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.name} delay={0.2 + i * STAGGER} className="border-t border-(--color-text) pt-6">
              <StepBody s={s} i={i} />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
  return <PinnedSteps tone={tone} title={title} steps={steps} />
}

function PinnedSteps({ tone, title, steps }: { tone?: string; title: string; steps: readonly Step[] }) {
  const block = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: block, offset: ['start 64px', 'end end'] })
  return (
    <section ref={block} data-tone={tone} className="relative h-[280svh] px-(--gutter)">
      <div className="sticky top-(--nav-h) flex h-[calc(100svh-var(--nav-h))] items-center">
        <div className="mx-auto w-full max-w-(--container)">
          <Lines lines={[title]} className="type-heading" />
          <ol className="mt-16 grid grid-cols-4 gap-6">
            {steps.map((s, i) => <PinnedStep key={s.name} s={s} i={i} n={steps.length} progress={scrollYProgress} />)}
          </ol>
        </div>
      </div>
    </section>
  )
}

function PinnedStep({ s, i, n, progress }: { s: Step; i: number; n: number; progress: MotionValue<number> }) {
  // Each step owns an equal stretch of the pin; it lights as its stretch begins and stays lit (the round adds up).
  const from = (i / n) * 0.9, to = from + 0.9 / n
  const fill = useTransform(progress, [from, to], [0, 1])
  const opacity = useTransform(progress, [from, from + 0.06], [i === 0 ? 1 : 0.28, 1])
  const y = useTransform(progress, [from, from + 0.06], [i === 0 ? 0 : 16, 0])
  return (
    <li className="relative pt-6">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-(--color-border)" />
      <motion.span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-(--color-text)" style={{ scaleX: fill }} />
      <motion.div style={{ opacity, y }}>
        <StepBody s={s} i={i} />
      </motion.div>
    </li>
  )
}

function StepBody({ s, i }: { s: Step; i: number }) {
  return (
    <>
      <p aria-hidden className="type-display [font-size:clamp(4.5rem,8vw,8rem)]">{i + 1}</p>
      <h3 className="type-title mt-6"><span className="sr-only">Step {i + 1}: </span>{s.name}</h3>
      <p className="type-body mt-3 text-(--color-muted)">{s.text}</p>
      {s.duration && <p className="type-utility mt-4">{s.duration}</p>}
    </>
  )
}
