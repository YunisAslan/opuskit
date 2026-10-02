import type { ElementType, ReactNode } from 'react'
import { MediaAsset } from '@/components/MediaAsset'
import type { AssetKey } from '@/config/assets'
// OpusKit section — Product Highlight: one product (or feature) in depth — large media and 3–4 real details.
// `name` may be a ready heading node (the chapter title with its motif slot); `children` sits above the action.
export function ProductHighlightSection({ link: L = 'a', name, text, image, imageClassName, details, action, children, id }: { link?: ElementType; name: ReactNode; text: string; image: AssetKey; imageClassName?: string; alt?: string; details: { label: string; value: string }[]; action?: { label: string; href: string }; children?: ReactNode; id?: string }) {
  return (
    <section id={id} className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 md:grid-cols-12">
        <MediaAsset id={image} reveal="clip" sizes="(min-width: 768px) 58vw, 100vw" frameClassName="aspect-[4/5] w-full md:col-span-7 md:aspect-square" className={imageClassName} />
        <div data-reveal="" className="md:col-span-5 md:col-start-8">
          {typeof name === 'string' ? <h2 className="type-display [font-size:clamp(2.2rem,4.5vw,4rem)]">{name}</h2> : name}
          <p className="type-body mt-4 text-(--color-muted)">{text}</p>
          <dl className="mt-8 divide-y divide-(--color-border) border-y border-(--color-border)">
            {details.map((d) => <div key={d.label} className="flex justify-between gap-4 py-3"><dt className="type-utility text-(--color-muted)">{d.label}</dt><dd className="type-body text-right">{d.value}</dd></div>)}
          </dl>
          {children && <div className="mt-8">{children}</div>}
          {action && <L href={action.href} className="type-body mt-8 inline-block rounded-(--radius-button) bg-(--color-primary) px-6 py-3 text-(--color-background)">{action.label}</L>}
        </div>
      </div>
    </section>
  )
}
