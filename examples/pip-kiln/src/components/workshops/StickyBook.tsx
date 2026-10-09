'use client'
// Phones: a "Book a Saturday" bar stays at the bottom of the Workshops page until the booking form is on screen.
import { useEffect, useState } from 'react'
import { workshops } from '@/content/workshops'

export function StickyBook() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const book = document.getElementById('book')
    if (!book) return
    let past = false, visible = false
    const update = () => setShow(!visible && window.scrollY > 300 && !past)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; past = e.boundingClientRect.top < 0; update() })
    io.observe(book)
    addEventListener('scroll', update, { passive: true })
    return () => { io.disconnect(); removeEventListener('scroll', update) }
  }, [])
  return (
    <div aria-hidden={!show} className={`fixed inset-x-0 bottom-0 z-30 px-(--gutter) pb-[calc(12px+env(safe-area-inset-bottom,0px))] transition-[transform,opacity] duration-200 ease-(--ease-out) md:hidden ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'}`}>
      <a href="#book" tabIndex={show ? 0 : -1} className="btn btn-ink w-full">{workshops.reservation.sticky}</a>
    </div>
  )
}
