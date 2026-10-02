'use client'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState, type ComponentProps, type ElementType } from 'react'
import { TextEffect } from '@/components/pieces/TextEffect'
import { ChapterLabel } from '@/components/site/ChapterLabel'
// OpusKit section — Product Highlight: one product (or feature) in depth — large media and 3–4 real details.
// Pinned story (desktop): the block is 300vh tall, the frame sticks for 200vh and the details switch on one by one
// as you scroll. Mobile and reduced motion: unpinned — media, then the detail list, all shown.
export function ProductHighlightSection({ link: L = 'a', label, name, text, media, details, action }: { link?: ElementType<ComponentProps<'a'>>; label?: string; name: string; text: string; media: React.ReactNode; details: { label: string; value: string }[]; action: { label: string; href: string } }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [step, setStep] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setStep(Math.min(details.length - 1, Math.floor(v * details.length * 1.15))))
  return (
    <section ref={ref} className="px-6 py-24 motion-safe:md:h-[300vh] motion-safe:md:py-0">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 md:grid-cols-12 motion-safe:md:sticky motion-safe:md:top-0 motion-safe:md:h-svh">
        <div className="relative aspect-square w-full overflow-hidden rounded-(--radius-media) bg-(--color-surface) md:col-span-6 md:max-h-[80svh] md:w-auto md:justify-self-start">{media}</div>
        <div className="md:col-span-5 md:col-start-8">
          {label && <ChapterLabel className="mb-4">{label}</ChapterLabel>}
          <TextEffect as="h2" className="type-display [font-size:clamp(2.2rem,4.5vw,4rem)]">{name}</TextEffect>
          <p className="type-body mt-4 max-w-[46ch] text-(--color-muted)">{text}</p>
          <dl className="mt-8 divide-y divide-(--color-border) border-y border-(--color-border)">
            {details.map((d, i) => (
              <div key={d.label} data-on={i <= step} className="group flex justify-between gap-4 py-4 transition-opacity duration-300 motion-safe:md:opacity-35 motion-safe:md:data-[on=true]:opacity-100">
                <dt className="type-utility flex items-center gap-2 text-(--color-muted)"><span aria-hidden className="size-1.5 rounded-full bg-(--color-border) transition-colors duration-300 group-data-[on=true]:bg-(--color-accent) motion-reduce:bg-(--color-accent)" />{d.label}</dt>
                <dd className="type-body text-right tabular-nums">{d.value}</dd>
              </div>
            ))}
          </dl>
          <L href={action.href} className="type-body mt-8 inline-flex min-h-12 items-center rounded-(--radius-button) bg-(--color-primary) px-6 font-medium text-(--color-background) transition-opacity duration-150 hover:opacity-90">{action.label}</L>
        </div>
      </div>
    </section>
  )
}
