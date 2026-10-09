'use client'
// OpusKit section — Testimonials, "single": one quote set huge across the page, under a big quotation mark in the
// accent; the person under it. Pip & Kiln: on a surface card that rounds into the page; the other voices wait as
// name pills — pick one and its quote swaps in place (a short crossfade, nothing slides).
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useReduced } from '@/lib/use-media'

type Quote = { quote: string; name: string; role: string }

export function TestimonialsSection({ title, quotes }: { title: string; quotes: Quote[] }) {
  const [i, setI] = useState(0)
  const reduce = useReduced()
  const q = quotes[i]
  if (!q) return null
  return (
    <section className="px-(--gutter)">
      <div data-tone="surface" className="mx-auto grid max-w-(--container) gap-8 rounded-(--radius-card) px-(--gutter) py-[calc(var(--section-y)*0.6)] md:grid-cols-12 md:gap-6 md:px-[4vw]">
        <h2 className="t-action md:col-span-3">{title}</h2>
        <figure className="md:col-span-9">
          <span aria-hidden className="type-display block h-[0.5em] select-none leading-[0.9] text-(--color-accent) [font-size:clamp(5rem,10vw,9rem)]">“</span>
          <div className="grid">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={i} className="[grid-area:1/1]"
                initial={{ opacity: 0, filter: reduce ? 'none' : 'blur(2px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, filter: reduce ? 'none' : 'blur(2px)' }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                <blockquote className="type-display max-w-[20ch] text-balance leading-[0.98] [font-size:clamp(2rem,4.6vw,4.4rem)]">{q.quote}</blockquote>
                <figcaption className="mt-8 flex items-baseline gap-3">
                  <span aria-hidden className="h-0.5 w-8 shrink-0 -translate-y-[0.3em] rounded-full bg-(--color-accent)" />
                  <span><span className="t-card block">{q.name}</span><span className="type-caption block">{q.role}</span></span>
                </figcaption>
              </motion.div>
            </AnimatePresence>
          </div>
          {quotes.length > 1 && (
            <div role="group" aria-label="More voices" className="mt-10 flex flex-wrap gap-2">
              {quotes.map((x, n) => (
                <button key={x.name} type="button" aria-pressed={n === i} onClick={() => setI(n)}
                  className="t-action press min-h-11 rounded-(--radius-button) border border-(--color-text) px-4 transition-[background-color,color,transform] duration-150 hover:bg-(--color-background) focus-visible:underline focus-visible:decoration-2 focus-visible:underline-offset-4 aria-pressed:bg-(--color-text) aria-pressed:text-(--color-background)">{x.name}</button>
              ))}
            </div>
          )}
        </figure>
      </div>
    </section>
  )
}
