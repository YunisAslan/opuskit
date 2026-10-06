import Image from 'next/image'
import { assets, type AssetKey } from '@/config/assets'

// Renders any image from the asset config layer: src, alt, size and focal point come from config/assets.ts.
export function MediaAsset({ id, className, sizes = '100vw', preload = false, fill = false }: { id: AssetKey; className?: string; sizes?: string; preload?: boolean; fill?: boolean }) {
  const a = assets[id]
  const focus = 'focus' in a ? a.focus : undefined
  return fill
    ? <Image src={a.src} alt={a.alt} fill sizes={sizes} preload={preload} className={className} style={{ objectPosition: focus }} />
    : <Image src={a.src} alt={a.alt} width={a.w} height={a.h} sizes={sizes} preload={preload} className={className} style={{ objectPosition: focus }} />
}
