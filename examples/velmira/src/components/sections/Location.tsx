// OpusKit section — Location: address, hours, how to get there, one exterior photo, and a real map link.
// Phone: stacked, with tap-to-call and tap-to-map. Extra travel detail (tabs) can follow as children.
import type { ReactNode } from 'react'
import { Chapter } from '@/components/site/Motif'

export function LocationSection({ title, address, hours, notes, mapUrl, phone, image, alt, as: H = 'h2', id, reveal = true, children }: {
  title: string; address: string; hours: string[]; notes?: string; mapUrl: string; phone?: string; image: string; alt: string
  as?: 'h1' | 'h2'; id?: string; /** false on a page's first screen. */ reveal?: boolean; children?: ReactNode
}) {
  return (
    <section id={id} className={`py-32 md:py-40 ${H === 'h1' ? 'pt-40 md:pt-48' : ''}`}>
      <div data-reveal={reveal ? '' : undefined} className="shell grid gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4 md:self-end">
          <Chapter><H data-rise className={H === 'h1' ? 'type-display [font-size:clamp(2.75rem,4.6vw,4.25rem)]' : 'type-heading'}>{title}</H></Chapter>
          <address data-rise style={{ '--i': 1 } as React.CSSProperties} className="type-body mt-6 whitespace-pre-line not-italic">{address}</address>
          <ul data-rise style={{ '--i': 2 } as React.CSSProperties} className="type-body mt-6 space-y-1 text-(--color-muted)">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
          {notes && <p data-rise style={{ '--i': 3 } as React.CSSProperties} className="type-body mt-6 text-(--color-muted)">{notes}</p>}
          <div data-rise style={{ '--i': 4 } as React.CSSProperties} className="mt-8 flex flex-wrap gap-3">
            <a href={mapUrl} target="_blank" rel="noreferrer" className="type-utility inline-flex h-11 items-center rounded-(--radius-button) bg-(--color-primary) px-5 text-[0.9375rem] text-(--color-background) transition-colors duration-150 hover:bg-(--color-muted) focus-visible:bg-(--color-muted)">Open in maps</a>
            {phone && <a href={`tel:${phone.replace(/\s/g, '')}`} className="type-utility inline-flex h-11 items-center rounded-(--radius-button) border border-current/40 px-5 text-[0.9375rem] transition-colors duration-150 hover:border-current hover:bg-white/10 focus-visible:bg-white/10">Call {phone}</a>}
          </div>
        </div>
        <div data-clip className="overflow-hidden rounded-(--radius-media) md:col-span-7 md:col-start-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={alt} loading={reveal ? 'lazy' : 'eager'} decoding="async" className="aspect-[4/5] w-full object-cover md:aspect-[4/3]" />
        </div>
      </div>
      {children && <div className="shell mt-24 md:mt-32">{children}</div>}
    </section>
  )
}
