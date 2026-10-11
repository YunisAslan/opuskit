'use client'
// OpusKit piece — smooth scroll (Lenis, MIT): the wheel and trackpad glide instead of stepping, so scroll effects move
// as one. Mouse/trackpad only — touch keeps the phone's own scroll. Off under reduced motion. In-page #anchors glide
// too. Mount once in the root layout. Original OpusKit code (MIT).
import Lenis from 'lenis'
import { useEffect } from 'react'

const CSS = 'html.lenis,html.lenis body{height:auto}.lenis.lenis-smooth{scroll-behavior:auto!important}.lenis:not(.lenis-autoToggle).lenis-stopped{overflow:clip}.lenis [data-lenis-prevent],.lenis [data-lenis-prevent-wheel],.lenis [data-lenis-prevent-touch],.lenis [data-lenis-prevent-vertical],.lenis [data-lenis-prevent-horizontal]{overscroll-behavior:contain}.lenis.lenis-smooth iframe{pointer-events:none}.lenis.lenis-autoToggle{transition-property:overflow;transition-duration:1ms;transition-behavior:allow-discrete}'

export function SmoothScroll({ lerp = 0.1 }: { lerp?: number }) {
  useEffect(() => {
    const fine = matchMedia('(pointer: fine)'), still = matchMedia('(prefers-reduced-motion: reduce)')
    let lenis: Lenis | undefined
    const sync = () => {
      const want = fine.matches && !still.matches
      if (want && !lenis) lenis = new Lenis({ lerp, anchors: true, autoRaf: true }) // autoRaf: Lenis runs its own requestAnimationFrame loop
      else if (!want && lenis) { lenis.destroy(); lenis = undefined }
    }
    sync()
    fine.addEventListener('change', sync)
    still.addEventListener('change', sync)
    return () => { fine.removeEventListener('change', sync); still.removeEventListener('change', sync); lenis?.destroy() }
  }, [lerp])
  return <style>{CSS}</style>
}
