'use client'
// Sending a form (recipe → Seasoning): the button keeps its width and label; a small spinner appears inside it only
// after 300ms and stays at least 500ms, so it never flickers; it ends in place with a tick that draws in (200ms).
import { useCallback, useRef, useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type SendState = 'idle' | 'busy' | 'done'

export function useSend() {
  const [state, setState] = useState<SendState>('idle')
  const [spin, setSpin] = useState(false)
  const shownAt = useRef(0)
  const run = useCallback(async (work: () => Promise<void> | void) => {
    setState('busy')
    const timer = window.setTimeout(() => { shownAt.current = Date.now(); setSpin(true) }, 300)
    try {
      await work()
    } finally {
      window.clearTimeout(timer)
      if (shownAt.current) {
        const left = 500 - (Date.now() - shownAt.current)
        if (left > 0) await new Promise((r) => setTimeout(r, left))
      }
      shownAt.current = 0
      setSpin(false)
    }
    setState('done')
  }, [])
  return { state, spin, run, reset: () => setState('idle') }
}

export function SendButton({ state, spin, children, className }: { state: SendState; spin: boolean; children: ReactNode; className?: string }) {
  return (
    <Button type="submit" aria-disabled={state === 'busy' || undefined} className={cn('relative', className)}>
      <span className={cn('transition-opacity duration-150', (spin || state === 'done') && 'opacity-0')}>{children}</span>
      {spin && <svg aria-hidden viewBox="0 0 24 24" className="spinner absolute size-4"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" /><path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>}
      {state === 'done' && !spin && <svg aria-hidden viewBox="0 0 16 16" className="absolute size-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path className="tick-draw" d="M3 8.5l3.2 3.2L13 4.8" /></svg>}
      <span className="sr-only" aria-live="polite">{state === 'busy' ? 'Working' : state === 'done' ? 'Done' : ''}</span>
    </Button>
  )
}
