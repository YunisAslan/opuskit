'use client'
import { useCallback, useState } from 'react'

/**
 * Hands a filled-in email to the visitor's email app. The button keeps its width and label; a spinner shows only
 * if the wait passes 300ms and then stays at least 500ms, so it never flickers. Nothing is faked as sent.
 */
export function useSend() {
  const [state, setState] = useState<'idle' | 'wait' | 'done'>('idle')
  const send = useCallback(async (href: string) => {
    const t0 = performance.now()
    const spin = setTimeout(() => setState('wait'), 300)
    window.location.href = href
    await new Promise((r) => setTimeout(r, 350))
    clearTimeout(spin)
    if (performance.now() - t0 > 300) await new Promise((r) => setTimeout(r, 500))
    setState('done')
  }, [])
  return { send, state }
}
