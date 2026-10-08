'use client'
// Mobile only: "Book a table" stays one thumb away at the bottom of the screen once the first screen has passed.
// It steps aside while a booking form or the footer is on screen, so it never covers the thing it points to.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { sticky } from '@/content/site'

export function StickyBook() {
  const path = usePathname()
  const [past, setPast] = useState(false)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const on = () => setPast(window.scrollY > window.innerHeight * 0.6)
    on()
    window.addEventListener('scroll', on, { passive: true })
    const seen = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)))
      setBlocked(seen.size > 0)
    })
    document.querySelectorAll('[data-booking], footer').forEach((el) => io.observe(el))
    return () => { window.removeEventListener('scroll', on); io.disconnect() }
  }, [path])

  const show = past && !blocked
  return (
    <div className={`fixed inset-x-0 bottom-0 z-30 px-(--gutter) pb-[max(16px,env(safe-area-inset-bottom))] transition-[opacity,transform] duration-300 ease-(--ease-hum) md:hidden ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}>
      <Link href="/reservations#book" tabIndex={show ? 0 : -1} aria-hidden={!show}
        className="type-utility flex h-14 w-full items-center justify-center rounded-(--radius-button) bg-(--color-primary) text-(--color-background) shadow-[0_12px_32px_color-mix(in_oklab,var(--color-background)_70%,transparent)] [font-size:0.9375rem] transition-colors duration-150 outline-none active:bg-(--color-muted) focus-fill">
        {sticky.label}
      </Link>
    </div>
  )
}
