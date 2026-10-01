'use client'
// The hero's visual layer. Poster first: the still rendered from this same scene is on screen from the first paint
// and stays if WebGL never arrives. The canvas loads late (next/dynamic, ssr: false, once the browser is idle) and
// fades in over the identical poster. Reduced motion, weak devices and a lost GL context keep the poster.
// Decorative: aria-hidden; every word on the hero is HTML.
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { MediaAsset } from '@/components/MediaAsset'
import type { Variant } from './layouts'

const HexScene = dynamic(() => import('./HexScene'), { ssr: false })

export function Hero3D() {
  const box = useRef<HTMLDivElement>(null)
  const inView = useRef(true)
  const [live, setLive] = useState(false)
  const [shown, setShown] = useState(false)
  const [still, setStill] = useState<Variant | null>(null)

  useEffect(() => {
    // Dev only: /?still=hero|invoices|expenses|books|close renders a full-screen still for `npm run stills`.
    if (process.env.NODE_ENV !== 'production') {
      const v = new URLSearchParams(location.search).get('still') as Variant | null
      if (v) { setStill(v); return }
    }
    const nav = navigator as Navigator & { deviceMemory?: number }
    const weak = (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || weak) return
    const io = new IntersectionObserver(([e]) => { inView.current = e.isIntersecting })
    if (box.current) io.observe(box.current)
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200))
    idle(() => setLive(true))
    return () => io.disconnect()
  }, [])

  if (still) return (
    <div className="fixed inset-0 z-[999] bg-(--color-background)">
      <HexScene variant={still} still onReady={() => setTimeout(() => { (window as Window & { __stillReady?: boolean }).__stillReady = true }, 300)} />
    </div>
  )

  return (
    <div ref={box} aria-hidden className="absolute inset-0">
      <MediaAsset id="heroPoster" priority className="absolute inset-0 size-full object-cover" />
      {live && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${shown ? 'opacity-100' : 'opacity-0'}`}>
          <HexScene inView={inView} onReady={() => setShown(true)} onFail={() => setLive(false)} />
        </div>
      )}
    </div>
  )
}
