'use client'
// OpusKit section — Location: address, hours, how to get there, one exterior photo, a real map link, tap to call.
// With `stops` it becomes the site's signature moment, "A walk through named stops": each stop is a full-screen view
// (sticky photo, the next stop slides over it) with a small card that names it and says one useful thing; an index
// of the stop names marks where the visitor is and jumps on click. Scroll snapping (proximity) only while the walk
// is on screen. Phones: tall stacked panels, the index a row of names at the top. Reduced motion: no snapping,
// cards shown in place.
import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { useReducedMotion } from 'motion/react'

type Props = { title: string; address: string; hours: string[]; notes?: string; mapUrl: string; phone: string; tel: string; media: ReactNode; link?: ElementType }
export type WalkStop = { name: string; line: string; media: ReactNode; action: { label: string; href: string } }

export function LocationSection({ stops, intro, ...p }: Props & { stops?: WalkStop[]; intro?: string }) {
  return stops ? <Walk {...p} stops={stops} intro={intro} /> : <Plain {...p} />
}

function Details({ address, hours, notes, mapUrl, phone, tel }: Props) {
  return (
    <>
      <address className="type-body mt-5 whitespace-pre-line not-italic">{address}</address>
      {hours.length > 0 && <ul className="type-body mt-5 space-y-1 text-(--color-muted)">{hours.map((h) => <li key={h}>{h}</li>)}</ul>}
      {notes && <p className="type-body mt-5 max-w-[46ch] text-(--color-muted)">{notes}</p>}
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={mapUrl} target="_blank" rel="noreferrer" className="type-utility inline-flex h-11 items-center rounded-(--radius-button) border border-(--color-text) px-5 transition-colors duration-150 hover:bg-(--color-surface)">Open in maps</a>
        <a href={tel} className="type-utility inline-flex h-11 items-center rounded-(--radius-button) border border-(--color-text) px-5 transition-colors duration-150 hover:bg-(--color-surface)">Call {phone}</a>
      </div>
    </>
  )
}

function Plain(p: Props) {
  return (
    <section className="px-[5vw] section-y">
      <div className="grid gap-x-[2vw] gap-y-10 md:grid-cols-12">
        <div data-clip className="overflow-hidden rounded-(--radius-media) md:col-span-7 [&_img]:aspect-[3/2] [&_img]:w-full [&_img]:object-cover">{p.media}</div>
        <div className="md:col-span-4 md:col-start-9 md:self-end">
          <h2 className="type-heading">{p.title}</h2>
          <Details {...p} />
        </div>
      </div>
    </section>
  )
}

function Walk({ stops, intro, link: L = 'a', ...p }: Props & { stops: WalkStop[]; intro?: string }) {
  const root = useRef<HTMLElement>(null)
  const [cur, setCur] = useState(0)
  const [seen, setSeen] = useState<number[]>([])
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = root.current
    if (!el) return
    const panels = [...el.querySelectorAll<HTMLElement>('.walk-stop')]
    const inView = new IntersectionObserver(([e]) => document.documentElement.classList.toggle('in-walk', e.isIntersecting), { rootMargin: '-40% 0px -40% 0px' })
    const active = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) {
        const i = panels.indexOf(e.target as HTMLElement)
        setCur(i)
        setSeen((s) => (s.includes(i) ? s : [...s, i]))
      }
    }, { rootMargin: '-45% 0px -45% 0px' })
    inView.observe(el.querySelector('[data-walk]')!)
    panels.forEach((x) => active.observe(x))
    return () => { inView.disconnect(); active.disconnect(); document.documentElement.classList.remove('in-walk') }
  }, [])
  const go = (i: number) => root.current?.querySelectorAll('.walk-stop')[i]?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })

  return (
    <section ref={root} className="section-y !pb-0">
      <div className="grid gap-x-[2vw] gap-y-6 px-[5vw] pb-[clamp(48px,6vw,96px)] md:grid-cols-12">
        <h2 data-lines className="type-display md:col-span-6">
          <span className="line-mask"><span className="line">{p.title}</span></span>
        </h2>
        {intro && <p className="type-body max-w-[46ch] text-(--color-muted) md:col-span-4 md:col-start-8 md:self-end">{intro}</p>}
      </div>
      <div data-walk className="relative">
        <div className="pointer-events-none absolute inset-0 z-10">
          <nav aria-label="Stops on the way in" className="pointer-events-auto sticky top-(--header-h) flex gap-1 overflow-x-auto bg-(--color-background) lg:overflow-visible px-[5vw] py-2 lg:absolute lg:right-[5vw] lg:top-auto lg:block lg:h-full lg:bg-transparent lg:p-0">
            <ol className="flex gap-1 lg:sticky lg:top-[40vh] lg:flex-col lg:gap-0 lg:rounded-(--radius-card) lg:bg-(--color-surface) lg:p-3">
              {stops.map((s, i) => (
                <li key={s.name}>
                  <button type="button" onClick={() => go(i)} aria-current={i === cur ? 'location' : undefined}
                    className={`type-utility flex h-11 items-center gap-2 whitespace-nowrap rounded-(--radius-button) px-3 transition-colors duration-150 lg:h-9 ${i === cur ? 'text-(--color-text)' : 'text-(--color-muted) hover:text-(--color-text)'}`}>
                    <span aria-hidden className={`size-1.5 rounded-full ${i === cur ? 'bg-(--color-accent)' : 'bg-transparent'}`} />{s.name}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        {stops.map((s, i) => (
          <div key={s.name} data-seen={seen.includes(i) ? '' : undefined} className="walk-stop relative h-[115svh] md:h-[150svh]">
            <div className="sticky top-0 h-svh overflow-hidden [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
              {s.media}
              <div className="walk-card absolute bottom-[92px] lg:bottom-[clamp(24px,5vw,64px)] left-[5vw] right-[5vw] max-w-sm rounded-(--radius-card) bg-(--color-surface) p-6 md:right-auto">
                <p className="type-utility text-(--color-muted)">Stop {i + 1} of {stops.length}</p>
                <h3 className="type-heading mt-2">{s.name}</h3>
                <p className="type-body mt-3 text-(--color-muted)">{s.line}</p>
                <L href={s.action.href} className="type-utility mt-4 inline-block underline underline-offset-4">{s.action.label}</L>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-x-[2vw] px-[5vw] pt-[clamp(60px,8vw,120px)] md:grid-cols-12">
        <div className="md:col-span-4 md:col-start-2">
          <h3 className="type-heading">Finding us</h3>
          <Details {...p} />
        </div>
      </div>
    </section>
  )
}
