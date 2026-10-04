import Image from 'next/image'
import { assets, type AssetKey } from '@/config/assets'

// Renders any photo from the asset layer. Only the hero passes `priority`; everything else lazy-loads.
export function MediaAsset({ id, className, sizes = '100vw', priority }: { id: AssetKey; className?: string; sizes?: string; priority?: boolean }) {
  const a = assets[id]
  return (
    <Image src={a.src} alt={a.alt} width={a.width} height={a.height} sizes={sizes} priority={priority}
      className={`${className ?? ''} ${a.status === 'temporary' && process.env.NODE_ENV === 'development' ? 'outline-2 outline-dashed outline-(--color-accent)' : ''}`} />
  )
}
