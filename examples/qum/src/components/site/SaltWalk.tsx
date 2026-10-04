'use client'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { assets, type AssetKey } from '@/config/assets'
import { Reveal } from './Reveal'
import { StopCard } from './Stop'
import { TextLink } from './NavLink'

type WalkStop = { id: string; name: string; image?: AssetKey; text?: string; link?: { label: string; href: string } }

// Signature moment — a walk through named stops. Each stop is a full-screen view that holds still while a small card
// names it; an index of the stops sits at the side (a row of names at the top on phones). The page snaps gently between
// stops while the walk is on screen. Reduced motion: no snapping, cards shown in place. The last stop is the way in.
export function SaltWalk({ stops, last }: { stops: WalkStop[]; last: { id: string; name: string; children: ReactNode } }) {
  const all = [...stops, { id: last.id, name: last.name }]
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const root = ref.current!, html = document.documentElement
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const panels = [...root.querySelectorAll<HTMLElement>('[data-walk]')]
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setCurrent(panels.indexOf(e.target as HTMLElement)) }), { rootMargin: '-50% 0px -50% 0px' })
    panels.forEach((p) => io.observe(p))
    const inView = new IntersectionObserver(([e]) => {
      html.classList.toggle('in-walk', e.isIntersecting)
      html.classList.toggle('walk-snap', e.isIntersecting && !reduce)
    })
    inView.observe(root)
    return () => { io.disconnect(); inView.disconnect(); html.classList.remove('in-walk', 'walk-snap') }
  }, [])
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  const index = (row: boolean) => (
    <ol aria-label="Stops on the walk" className={row ? 'flex gap-5 overflow-x-auto' : 'space-y-1'}>
      {all.map((s, i) => (
        <li key={s.id} className="shrink-0">
          <button type="button" onClick={() => go(s.id)} aria-current={i === current ? 'step' : undefined}
            className={`type-utility flex min-h-11 items-center gap-2 transition-colors ${i === current ? 'text-(--color-text)' : 'text-(--color-muted) hover:text-(--color-text)'}`}>
            <span aria-hidden className={`size-1.5 rounded-full transition-colors ${i === current ? 'bg-(--color-accent)' : 'bg-(--color-border)'}`} />{s.name}
          </button>
        </li>
      ))}
    </ol>
  )
  return (
    <section ref={ref} aria-label="A walk from the salt pans to the lab" className="relative">
      <nav aria-label="Walk index" className="sticky top-[86px] z-20 border-y border-(--color-border) bg-(--color-background)/95 px-(--gutter) backdrop-blur md:hidden">{index(true)}</nav>
      <div className="pointer-events-none absolute inset-y-0 right-(--gutter) z-20 hidden md:block">
        <nav aria-label="Walk index" className="pointer-events-auto sticky top-[45svh] rounded-(--radius-card) bg-(--color-surface) px-4 py-2">{index(false)}</nav>
      </div>
      {stops.map((s) => (
        <div key={s.id} id={s.id} data-walk data-stop={s.name} className="relative h-[150svh] md:h-[160svh]">
          <div className="sticky top-0 h-svh overflow-hidden">
            <img src={assets[s.image!].src} alt={assets[s.image!].alt} loading="lazy" className="size-full object-cover" />
          </div>
          <Reveal className="absolute inset-x-0 top-[105svh] px-(--gutter)">
            <div className="mx-auto max-w-(--container)">
              <StopCard name={s.name}>
                <p>{s.text}</p>
                {s.link && <p><TextLink href={s.link.href} className="type-utility">{s.link.label}</TextLink></p>}
              </StopCard>
            </div>
          </Reveal>
        </div>
      ))}
      <div id={last.id} data-walk data-stop={last.name} className="flex min-h-svh scroll-mt-0 items-center">
        <div className="w-full md:pr-48">{last.children}</div>
      </div>
    </section>
  )
}
