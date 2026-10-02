import type { ReactNode } from 'react'
import { MediaAsset } from '@/components/MediaAsset'
import type { AssetKey } from '@/config/assets'
// OpusKit section — Features: 3–6 capabilities in concrete language, each with a real visual. Tiles fade in, staggered —
// unless `first`: then it opens the page and shows at once (the first screen is readable before anything animates).
export function FeatureGridSection({ title, intro, features, first = false }: { title: ReactNode; intro?: string; first?: boolean; features: { name: string; text: string; image?: AssetKey; imageClassName?: string; alt?: string }[] }) {
  return (
    <section className="px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-[1440px]">
        {typeof title === 'string' ? <h2 className="type-heading max-w-[24ch]">{title}</h2> : title}
        {intro && <p className="type-body mt-6 max-w-[52ch] text-(--color-muted)">{intro}</p>}
        <ul data-reveal={first ? undefined : ''} className="mt-12 grid gap-px overflow-hidden rounded-(--radius-card) border border-(--color-border) bg-(--color-border) md:grid-cols-2 xl:grid-cols-3">
          {features.map((f, i) => (
            <li key={f.name} className="bg-(--color-background) p-6 md:p-8">
              {f.image && <MediaAsset id={f.image} alt={f.alt} priority={first && i === 0} sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw" frameClassName="mb-6 aspect-[16/10] w-full" className={f.imageClassName} />}
              <h3 className="type-heading [font-size:clamp(1.15rem,1.6vw,1.4rem)]">{f.name}</h3>
              <p className="type-body mt-2 text-(--color-muted)">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
