'use client'
import { useEffect, useState } from 'react'

// A media query read after hydration (false on the server and on the first client render), so the server HTML and
// the first client render always match.
export function useMedia(query: string) {
  const [on, set] = useState(false)
  useEffect(() => { const m = matchMedia(query); const f = () => set(m.matches); f(); m.addEventListener('change', f); return () => m.removeEventListener('change', f) }, [query])
  return on
}
export const useReduce = () => useMedia('(prefers-reduced-motion: reduce)')
