'use client'
// Phones: the booking action stays under the thumb until the form itself is on screen, then steps aside.
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function StickyBook({ target, label }: { target: string; label: string }) {
  const [hide, setHide] = useState(true)
  useEffect(() => {
    // hidden while the form is on screen, and again at the foot of the page, where the footer gives the way back
    const els = [document.getElementById(target), document.querySelector('footer')].filter(Boolean) as Element[]
    const seen = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)))
      setHide(seen.size > 0)
    }, { rootMargin: '0px 0px -30% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [target])
  return (
    <div className={cn('fixed inset-x-0 bottom-0 z-[60] border-t border-(--color-border) bg-(--color-background)/95 px-(--gutter) pt-3 pb-[max(12px,env(safe-area-inset-bottom,0px))] backdrop-blur-sm transition-[transform,opacity] duration-300 ease-(--ease-out) md:hidden motion-reduce:transition-opacity', hide ? 'pointer-events-none translate-y-full opacity-0' : 'translate-y-0 opacity-100')}>
      <a href={`#${target}`} className="btn btn-solid w-full" tabIndex={hide ? -1 : 0}>{label}</a>
    </div>
  )
}
