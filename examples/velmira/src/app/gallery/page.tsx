import type { Metadata } from 'next'
import { assets, type AssetKey } from '@/config/assets'
import { Chapter } from '@/components/site/Motif'
import { GallerySection } from '@/components/sections/Gallery'

export const metadata: Metadata = { title: 'Gallery', description: 'The bathhouse, the dock in the fog, the rooms and the small things in between.' }

const photo = (key: AssetKey, id: string, caption?: string, wide?: boolean) => ({ id, src: assets[key].src, alt: assets[key].alt, width: assets[key].width, height: assets[key].height, caption, wide })

export default function Gallery() {
  return (
    <GallerySection
      title={<Chapter><h1 className="type-display max-w-[11ch]">The house in fog</h1></Chapter>}
      intro={<p className="type-body mt-8 max-w-[46ch] text-(--color-muted)">Mist most mornings, sun most afternoons. A few rooms, the water and the small things in between, as guests find them.</p>}
      photos={[
        photo('bath', 'bathhouse', 'The bathhouse pool, January'),
        photo('gallery1', 'bath-by-the-window'),
        photo('gallery2', 'firs-in-fog', 'Firs above the house'),
        photo('room2', 'window-room', 'Room 5'),
        photo('gallery3', 'morning-tea'),
        photo('sauna', 'sauna', 'The sauna, before it is lit'),
        photo('lake', 'the-dock', 'The dock at eight in the morning', true),
        photo('room1', 'blue-room', 'Room 2'),
        photo('gallery4', 'towels'),
        photo('room3', 'linen-room', 'Room 8'),
        photo('arrival', 'the-house', 'The house from the water'),
      ]}
    />
  )
}
