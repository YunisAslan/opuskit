'use client'
// The quiet index of stops. Desktop: the current stop's name runs down the right edge above one tick per stop
// (click to go there). Phones: the current stop's name sits in the sticky booking bar, with the phone number.
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { site } from '@/config/site'

export function Wayfinder({ stops }: { stops: { id: string; name: string }[] }) {
  const [cur, setCur] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    const els = stops.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setCur(els.indexOf(e.target as HTMLElement))
    }, { rootMargin: '-45% 0px -45% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [stops])
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })

  return (
    <>
      <nav aria-label="Stops on this page" className="stop-index fixed right-[1.25vw] top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 transition-opacity duration-200 lg:flex">
        <p aria-live="polite" className="type-utility text-(--color-muted) [writing-mode:vertical-rl]">{stops[cur]?.name}</p>
        <ul className="flex flex-col items-center">
          {stops.map((s, i) => (
            <li key={s.id}>
              <button type="button" onClick={() => go(s.id)} aria-label={s.name} aria-current={i === cur ? 'location' : undefined} className="group flex h-6 w-8 items-center justify-center">
                <span className={`block h-px transition-[width,background-color] duration-150 ${i === cur ? 'w-6 bg-(--color-text)' : 'w-3 bg-(--color-muted)/50 group-hover:bg-(--color-text)'}`} />
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-(--color-border) bg-(--color-surface) px-[5vw] py-2.5 lg:hidden">
        <div className="min-w-0">
          <p aria-live="polite" className="type-utility truncate text-(--color-muted)">{stops[cur]?.name}</p>
          <a href={site.tel} className="type-utility block py-0.5 underline underline-offset-4">{site.phone}</a>
        </div>
        <Button asChild><Link href={`${site.book.href}#book`}>{site.book.label}</Link></Button>
      </div>
    </>
  )
}
