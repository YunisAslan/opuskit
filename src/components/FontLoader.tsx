'use client'
import { useEffect } from 'react'

const loaded = new Set<string>()

/** Loads Google Fonts families on demand (only for previews/specimens that need them). */
export function useGoogleFonts(families: string[]) {
  const key = families.join('|')
  useEffect(() => {
    const todo = key.split('|').filter((f) => f && !loaded.has(f))
    if (!todo.length) return
    todo.forEach((f) => loaded.add(f))
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?${todo.map((f) => `family=${f}`).join('&')}&display=swap`
    document.head.appendChild(link)
  }, [key])
}
