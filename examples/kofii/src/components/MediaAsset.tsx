import Image from 'next/image'
import { assets, photos, type AssetKey } from '@/config/assets'

type Props = {
  id?: AssetKey
  photo?: number // index into the owner's photo set
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  fit?: 'cover' | 'contain'
  reveal?: 'clip' | 'rise'
  alt?: string
}

// Renders any image from the asset layer. Assets not supplied yet render a placeholder, never a broken request.
export function MediaAsset({ id, photo, className = '', imgClassName = '', sizes = '100vw', priority, fit = 'cover', reveal, alt }: Props) {
  const entry = photo !== undefined ? { ...photos[photo % photos.length], status: 'have' as const } : assets[id!]
  const missing = entry.status !== 'have'
  return (
    <div className={`relative overflow-hidden rounded-media bg-surface ${className}`} data-reveal={reveal}>
      {missing ? (
        <div role="img" aria-label={entry.alt || undefined} className="absolute inset-0 grid place-items-center p-6 text-center">
          <span className="type-utility text-muted">{entry.alt || 'Image to come'}</span>
          {process.env.NODE_ENV === 'development' && (
            <span className="type-utility absolute left-3 top-3 rounded-button bg-secondary px-2 py-1">Temporary: {id}</span>
          )}
        </div>
      ) : (
        <Image
          src={entry.src}
          alt={alt ?? entry.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`${fit === 'cover' ? 'object-cover' : 'object-contain'} ${imgClassName}`}
        />
      )}
    </div>
  )
}
