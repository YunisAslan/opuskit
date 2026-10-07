'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { AddToBagButton } from '@/components/cart/AddToBagButton'

// Mobile only: the buy action follows the thumb while the hero is on screen, then steps away.
export function HeroStickyCta({
  targetId,
  slug,
  name,
  price,
}: {
  targetId: string
  slug: string
  name: string
  price: string
}) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = document.getElementById(targetId)
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '-80px 0px 0px 0px',
      threshold: 0,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [targetId])

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-(--color-border) bg-(--color-surface) px-(--gutter) py-3 transition-[transform,opacity] duration-300 ease-out lg:hidden',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0',
      )}
    >
      <div className="min-w-0">
        <span className="type-utility block truncate text-(--color-muted)">{name}</span>
        <span className="type-body tabular-nums">{price}</span>
      </div>
      <AddToBagButton slug={slug} name={name} className="shrink-0" />
    </div>
  )
}