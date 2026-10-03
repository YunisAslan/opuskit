import type { ComponentProps } from 'react'
import { assets, type AssetKey } from '@/config/assets'

// Renders any image from the asset layer: src, alt and intrinsic size (no layout shift) come from config/assets.ts.
// A file still marked temporary shows a small badge in development only.
export function MediaAsset({ id, alt, priority, className, ...rest }: { id: AssetKey; priority?: boolean } & Omit<ComponentProps<'img'>, 'src'>) {
  const a = assets[id]
  const img = <img src={a.src} alt={alt ?? a.alt} width={a.width} height={a.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" className={className} {...rest} />
  if (process.env.NODE_ENV === 'production' || (a.status as string) !== 'temporary') return img
  return <span className="relative block">{img}<span className="type-utility absolute left-2 top-2 bg-(--color-background) px-2 py-1">Temporary</span></span>
}
