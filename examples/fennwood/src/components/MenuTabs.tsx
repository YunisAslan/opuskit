'use client'
// The menu chapter: Dinner and Weekend lunch as tabs over the ready MenuSection, plus the hover media preview — on a
// pointer device, a dish with a photo shows it beside the cursor (it follows on a spring and crossfades between dishes).
// Touch: no preview. Reduced motion: the photo shows in a fixed corner slot instead of following.
import { motion, useReducedMotion, useSpring } from 'motion/react'
import { useState, type PointerEvent, type ReactNode } from 'react'
import { MenuGroups, MenuSection } from '@/components/sections/Menu'
import { MediaAsset } from '@/components/MediaAsset'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { AssetKey } from '@/config/assets'
import type { Menu } from '@/config/site'

export function MenuTabs({ id, title, menus, note }: { id?: string; title: ReactNode; menus: Menu[]; note?: ReactNode }) {
  const reduce = useReducedMotion()
  const [preview, setPreview] = useState<AssetKey | null>(null)
  const x = useSpring(0, { stiffness: 320, damping: 32, mass: 0.5 })
  const y = useSpring(0, { stiffness: 320, damping: 32, mass: 0.5 })
  const previews = [...new Set(menus.flatMap((m) => m.groups.flatMap((g) => g.items.flatMap((i) => (i.image ? [i.image] : [])))))]

  const move = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    if (reduce) return setPreview(((e.target as HTMLElement).closest<HTMLElement>('[data-preview]')?.dataset.preview as AssetKey | undefined) ?? null)
    const key = (e.target as HTMLElement).closest<HTMLElement>('[data-preview]')?.dataset.preview as AssetKey | undefined
    if (key && !preview) { x.jump(e.clientX + 32); y.jump(e.clientY - 120) }
    setPreview(key ?? null)
    x.set(e.clientX + 32); y.set(e.clientY - 120)
  }

  return (
    <Tabs defaultValue={menus[0].id} className="gap-0">
      <div onPointerMove={move} onPointerLeave={() => setPreview(null)}>
        <MenuSection id={id} title={title} note={note} switcher={
          <TabsList className="bg-(--color-secondary) p-1 group-data-horizontal/tabs:h-12">
            {menus.map((m) => (
              <TabsTrigger key={m.id} value={m.id} className="h-10 rounded-(--radius-button) px-4 text-[0.9375rem] text-(--color-text) data-active:bg-(--color-background) group-data-[variant=default]/tabs-list:data-active:shadow-none focus-visible:underline">{m.label}</TabsTrigger>
            ))}
          </TabsList>
        }>
          {menus.map((m) => <TabsContent key={m.id} value={m.id}><MenuGroups groups={m.groups} /></TabsContent>)}
        </MenuSection>
      </div>
      <motion.div aria-hidden className="pointer-events-none fixed top-0 left-0 z-30 hidden aspect-[4/3] w-60 overflow-hidden rounded-(--radius-media) motion-reduce:top-auto motion-reduce:right-6 motion-reduce:bottom-6 motion-reduce:left-auto [@media(pointer:fine)]:block"
        style={{ x, y }} animate={{ opacity: preview ? 1 : 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
        {previews.map((k) => (
          <div key={k} className="absolute inset-0 transition-opacity duration-250 ease-out" style={{ opacity: preview === k ? 1 : 0 }}>
            <MediaAsset id={k} sizes="240px" />
          </div>
        ))}
      </motion.div>
    </Tabs>
  )
}
