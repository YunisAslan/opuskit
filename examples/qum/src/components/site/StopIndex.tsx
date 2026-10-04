'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

type S = { id: string; name: string }

// The quiet index of the walk: a small card in the corner names the stop you are at; open it to jump to any other.
export function StopIndex() {
  const path = usePathname()
  const [stops, setStops] = useState<S[]>([])
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('main [data-stop]')]
    let first = true // the observer always calls back once on start: read the page's stops then
    const io = new IntersectionObserver((es) => {
      if (first) { first = false; setStops(els.map((e) => ({ id: e.id, name: e.dataset.stop! }))); setCurrent(0) }
      es.forEach((e) => { if (e.isIntersecting) setCurrent(els.indexOf(e.target as HTMLElement)) })
    }, { rootMargin: '-40% 0px -55% 0px' })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [path])
  if (stops.length < 2) return null
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  return (
    <div className="stop-index fixed bottom-4 left-4 z-40 md:bottom-6 md:left-6">
      <DropdownMenu>
        <DropdownMenuTrigger aria-label={`Where you are: ${stops[current]?.name}. Jump to another part of this page`}
          className="type-utility flex h-11 items-center gap-3 rounded-(--radius-card) border border-(--color-border) bg-(--color-surface)/95 px-4 backdrop-blur transition-colors hover:border-(--color-text) focus-visible:border-(--color-text)">
          <span aria-hidden className="size-1.5 rounded-full bg-(--color-accent)" />
          <span>{stops[current]?.name}</span>
          <span className="tabular-nums text-(--color-muted)">{current + 1} of {stops.length}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start" className="w-60 p-1.5">
          {stops.map((s, i) => (
            <DropdownMenuItem key={s.id} onSelect={() => go(s.id)} className="type-utility h-10 gap-3 px-3">
              <span aria-hidden className={`size-1.5 rounded-full ${i === current ? 'bg-(--color-accent)' : 'bg-(--color-border)'}`} />
              <span className={i === current ? 'text-(--color-text)' : 'text-(--color-muted)'}>{s.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
