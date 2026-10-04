import type { ElementType } from 'react'
// OpusKit section — Feature rows: one capability or offer per row. `media`: side (picture beside words, sides
// alternating on desktop), full (each row a wide picture with its words in two columns under it) or over (each row's
// words on a card laid over its picture).
type Row = { name: string; text: string; image?: string; alt?: string; link?: { label: string; href: string } }
type P = { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; media?: 'side' | 'full' | 'over'; link?: ElementType; title?: string; rows: Row[] }
export function FeatureRowsSection({ tone, media = 'side', link: L = 'a', title, rows }: P) {
  const words = (r: Row) => <>
    <h3 className="type-heading text-balance [font-size:clamp(1.5rem,2.6vw,2.4rem)]">{r.name}</h3>
    {r.text && <p className="type-body mt-4 max-w-[46ch] text-(--color-muted)">{r.text}</p>}
    {r.link && <L href={r.link.href} className="type-body mt-6 inline-block underline underline-offset-4">{r.link.label}</L>}
  </>
  const pic = (r: Row, cls: string) => r.image && <img src={r.image} alt={r.alt ?? ''} loading="lazy" className={`w-full rounded-(--radius-media) bg-(--color-surface) object-cover ${cls}`} />
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        {title && <h2 className="type-heading mb-16 max-w-[24ch] md:mb-24">{title}</h2>}
        <ul className="space-y-20 md:space-y-32">
          {rows.map((r, i) => media === 'over' && r.image ? (
            <li key={r.name} className="relative">
              {pic(r, 'aspect-(--ratio-media)')}
              <div className={`relative -mt-24 w-[88%] rounded-(--radius-card) bg-(--color-background) p-8 md:absolute md:bottom-10 md:mt-0 md:w-[min(30rem,40%)] ${i % 2 ? 'md:left-10' : 'ml-auto md:right-10'}`}>{words(r)}</div>
            </li>
          ) : media === 'full' && r.image ? (
            <li key={r.name}>
              {pic(r, 'aspect-(--ratio-media)')}
              <div className="mt-8 grid gap-6 md:grid-cols-12"><div className="md:col-span-5">{words({ ...r, text: '', link: undefined })}</div><div className="md:col-span-6 md:col-start-7"><p className="type-body max-w-[46ch] text-(--color-muted)">{r.text}</p>{r.link && <L href={r.link.href} className="type-body mt-6 inline-block underline underline-offset-4">{r.link.label}</L>}</div></div>
            </li>
          ) : (
            <li key={r.name} className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
              {pic(r, `aspect-[4/3] md:col-span-7 ${i % 2 ? 'md:order-2 md:col-start-6' : ''}`)}
              <div className={!r.image ? 'md:col-span-8' : i % 2 ? 'md:order-1 md:col-span-4 md:col-start-1' : 'md:col-span-4 md:col-start-9'}>{words(r)}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
