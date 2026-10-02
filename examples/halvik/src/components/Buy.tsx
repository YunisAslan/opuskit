'use client'
// The main action, buy something: one slide-in panel (shadcn Sheet) shared by every "Add to bag" on the site.
// Any link to "#buy" opens it; "#buy?build=barebones&dial=1&switch=silent" opens it preset (see SiteLink).
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { builds, dialAddOn, layouts, switchTypes, type Build, type Layout, type SwitchType } from '@/config/product'

const BuyPanel = dynamic(() => import('@/components/BuyPanel'), { ssr: false })

export type Order = { build: Build; switch: SwitchType; layout: Layout; dial: boolean }
const DEFAULT: Order = { build: 'complete', switch: 'tactile', layout: 'ansi', dial: false }

export const totalOf = (o: Order) => o.build === 'dial' ? builds.dial.price : builds[o.build].price + (o.dial ? dialAddOn : 0)

const Ctx = createContext<(preset?: Partial<Order>) => void>(() => {})
export const useBuy = () => useContext(Ctx)

/** "#buy?build=dial&dial=1" → a partial order */
export function parseBuyHash(href: string): Partial<Order> | null {
  if (!href.startsWith('#buy')) return null
  const q = new URLSearchParams(href.split('?')[1] ?? '')
  const p: Partial<Order> = {}
  const b = q.get('build'); if (b && b in builds) p.build = b as Build
  const s = q.get('switch'); if (s && s in switchTypes) p.switch = s as SwitchType
  const l = q.get('layout'); if (l && l in layouts) p.layout = l as Layout
  if (q.has('dial')) p.dial = q.get('dial') === '1'
  return p
}

export function BuyProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [o, setO] = useState<Order>(DEFAULT)
  const [ready, setReady] = useState(false) // the panel's code loads on first open
  const openBuy = useCallback((preset?: Partial<Order>) => { setO((cur) => ({ ...cur, ...preset })); setReady(true); setOpen(true) }, [])
  const set = (p: Partial<Order>) => setO((cur) => ({ ...cur, ...p }))

  return (
    <Ctx.Provider value={openBuy}>
      {children}
      {ready && <BuyPanel open={open} setOpen={setOpen} o={o} set={set} />}
    </Ctx.Provider>
  )
}

/** A button that opens the buy panel (preset optional). */
export function BuyButton({ preset, children = 'Add to bag', size = 'lg', className }: { preset?: Partial<Order>; children?: ReactNode; size?: 'lg' | 'default'; className?: string }) {
  const openBuy = useBuy()
  return <Button size={size} className={className} onClick={() => openBuy(preset)}>{children}</Button>
}
