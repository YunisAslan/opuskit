import type { ReactNode } from 'react'
import { MediaAsset } from '@/components/MediaAsset'
import type { AssetKey } from '@/config/assets'
// OpusKit section — How It Works: 3–4 steps with a real visual each, side by side on desktop; they arrive in order.
export function HowItWorksSection({ title, steps, id }: { title: ReactNode; id?: string; steps: { name: string; text: string; image?: AssetKey; imageClassName?: string; alt?: string }[] }) {
  return (
    <section id={id} className="scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        {typeof title === 'string' ? <h2 className="type-heading max-w-[24ch]">{title}</h2> : title}
        <ol data-reveal="" className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.name} className="rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-2 shadow-(--shadow-card)">
              {s.image && <MediaAsset id={s.image} alt={s.alt} sizes="(min-width: 768px) 30vw, 100vw" frameClassName="aspect-[4/3] w-full rounded-[calc(var(--radius-card)-8px)]" className={s.imageClassName} />}
              <div className="px-3 pb-4 pt-5">
                <p className="type-utility text-(--color-accent)">Step {i + 1}</p>
                <h3 className="type-heading mt-2 [font-size:clamp(1.15rem,1.6vw,1.4rem)]">{s.name}</h3>
                <p className="type-body mt-2 text-(--color-muted)">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
