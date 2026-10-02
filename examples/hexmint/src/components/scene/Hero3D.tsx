'use client'
// The hero's visual layer. Poster first: the still rendered from this same scene is on screen from the first paint
// and stays if WebGL never arrives. The canvas loads late (next/dynamic, ssr: false, once the browser is idle) and
// fades in over the poster; once the fade ends the poster is removed (the live framing follows screen size, pointer
// and scroll, so the two never line up). Reduced motion, weak devices, no WebGL 2 and a lost GL context keep or bring
// back the poster.
// Decorative: aria-hidden; every word on the hero is HTML.
import dynamic from 'next/dynamic'
import { Component, useEffect, useRef, useState, type ReactNode } from 'react'
import { MediaAsset } from '@/components/MediaAsset'
import type { Variant } from './layouts'

const HexScene = dynamic(() => import('./HexScene'), { ssr: false })

// The Canvas rethrows any WebGL/scene error to its parent; catch it here and fall back to the poster.
class Fallback extends Component<{ onFail: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onFail() }
  render() { return this.state.failed ? null : this.props.children }
}

export function Hero3D() {
  const box = useRef<HTMLDivElement>(null)
  const inView = useRef(true)
  const [live, setLive] = useState(false)
  const [shown, setShown] = useState(false)
  const [faded, setFaded] = useState(false)
  const [still, setStill] = useState<Variant | null>(null)

  useEffect(() => {
    // Dev only: /?still=hero|invoices|expenses|books|close renders a full-screen still for `npm run stills`.
    if (process.env.NODE_ENV !== 'production') {
      const v = new URLSearchParams(location.search).get('still') as Variant | null
      // eslint-disable-next-line react-hooks/set-state-in-effect -- the URL is only readable after mount
      if (v) { setStill(v); return }
    }
    const nav = navigator as Navigator & { deviceMemory?: number }
    const weak = (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2
    const gl2 = !!document.createElement('canvas').getContext('webgl2') // three r163+ renders on WebGL 2 only
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || weak || !gl2) return
    const io = new IntersectionObserver(([e]) => { inView.current = e.isIntersecting })
    if (box.current) io.observe(box.current)
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200))
    idle(() => setLive(true))
    return () => io.disconnect()
  }, [])

  const fail = () => { setLive(false); setShown(false); setFaded(false) }

  if (still) return (
    <div className="fixed inset-0 z-[999] bg-(--color-background)">
      <HexScene variant={still} still onReady={() => setTimeout(() => { (window as Window & { __stillReady?: boolean }).__stillReady = true }, 300)} />
    </div>
  )

  return (
    <div ref={box} aria-hidden className="absolute inset-x-0 top-0 h-[62svh] md:inset-0 md:h-auto">
      {!faded && <MediaAsset id="heroPoster" priority className="absolute inset-0 size-full object-cover" />}
      {live && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${shown ? 'opacity-100' : 'opacity-0'}`}
          onTransitionEnd={(e) => { if (e.target === e.currentTarget && shown) setFaded(true) }}>
          <Fallback onFail={fail}><HexScene inView={inView} onReady={() => setShown(true)} onFail={fail} /></Fallback>
        </div>
      )}
    </div>
  )
}
