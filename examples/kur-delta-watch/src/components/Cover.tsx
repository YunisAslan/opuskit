import type { ReactNode } from 'react'
import { GiantWord } from '@/components/GiantWord'
import { MediaAsset } from '@/components/MediaAsset'
import type { AssetKey } from '@/config/assets'

// A page opens like a magazine cover: one giant word (the page's h1), a short calm line, and — where the page has
// one — a full-bleed photo that opens like a curtain. Then the reading column starts.
export function Cover({ word, title, intro, image }: { word: string; title: string; intro: ReactNode; image?: AssetKey }) {
  return (
    <header>
      <GiantWord as="h1" word={word} label={title} />
      <div className="grid px-5 py-10 md:grid-cols-12 md:px-10 md:py-14">
        <p className="type-body text-[1.125rem] md:col-span-6 md:text-[1.25rem]">{intro}</p>
      </div>
      {image && (
        <div data-curtain className="overflow-hidden border-y-2 border-(--color-border)">
          <MediaAsset id={image} priority className="aspect-[4/5] w-full object-cover md:aspect-[21/9]" />
        </div>
      )}
    </header>
  )
}
