import Image from 'next/image'
import { assets, type AssetKey } from '@/config/assets'

// Renders any image from the asset config layer. The parent sets the frame (aspect ratio, width); the image covers it.
// Temporary assets get a small badge in development so they are easy to spot and replace.
export function MediaAsset({ id, sizes, className = '', priority = false, alt }: { id: AssetKey; sizes: string; className?: string; priority?: boolean; alt?: string }) {
  const a = assets[id]
  return (
    <span className="relative block h-full w-full overflow-hidden">
      <Image
        src={a.src}
        alt={alt ?? a.alt}
        width={a.width}
        height={a.height}
        sizes={sizes}
        preload={priority}
        fetchPriority={priority ? 'high' : undefined}
        loading={priority ? 'eager' : 'lazy'}
        className={`h-full w-full rounded-(--radius-media) object-cover ${className}`}
      />
      {process.env.NODE_ENV === 'development' && a.status === 'temporary' && (
        <span className="type-utility absolute top-2 left-2 bg-(--color-text) px-2 py-1 text-(--color-background)">Temporary: {id}</span>
      )}
    </span>
  )
}
