// OpusKit section — Product Highlight, media "over": the product on its own colour field with the name set huge over
// it and 3–4 real details. Pip & Kiln: a surface card that rounds into the page (like the quote card); the details hang
// round the picture as stickers on desktop and become a plain list under it on phones; the picture opens like a curtain.
import type { ReactNode } from 'react'
import { MediaAsset } from '@/components/media/MediaAsset'
import { ClipReveal } from '@/components/motion/ClipReveal'
import { Lines } from '@/components/motion/Lines'
import type { AssetKey } from '@/config/assets'

// Phones: the name re-broken into two lines of about equal length
const halves = (t: string) => {
  const w = t.split(' ')
  if (w.length < 2) return [t]
  let best = 1
  for (let i = 1; i < w.length; i++) if (Math.abs(w.slice(0, i).join(' ').length - w.slice(i).join(' ').length) < Math.abs(w.slice(0, best).join(' ').length - w.slice(best).join(' ').length)) best = i
  return [w.slice(0, best).join(' '), w.slice(best).join(' ')]
}

const SPOTS = ['md:absolute md:left-0 md:top-[34%] md:-rotate-3', 'md:absolute md:right-0 md:top-[52%] md:rotate-2', 'md:absolute md:left-[6%] md:bottom-[10%] md:rotate-1', 'md:absolute md:right-[6%] md:top-[18%] md:-rotate-2']

export function ProductHighlightSection({ name, lines, eyebrow, text, media, alt, details, action }: {
  name: string; lines?: string[]; eyebrow?: string; text: string; media: { id: AssetKey; product?: string }; alt: string; details: { label: string; value: string }[]; action?: ReactNode
}) {
  return (
    <section className="px-(--gutter)">
      <div data-tone="surface" className="relative mx-auto max-w-(--container) overflow-hidden rounded-(--radius-card) px-(--gutter) py-[calc(var(--section-y)*0.6)] text-center">
        {eyebrow && <p className="t-action">{eyebrow}</p>}
        <Lines text={name} lines={lines ?? [name]} mobile={halves(name)} className="type-display relative z-10 mt-4 leading-[0.84] [font-size:clamp(3.2rem,11vw,11rem)]" />
        <div className="relative mx-auto -mt-[3vw] max-w-6xl">
          <ClipReveal className="relative z-20 mx-auto w-[min(100%,34rem)] overflow-hidden rounded-(--radius-media)">
            <MediaAsset id={media.id} product={media.product} alt={alt} sizes="(min-width: 768px) 34rem, 90vw" />
          </ClipReveal>
          <dl className="relative z-30 mx-auto mt-8 grid max-w-md gap-3 text-left md:static md:mt-0 md:max-w-none">
            {details.map((d, i) => (
              <div key={d.label} className={`flex items-baseline justify-between gap-4 border-b border-(--color-text)/25 pb-3 md:max-w-[16rem] md:flex-col md:gap-1 md:rounded-[20px] md:border md:border-(--color-text) md:bg-(--color-background) md:px-5 md:py-4 ${SPOTS[i % 4]}`}>
                <dt className="type-caption">{d.label}</dt>
                <dd className="t-card text-right md:text-left">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="type-body mx-auto mt-10 max-w-[48ch]">{text}</p>
        {action && <div className="mt-8 flex justify-center">{action}</div>}
      </div>
    </section>
  )
}
