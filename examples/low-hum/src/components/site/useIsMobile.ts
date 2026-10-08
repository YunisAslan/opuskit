'use client'
import { useEffect, useState } from 'react'

/** true under 640px — pickers open as bottom sheets there */
export function useIsMobile() {
  const [m, setM] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return m
}
