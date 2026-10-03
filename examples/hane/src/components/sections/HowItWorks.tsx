import type { ReactNode } from 'react'
// OpusKit section — How It Works, laid out as a photo story: each step is a photo/text pair on the 12-column grid,
// the widths change every time (7 + 4, then 3 + 7, then one full-bleed photo) so the rhythm never repeats.
// Each pair reveals together: the photo opens like a curtain ([data-clip]), its words rise beside it ([data-reveal]).
// Phones: photo then words, every photo full width, original order.
export function HowItWorksSection({ title, intro, steps }: { title: ReactNode; intro?: string; steps: { name: string; text: string; media: ReactNode; caption?: string }[] }) {
  const words = (s: (typeof steps)[number], i: number) => (
    <>
      <p className="type-utility text-(--color-muted)">Step {i + 1} of {steps.length}</p>
      <h3 className="type-heading mt-3">{s.name}</h3>
      <p className="type-body mt-4 max-w-[40ch] text-(--color-muted)">{s.text}</p>
    </>
  )
  const photo = (s: (typeof steps)[number], cls: string, capCls = "") => (
    <figure>
      <div data-clip className={`overflow-hidden ${cls}`}>{s.media}</div>
      {s.caption && <figcaption className={`type-utility mt-3 text-(--color-muted) ${capCls}`}>{s.caption}</figcaption>}
    </figure>
  )
  return (
    <section className="px-[5vw] section-y">
      <div className="grid gap-x-[2vw] md:grid-cols-12">
        <div className="md:col-span-5">{title}</div>
        {intro && <p className="type-body mt-6 max-w-[48ch] text-(--color-muted) md:col-span-4 md:col-start-8 md:mt-0 md:self-end">{intro}</p>}
      </div>
      <ol className="mt-[clamp(64px,8vw,128px)] space-y-[clamp(96px,12vw,160px)]">
        {steps.map((s, i) => {
          const kind = i % 3
          if (kind === 2) return (
            <li key={s.name} data-reveal className="-mx-[5vw]">
              {photo(s, 'aspect-[4/5] md:aspect-[21/9] [&_img]:h-full [&_img]:w-full [&_img]:object-cover [--radius-media:0px]', 'px-[5vw]')}
              <div className="mt-8 px-[5vw] md:ml-[58.33%] md:mt-12 md:pl-0">{words(s, i)}</div>
            </li>
          )
          return (
            <li key={s.name} data-reveal className="grid items-end gap-x-[2vw] gap-y-8 md:grid-cols-12">
              <div className={kind === 0 ? 'md:col-span-7' : 'md:order-2 md:col-span-7 md:col-start-6'}>
                {photo(s, 'rounded-(--radius-media) aspect-[3/2] [&_img]:h-full [&_img]:w-full [&_img]:object-cover')}
              </div>
              <div className={kind === 0 ? 'md:col-span-4 md:col-start-9 md:pb-10' : 'md:order-1 md:col-span-3 md:col-start-2 md:self-start md:pt-16'}>{words(s, i)}</div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
