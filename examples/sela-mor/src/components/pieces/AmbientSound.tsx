'use client'
// OpusKit piece — a quiet sound loop with an always-visible switch (bottom-left by default; `placement` moves it, e.g.
// into the menu bar, so it never sits on top of text). Off by default and never autoplays:
// a remembered "on" waits for the visitor's first tap or key. Fades in and out, pauses while the tab is hidden.
// Reduced motion: the little bars stay still. Original OpusKit code (MIT).
import { useEffect, useRef, useState } from 'react'

const KEY = 'opuskit-sound'
const CSS = '@keyframes opuskit-bars{from{transform:scaleY(.3)}to{transform:scaleY(1)}}@media (prefers-reduced-motion:no-preference){.opuskit-bars[data-playing]>span{animation:opuskit-bars .9s ease-in-out infinite alternate}}'

export function AmbientSound({ src, label = 'Sound', volume = 0.4, placement = 'fixed bottom-4 left-4 z-[90]' }: { src: string; label?: string; volume?: number; /** Position classes for the switch; pass '' to place it in the flow (e.g. inside the menu bar). */ placement?: string }) {
  const [on, setOn] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audio = useRef<HTMLAudioElement | null>(null)
  const fade = useRef(0)
  const wanted = useRef(false) // the visitor's choice, for listeners
  const started = useRef(false) // the page has had a user gesture, so play() is allowed

  const ramp = (to: number, after?: () => void) => {
    const a = audio.current
    if (!a) return after?.()
    cancelAnimationFrame(fade.current)
    const from = a.volume, start = performance.now()
    const step = (now: number) => {
      const k = Math.min(1, Math.max(0, (now - start) / 800)) // the first frame can land just before start
      a.volume = Math.min(1, Math.max(0, from + (to - from) * k))
      if (k < 1) fade.current = requestAnimationFrame(step)
      else after?.()
    }
    fade.current = requestAnimationFrame(step)
  }
  const play = () => {
    started.current = true
    if (!src) return
    const a = (audio.current ??= Object.assign(new Audio(src), { loop: true, volume: 0 }))
    a.play().then(() => { setPlaying(true); ramp(volume) }).catch(() => { /* blocked or missing file: stay quiet */ })
  }
  const stop = () => { setPlaying(false); ramp(0, () => audio.current?.pause()) }

  useEffect(() => {
    let saved = false
    try { saved = localStorage.getItem(KEY) === 'on' } catch { /* private mode */ }
    if (!saved) return
    setOn(true)
    wanted.current = true
    // Browsers block sound until a gesture; a press on the switch itself is handled by its own click.
    const first = (e: Event) => {
      if ((e.target as HTMLElement | null)?.closest?.('[data-opuskit-sound]')) return
      remove()
      if (wanted.current && !started.current) play()
    }
    const remove = () => { removeEventListener('pointerdown', first); removeEventListener('keydown', first) }
    addEventListener('pointerdown', first)
    addEventListener('keydown', first)
    return remove
  }, [])

  useEffect(() => {
    const onVisibility = () => {
      const a = audio.current
      if (!a || !wanted.current) return
      if (document.hidden) a.pause()
      else a.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => { document.removeEventListener('visibilitychange', onVisibility); cancelAnimationFrame(fade.current); audio.current?.pause() }
  }, [])

  const toggle = () => {
    const next = !on
    setOn(next)
    wanted.current = next
    try { localStorage.setItem(KEY, next ? 'on' : 'off') } catch { /* private mode */ }
    if (next) play()
    else stop()
  }

  return (
    <>
      <button type="button" data-opuskit-sound aria-pressed={on} aria-label={`${label}: ${on ? 'on' : 'off'}`} onClick={toggle}
        className={`${placement} inline-flex min-h-11 min-w-11 items-center gap-2.5 rounded-(--radius-button,999px) border border-(--color-border) bg-(--color-background) px-4 font-(family-name:--font-utility) text-sm text-(--color-text)`}>
        <span aria-hidden className="opuskit-bars flex h-3 items-end gap-0.5" data-playing={playing || undefined}>
          {[0, 1, 2, 3].map((i) => <span key={i} className="h-full w-0.5 origin-bottom bg-current" style={{ transform: 'scaleY(.3)', animationDelay: `${i * -0.22}s` }} />)}
        </span>
        {label} {on ? 'on' : 'off'}
      </button>
      <style>{CSS}</style>
    </>
  )
}
