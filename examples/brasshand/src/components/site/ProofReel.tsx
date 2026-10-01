'use client'
// Signature moment "Proof, one at a time" (Home — Featured Work): the frame holds still (sticky, 100svh) inside a block
// of items × 70vh; scroll progress picks the active project, which crossfades in with a short rise while a counter
// keeps count. Every project is a real element, in order, for screen readers; focusing one scrolls it into the frame.
// Mobile and reduced motion: no pinning — a plain stack, each project one screen tall, its counter beside it.
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { MediaAsset } from '@/components/site/MediaAsset'
import { TextRoll } from '@/components/pieces/TextRoll'
import { EASE } from '@/components/site/Reveal'
import type { Project } from '@/content/site'

const pad = (n: number) => String(n).padStart(2, '0')

function Item({ p, i, n }: { p: Project; i: number; n: number }) {
  return (
    <>
      <div className="md:col-span-6">
        <p className="type-utility tabular-nums" aria-hidden>{pad(i + 1)} / {pad(n)}</p>
        <h3 className="type-heading mt-6 [font-size:clamp(2.75rem,6vw,5.5rem)]!">{p.client}</h3>
        <p className="type-utility mt-3 text-(--color-muted)">{p.discipline}, {p.year}</p>
        <p className="type-body mt-6 max-w-[38ch]">{p.summary}</p>
        <Link href={`/work/${p.slug}`} className="type-body mt-8 inline-flex min-h-11 items-center border-b border-(--color-text)">
          <TextRoll>See the case study</TextRoll>
        </Link>
      </div>
      <MediaAsset id={p.image} className="aspect-[4/5] w-full md:col-span-5 md:col-start-8 md:max-h-[72svh] md:w-auto md:justify-self-end" />
    </>
  )
}

export function ProofReel({ title, projects }: { title: string; projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const n = projects.length
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n)))))
  // Keyboard: bring a focused project into the frame by scrolling to its slice of the block.
  const show = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + ((el.offsetHeight - window.innerHeight) * (i + 0.5)) / n })
  }

  const stack = (
    <ol className="md:hidden motion-reduce:block!">
      {projects.map((p, i) => (
        <li key={p.slug} className="grid min-h-svh content-center gap-8 border-t border-(--color-border) px-5 py-16 md:grid-cols-12 md:px-8">
          <Item p={p} i={i} n={n} />
        </li>
      ))}
    </ol>
  )

  return (
    <section aria-labelledby="proof-title">
      <h2 id="proof-title" className="type-utility mx-auto max-w-[1440px] px-5 pt-12 md:px-8">{title}</h2>
      {stack}
      {/* Reduced motion (CSS, so server and client render the same tree): the stack above shows instead. */}
      <div ref={ref} className="relative hidden md:block motion-reduce:hidden!" style={{ height: `${n * 70}vh` }}>
        <ol className="sticky top-0 h-svh overflow-hidden">
              {projects.map((p, i) => (
                <motion.li key={p.slug} onFocus={() => show(i)} aria-current={i === active ? 'true' : undefined}
                  className="absolute inset-0 mx-auto grid max-w-[1440px] grid-cols-12 content-center items-center gap-8 px-8"
                  initial={false} animate={i === active ? { opacity: 1, y: 0 } : { opacity: 0, y: i < active ? -24 : 24 }}
                  style={{ pointerEvents: i === active ? 'auto' : 'none' }} transition={{ duration: 0.5, ease: EASE }}>
                  <Item p={p} i={i} n={n} />
                </motion.li>
              ))}
            </ol>
      </div>
    </section>
  )
}
