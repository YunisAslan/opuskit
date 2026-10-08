'use client'
// OpusKit section — Menu, fitted to Low Hum: real HTML in two columns with dotted leaders and prices aligned right.
// Two menus, so two tabs — named like the two sides of a record. `aside` lets a page put something beside the menu
// that follows the chosen side (the Menu page puts its record there).
import { useState, type ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Reveal } from '@/components/site/Reveal'

export type MenuGroup = { name: string; items: { name: string; description?: string; price: string }[] }
export type MenuSide = { side: string; label: string; groups: MenuGroup[] }

export function MenuSection({ heading, intro, sides, note, aside, after, id }: {
  heading: ReactNode; intro?: string; sides: MenuSide[]; note?: string; id?: string
  /** rendered beside the menu, told which side is playing */
  aside?: (side: number) => ReactNode
  after?: ReactNode
}) {
  const [side, setSide] = useState(0)
  const tabs = (
    <TabsList aria-label="Choose a menu" className={aside ? '' : 'mx-auto'}>
      {sides.map((s, i) => (
        <TabsTrigger key={s.side} value={String(i)}>{s.side}: {s.label}</TabsTrigger>
      ))}
    </TabsList>
  )
  const list = (
    <>
      {sides.map((s, i) => (
        <TabsContent key={s.side} value={String(i)} forceMount className="data-[state=inactive]:hidden">
          <div className={`grid gap-x-12 gap-y-14 md:grid-cols-2 ${aside ? 'lg:gap-x-10' : 'lg:gap-x-16'}`}>
            {s.groups.map((g) => (
              <div key={g.name}>
                <h3 className="type-heading border-b border-(--color-text) pb-4">{g.name}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it.name} className="border-b border-(--color-border) py-5">
                      <p className="flex items-baseline gap-3">
                        <span className="type-heading [font-size:clamp(1.2rem,1.5vw,1.375rem)]">{it.name}</span>
                        <span aria-hidden className="relative -top-1 flex-1 border-b border-dotted border-(--color-muted)/50" />
                        <span className="type-body tabular-nums">{it.price}</span>
                      </p>
                      {it.description && <p className="type-body mt-1.5 max-w-[46ch] text-(--color-muted)">{it.description}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </>
  )

  return (
    <section id={id} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <div className="text-center">
          {heading}
          {intro && <p className="type-body mx-auto mt-6 max-w-[48ch] text-(--color-muted) [font-size:clamp(1.0625rem,1.3vw,1.1875rem)]">{intro}</p>}
        </div>
        <Tabs value={String(side)} onValueChange={(v) => setSide(Number(v))} className="mt-14 md:mt-16">
          {aside ? (
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <div className="flex flex-col items-center gap-8 lg:sticky lg:top-28">
                  {aside(side)}
                  {tabs}
                </div>
              </div>
              <Reveal className="lg:col-span-8">{list}</Reveal>
            </div>
          ) : (
            <>
              {tabs}
              <Reveal className="mt-12">{list}</Reveal>
            </>
          )}
        </Tabs>
        {note && <p className="type-caption mx-auto mt-12 max-w-[60ch] text-center text-(--color-muted)">{note}</p>}
        {after}
      </div>
    </section>
  )
}
