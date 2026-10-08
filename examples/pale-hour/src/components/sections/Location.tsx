// Location — media `side`: the way in at its own 3:4 shape beside the facts (address, hours, how to get here), with
// tap-to-map and tap-to-call. Phones: the photograph, then the facts. `children` carries what follows inside the same
// section (the hour line, the three rooms), so the page reads as one visit.
import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { i } from '@/components/motion/stagger'
import { MediaAsset } from '@/components/site/MediaAsset'
import type { Media } from '@/config/assets'

type P = {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'
  title: ReactNode; image: Media
  address: { label: string; lines: string[] }; hours: { label: string; lines: string[] }
  actions: ReactNode; transit?: ReactNode; children?: ReactNode
}

export function LocationSection({ tone, title, image, address, hours, actions, transit, children }: P) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="relative z-10 bg-(--color-background) px-(--gutter) pb-(--section-y) pt-[calc(var(--header-h)+var(--section-y)*0.35)]">
      <div className="mx-auto max-w-(--container)">
        {title}
        <Reveal className="mt-[calc(var(--section-y)*0.45)] grid gap-x-(--gutter) gap-y-12 md:grid-cols-12">
          <div className="md:col-span-5">
            {/* the first screen of Visit: opens with the first paint and loads first */}
            <div className="rv-now overflow-hidden md:max-w-[calc(86svh*0.75)]"><MediaAsset m={image} eager sizes="(min-width: 768px) 40vw, calc(100vw - 40px)" /></div>
          </div>
          <div className="md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-7">
            <div className="grid gap-x-(--gutter) gap-y-8 sm:grid-cols-2">
              <div className="rv-text" style={i(0)}>
                <h2 className="type-utility border-b border-(--color-text) pb-3">{address.label}</h2>
                <address className="type-heading mt-4 not-italic [font-size:clamp(1.2rem,1.45vw,1.4rem)]">{address.lines.map((l) => <span key={l} className="block">{l}</span>)}</address>
              </div>
              <div className="rv-text" style={i(1)}>
                <h2 className="type-utility border-b border-(--color-text) pb-3">{hours.label}</h2>
                <ul className="type-body mt-4 space-y-1">{hours.lines.map((l) => <li key={l}>{l}</li>)}</ul>
              </div>
            </div>
            <div className="rv-text mt-8 flex flex-wrap items-center gap-x-8 gap-y-3" style={i(2)}>{actions}</div>
            {transit && <div className="rv-text mt-14" style={i(3)}>{transit}</div>}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
