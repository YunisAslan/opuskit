// OpusKit section — Name wall, "Like credits" (inline), made this site's own: the client names run as one big
// paragraph in the brush hand, every other name in pencil grey, on the surface tone. Real names only.
import { Cut } from '@/components/motion'

export function NameWallSection({ tone, title, text, names }: { tone?: 'surface'; title: string; text?: string; names: string[] }) {
  return (
    <section data-tone={tone} aria-labelledby="names-title" className="px-(--gutter) py-(--section-y)">
      <div className="grid-site gap-y-8">
        <div className="col-span-full lg:col-span-3">
          <h2 id="names-title" className="type-h2">{title}</h2>
          {text && <p className="type-body mt-4 max-w-[30ch] text-(--color-muted)">{text}</p>}
        </div>
        <Cut as="ul" className="col-span-full flex flex-wrap gap-x-[0.45em] gap-y-1 type-h3 lg:col-span-9 lg:pt-2">
          {names.map((n, i) => <li key={n} className={i % 2 ? 'text-(--color-muted)' : undefined}>{n}{i < names.length - 1 ? ',' : '.'}</li>)}
        </Cut>
      </div>
    </section>
  )
}
