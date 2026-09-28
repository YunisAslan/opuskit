'use client'
import { useRef } from 'react'
import { isFinePointer, prefersReducedMotion } from '@/lib/motion'

// Signature moment: card tilts toward the pointer (max 6°, perspective 800px)
// with a 12% highlight following it. Touch: press-scale. Reduced motion: flat.
export default function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const move = (e: React.PointerEvent) => {
    const el = ref.current!
    if (!isFinePointer() || prefersReducedMotion()) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.transition = 'transform 80ms linear'
    el.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 12}deg) rotateY(${(x - 0.5) * 12}deg)`
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    el.style.setProperty('--glow', '0.12')
  }
  const leave = () => {
    const el = ref.current!
    el.style.transition = 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
    el.style.transform = ''
    el.style.setProperty('--glow', '0')
  }

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`relative will-change-transform active:scale-[0.98] motion-reduce:active:scale-100 [@media(pointer:fine)]:active:scale-100 ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-150"
        style={{ opacity: 'var(--glow, 0)', background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), var(--color-surface), transparent 60%)' }}
      />
    </div>
  )
}
