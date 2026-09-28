import Image from 'next/image'
import { assets, type AssetKey } from '@/config/assets'

type Props = {
  id: AssetKey
  /** index into a gallery asset (yourPhotos) */
  index?: number
  alt?: string
  sizes?: string
  priority?: boolean
  /** fill the positioned parent instead of using intrinsic size */
  fill?: boolean
  className?: string
}

// Resolves src, alt and dimensions from the asset layer. Assets not yet supplied show a dev-only badge.
export default function MediaAsset({ id, index, alt, sizes = '100vw', priority, fill = true, className = '' }: Props) {
  const a = assets[id] as { src: string; alt: string; status: string; gallery?: readonly string[]; dims?: readonly (readonly number[])[]; alts?: readonly string[] }
  const src = index !== undefined && a.gallery ? a.gallery[index % a.gallery.length] : a.src
  const i = index !== undefined && a.gallery ? index % a.gallery.length : -1
  const text = alt ?? (i >= 0 ? a.alts?.[i] : a.alt) ?? ''
  const dim = i >= 0 ? a.dims?.[i] : undefined
  const temporary = process.env.NODE_ENV === 'development' && (a.status === 'temporary' || a.status === 'find')

  return (
    <>
      {fill || !dim ? (
        <Image src={src} alt={text} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />
      ) : (
        <Image src={src} alt={text} width={dim[0]} height={dim[1]} sizes={sizes} priority={priority} className={className} />
      )}
      {temporary && (
        <span className="type-utility absolute left-2 top-2 z-10 bg-surface px-2 text-accent">Temporary: {id}</span>
      )}
    </>
  )
}
