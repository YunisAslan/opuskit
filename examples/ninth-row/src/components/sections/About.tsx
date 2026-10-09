'use client'
// About — media "over": the words on the portrait, on a soft scrim. Its remembered moment, "Projector beam": the page
// opens dark with the words already readable; a thin cone of light falls from the booth (top right of centre) onto the
// photo and widens with the scroll until the whole portrait is lit. Pinned over 200vh (160svh on phones, the beam from
// the top centre and the words at the foot). Reduced motion: no pin and no beam — the portrait, lit, with the words on it.
import { useReduced } from '@/lib/motion'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { MediaAsset } from '@/components/MediaAsset'
import { asset } from '@/config/assets'
import { Lines } from '@/components/motion/Reveal'
import { useSmall } from '@/components/forms/Pickers'

type P = { titleLines: string[]; statement: string; bio: string }

function Words({ titleLines, statement, bio, onLoad }: P & { onLoad?: boolean }) {
  return (
    <div className="relative max-w-[36rem]">
      <div aria-hidden className="absolute -inset-x-24 -inset-y-20 -z-10 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-background)_82%,transparent),transparent)]" />
      <Lines as="h1" onLoad={onLoad} lines={titleLines} className="type-display text-[clamp(4rem,9vw,8.5rem)]" />
      <div className={onLoad ? 'motion-safe:animate-[fade-up_700ms_cubic-bezier(0.22,1,0.36,1)_400ms_both]' : undefined}>
        <p className="type-heading mt-8 text-[clamp(1.35rem,2.2vw,1.9rem)] leading-[1.15]">{statement}</p>
        <p className="type-body mt-6 max-w-[52ch] text-(--color-text)/85">{bio}</p>
      </div>
    </div>
  )
}

export function AboutSection(props: P) {
  const reduce = useReduced()
  if (reduce) return (
    <section className="relative isolate overflow-hidden px-(--gutter) pt-[calc(var(--section-y)*1.4+64px)] pb-[calc(var(--section-y)*1.4)]">
      <MediaAsset id="about" fill sizes="100vw" className="absolute! inset-0 -z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-background)_0%,color-mix(in_oklab,var(--color-background)_80%,transparent)_45%,transparent_75%)] md:bg-[linear-gradient(to_right,var(--color-background)_0%,color-mix(in_oklab,var(--color-background)_82%,transparent)_38%,transparent_62%)]" />
      <div className="mx-auto max-w-(--container)"><Words {...props} /></div>
      <p className="type-caption absolute right-(--gutter) bottom-6 bg-(--color-background) px-2 py-1 text-(--color-muted)">{asset('about').caption}</p>
    </section>
  )
  return <Beam {...props} />
}

function Beam(props: P) {
  const block = useRef<HTMLDivElement>(null)
  const small = useSmall()
  const { scrollYProgress: p } = useScroll({ target: block, offset: ['start start', 'end end'] })
  const cx = small ? 50 : 64
  const top = useTransform(p, [0, 0.75], [0.6, 75])
  const foot = useTransform(p, [0, 0.75], [9, 75])
  const clip = useTransform([top, foot], ([a, b]: number[]) => `polygon(${cx - a}% 0%, ${cx + a}% 0%, ${cx + b}% 100%, ${cx - b}% 100%)`)
  const glow = useTransform(p, [0, 0.75], [1, 0])
  const captionOn = useTransform(p, [0.6, 0.75], [0, 1])
  return (
    <section>
      <div ref={block} className="relative h-[160svh] md:h-[200vh]">
        <div className="sticky top-0 h-svh overflow-hidden bg-(--color-background)">
          <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
            <MediaAsset id="about" fill priority sizes="100vw" className="h-full w-full" />
          </motion.div>
          {/* legibility: a scrim only on the words' side — a gradient from the left on wide screens, from the foot on
              phones — so the projector stays bright where the words are not */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--color-background)_0%,color-mix(in_oklab,var(--color-background)_80%,transparent)_45%,transparent_75%)] md:bg-[linear-gradient(to_right,var(--color-background)_0%,color-mix(in_oklab,var(--color-background)_82%,transparent)_38%,transparent_62%)]" />
          {/* the lamp's point at the top of the beam */}
          <motion.span aria-hidden style={{ opacity: glow, left: `${cx}%` }} className="absolute top-0 h-24 w-px -translate-x-1/2 bg-linear-to-b from-(--color-text) to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[calc(var(--container)+2*var(--gutter))] px-(--gutter) pb-16 md:pb-24">
            <Words {...props} onLoad />
          </div>
          {/* the picture's caption, on its own solid block in the lower right */}
          <motion.p style={{ opacity: captionOn }} className="type-caption absolute right-(--gutter) bottom-6 bg-(--color-background) px-2 py-1 text-(--color-muted) max-md:hidden">{asset('about').caption}</motion.p>
        </div>
      </div>
    </section>
  )
}
