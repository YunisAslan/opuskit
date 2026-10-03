import type { ReactNode } from 'react'
import { Wayfinder } from '@/components/Wayfinder'

// The big idea: every page is a walk through named stops. Each stop wraps one chapter, gets an anchor and a name, and
// the Wayfinder shows where the visitor is. `still` stops (the first screen, the walk) handle their own entrance.
export type Stop = { name: string; node: ReactNode; still?: boolean }
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export function Stops({ items }: { items: Stop[] }) {
  return (
    <>
      {items.map((s) => <div key={s.name} id={slug(s.name)} data-stop={s.name} data-reveal={s.still ? undefined : ''}>{s.node}</div>)}
      <Wayfinder stops={items.map((s) => ({ id: slug(s.name), name: s.name }))} />
    </>
  )
}
