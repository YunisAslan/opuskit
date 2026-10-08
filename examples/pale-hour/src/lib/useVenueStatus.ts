'use client'
// The venue's open / closed state, recomputed every minute on the client only (the server cannot know the hour the
// visitor reads the page), so the first paint never disagrees with hydration.
import { useSyncExternalStore } from 'react'

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 30_000)
  return () => clearInterval(id)
}
const snapshot = () => Math.floor(Date.now() / 60_000)
const server = () => null

/** The current minute (ms since epoch) or null on the server and before hydration. */
export function useNow(): Date | null {
  const minute = useSyncExternalStore(subscribe, snapshot, server)
  return minute === null ? null : new Date(minute * 60_000)
}
