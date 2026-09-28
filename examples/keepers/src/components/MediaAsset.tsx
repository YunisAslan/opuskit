import Image from 'next/image'
import { assets, type AssetKey } from '@/config/assets'

type Props = {
  id: AssetKey
  className?: string
  sizes?: string
  priority?: boolean
  fill?: boolean
  alt?: string
}

// Renders any still from the asset config layer. Video is rendered by ScrollFilm,
// which reads the same config. Temporary assets carry a badge in development.
export default function MediaAsset({ id, className, sizes = '100vw', priority, fill = true, alt }: Props) {
  const a = assets[id]
  const temporary = a.status === 'temporary' && process.env.NODE_ENV !== 'production'
  const image = fill ? (
    <Image src={a.src} alt={alt ?? a.alt} fill sizes={sizes} priority={priority} className={className ?? 'object-cover'} />
  ) : (
    <Image src={a.src} alt={alt ?? a.alt} width={a.width} height={a.height} sizes={sizes} priority={priority} className={className} />
  )
  if (!temporary) return image
  return (
    <>
      {image}
      <span className="type-utility absolute left-2 top-2 z-10 bg-accent px-2 py-1 text-background">Temporary: {id}</span>
    </>
  )
}
