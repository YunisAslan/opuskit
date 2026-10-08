'use client'
// Menu — Floating pill: a centred capsule (max 720px) 16px from the top — logo, four links, one action — on a
// translucent surface with backdrop blur. It tucks away while you read down and returns when you scroll up.
// The active link has a sliding highlight: a pink capsule drawn by a second, clipped copy of the links, so the text on
// it can be blue while the clip slides (clip-path only, 250ms on --ease-in-out).
// Phones: logo + menu button; the menu expands inside the capsule (clip-path on the drawer curve).
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { nav } from '@/content/site'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { useApply } from './Apply'

const linkBox = 'type-utility flex h-9 items-center rounded-full px-3.5 [font-size:0.875rem]'

export function Nav() {
  const pathname = usePathname()
  const { open: openApply } = useApply()
  const [hidden, setHidden] = useState(false)
  const [menu, setMenu] = useState(false)
  const active = nav.findIndex((l) => pathname === l.href || pathname.startsWith(l.href + '/'))

  // Hide on scroll down, return on scroll up (never while the phone menu is open or near the top).
  useEffect(() => {
    let last = window.scrollY
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        if (Math.abs(y - last) < 6) return
        setHidden(y > last && y > 160)
        last = y
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect -- close the phone menu on navigation
  useEffect(() => setMenu(false), [pathname])

  useEffect(() => {
    if (!menu) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menu])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 px-(--gutter) pt-[calc(var(--nav-top)+env(safe-area-inset-top,0px))] transition-[transform,opacity] duration-300 ease-(--ease-out) reduced:transition-opacity',
        hidden && !menu && '-translate-y-[calc(100%+8px)] reduced:translate-y-0 reduced:opacity-0 reduced:pointer-events-none',
      )}
      onFocusCapture={() => setHidden(false)}
    >
      {/* Desktop and tablet capsule */}
      <nav aria-label="Main" className="mx-auto hidden h-(--nav-h) max-w-[720px] items-center justify-between gap-4 rounded-full border border-(--color-border) bg-(--color-surface)/70 pr-1.5 pl-5 backdrop-blur-xl backdrop-saturate-150 md:flex">
        <Link href="/" aria-current={pathname === '/' ? 'page' : undefined} className="press flex h-11 items-center transition-opacity duration-150 hover:opacity-80">
          <Logo />
        </Link>
        <Links active={active} />
        <button type="button" onClick={() => openApply()} aria-haspopup="dialog" className={cn(linkBox, 'press bg-(--color-text) text-(--color-background) transition-[transform,background-color,color] duration-150 hover:bg-(--chap-bg) hover:text-(--chap-text) focus-visible:bg-(--chap-bg) focus-visible:text-(--chap-text)')}>
          Apply
        </button>
      </nav>

      {/* Phone capsule: grows downward inside its own outline */}
      <div className="relative mx-auto h-(--nav-h) max-w-[720px] md:hidden">
        <div
          className={cn(
            'absolute inset-x-0 top-0 rounded-[26px] bg-(--color-surface)/90 backdrop-blur-xl backdrop-saturate-150 transition-[clip-path] duration-(--duration-sheet) ease-(--ease-drawer) reduced:duration-200',
            menu ? '[clip-path:inset(0_0_0_0_round_26px)]' : '[clip-path:inset(0_0_calc(100%-var(--nav-h))_0_round_26px)]',
          )}
        >
          <div className="flex h-(--nav-h) items-center justify-between pr-1 pl-5">
            <Link href="/" className="press flex h-11 items-center" aria-current={pathname === '/' ? 'page' : undefined}>
              <Logo />
            </Link>
            <button
              type="button"
              aria-expanded={menu}
              aria-controls="phone-menu"
              aria-label={menu ? 'Close menu' : 'Open menu'}
              onClick={() => setMenu((m) => !m)}
              className="press relative grid size-11 place-items-center"
            >
              <span aria-hidden className={cn('absolute h-px w-5 bg-current transition-transform duration-200 ease-(--ease-in-out)', menu ? 'rotate-45' : '-translate-y-[4px]')} />
              <span aria-hidden className={cn('absolute h-px w-5 bg-current transition-transform duration-200 ease-(--ease-in-out)', menu ? '-rotate-45' : 'translate-y-[4px]')} />
            </button>
          </div>
          <nav id="phone-menu" aria-label="Main" inert={!menu} className={cn('px-5 pb-5 transition-opacity duration-200', menu ? 'opacity-100 delay-100' : 'opacity-0')}>
            <ul className="border-t border-(--color-border)">
              {nav.map((l, i) => (
                <li key={l.href} className="border-b border-(--color-border)">
                  <Link href={l.href} aria-current={i === active ? 'page' : undefined} className="press type-heading flex min-h-14 items-center justify-between py-2 aria-[current=page]:text-(--color-accent)">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setMenu(false)
                openApply()
              }}
              className="press type-utility mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-(--color-text) [font-size:0.9375rem] text-(--color-background) active:bg-(--chap-bg)"
            >
              Apply for a seat
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

function Links({ active }: { active: number }) {
  const wrap = useRef<HTMLUListElement>(null)
  const [clip, setClip] = useState<{ l: number; r: number } | null>(null)
  const [animate, setAnimate] = useState(false)

  useLayoutEffect(() => {
    const ul = wrap.current
    if (!ul) return
    const measure = () => {
      const el = ul.querySelectorAll<HTMLElement>('[data-link]')[active]
      if (!el) return setClip(null)
      setClip({ l: el.offsetLeft, r: ul.offsetWidth - el.offsetLeft - el.offsetWidth })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(ul)
    return () => ro.disconnect()
  }, [active])

  // Slide only between links; on first paint (and from Home) the highlight simply appears.
  const prev = useRef(active)
  useEffect(() => {
    setAnimate(prev.current >= 0 && active >= 0 && prev.current !== active)
    prev.current = active
  }, [active])

  return (
    <div className="relative">
      <ul ref={wrap} className="flex items-center">
        {nav.map((l, i) => (
          <li key={l.href} data-link>
            <Link href={l.href} aria-current={i === active ? 'page' : undefined} className={cn(linkBox, 'press link-line aria-[current=page]:no-underline')}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <ul
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 flex items-center rounded-full bg-(--color-accent) text-(--inv-text)',
          animate && 'transition-[clip-path] duration-250 ease-(--ease-in-out) reduced:transition-none',
        )}
        style={{ clipPath: clip ? `inset(0 ${clip.r}px 0 ${clip.l}px round 999px)` : 'inset(0 100% 0 0)' }}
      >
        {nav.map((l) => (
          <li key={l.href} className={linkBox}>{l.label}</li>
        ))}
      </ul>
    </div>
  )
}
