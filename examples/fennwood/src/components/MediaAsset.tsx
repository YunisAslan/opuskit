// Renders any photo from the asset layer by key. Fills its frame (the parent sets size/ratio and position: relative).
import Image from 'next/image'
import { assets, type AssetKey } from '@/config/assets'

export function MediaAsset({ id, sizes, className, preload = false }: { id: AssetKey; sizes: string; className?: string; preload?: boolean }) {
  const a = assets[id]
  return (
    <Image src={a.src} alt={a.alt} fill sizes={sizes} preload={preload} loading={preload ? 'eager' : 'lazy'}
      className={`object-cover ${className ?? ''}`} style={{ objectPosition: a.position }} />
  )
}
