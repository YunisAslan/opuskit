import { ImageComparison } from '@/components/pieces/ImageComparison'
import { assets, type AssetKey } from '@/config/assets'

// A log / grade pair on the before/after slider, labelled like a viewer's A/B.
export function BeforeAfter({ before, after }: { before: AssetKey; after: AssetKey }) {
  const b = assets[before], a = assets[after]
  return (
    <figure className="relative">
      <ImageComparison before={b.src} after={a.src} beforeAlt={b.alt} afterAlt={a.alt} className="aspect-video rounded-(--radius-media)" />
      <figcaption className="type-utility pointer-events-none absolute inset-x-0 top-0 flex justify-between p-3">
        <span className="rounded-(--radius-button) bg-(--color-background)/80 px-2 py-1">Log</span>
        <span className="rounded-(--radius-button) bg-(--color-background)/80 px-2 py-1">Grade</span>
      </figcaption>
    </figure>
  )
}
