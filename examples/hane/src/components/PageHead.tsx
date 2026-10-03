import { MediaAsset } from '@/components/MediaAsset'
import type { AssetKey } from '@/config/assets'

// An inner page's first screen: the one h1, a short lead and (optionally) one photo captioned with the stop's name.
// It is the first screen, so it fades up on load (CSS) rather than waiting for the observer.
export function PageHead({ title, lead, media, caption }: { title: string[]; lead: string; media?: AssetKey; caption?: string }) {
  return (
    <section className="px-[5vw] pb-[clamp(48px,6vw,96px)] pt-[clamp(48px,8vw,128px)]">
      <div className="grid items-end gap-x-[2vw] gap-y-12 md:grid-cols-12">
        <div className={`rise ${media ? 'md:col-span-5' : 'md:col-span-8'}`}>
          <h1 className="type-display [font-size:clamp(3rem,6vw,6rem)]">{title.map((l) => <span key={l} className="block">{l}</span>)}</h1>
          <p className="type-body mt-8 max-w-[52ch] text-(--color-muted)">{lead}</p>
        </div>
        {media && (
          <figure className="rise-late md:col-span-6 md:col-start-7">
            <MediaAsset id={media} priority sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[3/2] w-full rounded-(--radius-media) object-cover" />
            {caption && <figcaption className="type-utility mt-3 text-(--color-muted)">{caption}</figcaption>}
          </figure>
        )}
      </div>
    </section>
  )
}
