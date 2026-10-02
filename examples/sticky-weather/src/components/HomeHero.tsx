'use client'
// Home's first screen: the gate (first visit of a session) over the sticker orbit. When the gate opens, the
// stickers pop in again one by one, so the opening is seen rather than played under the cover.
import { useState } from 'react'
import { Gate } from '@/components/Gate'
import { MediaAsset } from '@/components/MediaAsset'
import { StartProject } from '@/components/StartProject'
import { TextEffect } from '@/components/pieces/TextEffect'
import { OrbitHeroSection, type OrbitItem } from '@/components/sections/OrbitHero'
import { stickers } from '@/components/Stickers'
import type { AssetKey } from '@/config/assets'

const photo = (id: AssetKey): OrbitItem['node'] => <div className="relative border-[5px] border-(--color-paper)"><MediaAsset id={id} priority className="block aspect-square w-full object-cover" /></div>

// The first eight are the mobile ring: a mix of marks, slogans and work.
const items: OrbitItem[] = [
  { node: stickers.cloud, alt: '', size: 132, tilt: -8 },
  { node: stickers.hello, alt: '', size: 150, tilt: 6 },
  { node: photo('work4'), alt: '', size: 128, tilt: -5 },
  { node: stickers.star, alt: '', size: 150, tilt: 10 },
  { node: stickers.bolt, alt: '', size: 104, tilt: -12 },
  { node: photo('work1'), alt: '', size: 118, tilt: 7 },
  { node: stickers.badge, alt: '', size: 140, tilt: -4 },
  { node: stickers.umbrella, alt: '', size: 128, tilt: 9 },
  { node: stickers.sun, alt: '', size: 130, tilt: -6 },
  { node: stickers.label, alt: '', size: 156, tilt: -10 },
  { node: photo('work6'), alt: '', size: 120, tilt: 5 },
  { node: stickers.drop, alt: '', size: 104, tilt: 12 },
  { node: stickers.rainbow, alt: '', size: 140, tilt: -3 },
]

export function HomeHero() {
  const [round, setRound] = useState(0)
  return (
    <>
      <Gate onOpen={() => setRound((r) => r + 1)} />
      <OrbitHeroSection key={round} items={items}
        eyebrow="A small design studio for brands that want to be picked up."
        loud={<TextEffect as="span">Plain brand?</TextEffect>}
        quiet={<TextEffect as="span" delay={0.25}>Stick with us.</TextEffect>}
        line="Identities, packaging and websites that feel like stickers on a laptop. Go on, peel one off."
        action={<StartProject />} />
    </>
  )
}
