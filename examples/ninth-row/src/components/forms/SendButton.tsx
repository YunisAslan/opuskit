'use client'
// Sending a form — the button keeps its width and label; a small spinner appears inside it only after 300 ms and stays
// at least 500 ms (never a flicker); it ends in place with a tick that draws in. Errors live under their fields.
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type SendState = 'idle' | 'sending' | 'done'

/** Runs `work`, holding the waiting state by the rules above; resolves when the button may show its tick. */
export function useSend() {
  const [state, setState] = useState<SendState>('idle')
  const [spin, setSpin] = useState(false)
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const send = async (work: () => void | Promise<void>) => {
    setState('sending')
    let shownAt = 0
    timers.current.push(window.setTimeout(() => { setSpin(true); shownAt = performance.now() }, 300))
    await work()
    const wait = shownAt ? Math.max(0, 500 - (performance.now() - shownAt)) : 0
    await new Promise((r) => timers.current.push(window.setTimeout(r, wait)))
    timers.current.forEach(clearTimeout)
    setSpin(false)
    setState('done')
  }
  return { state, spin, send, reset: () => setState('idle') }
}

export function SendButton({ label, state, spin, className }: { label: string; state: SendState; spin: boolean; className?: string }) {
  return (
    <button type="submit" disabled={state === 'sending'} aria-busy={state === 'sending'} className={cn('btn btn-solid relative', className)}>
      <span className={cn('transition-opacity duration-150', (spin || state === 'done') && 'opacity-0')}>{label}</span>
      {spin && <span aria-hidden className="absolute inset-0 grid place-items-center"><span className="size-4 animate-spin border border-current border-t-transparent motion-reduce:animate-none" /></span>}
      {state === 'done' && (
        <span aria-hidden className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} className="[stroke-dasharray:1] [stroke-dashoffset:1] motion-safe:animate-[draw_200ms_var(--ease-out)_forwards] motion-reduce:[stroke-dashoffset:0]" /></svg>
        </span>
      )}
    </button>
  )
}
