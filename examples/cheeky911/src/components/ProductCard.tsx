import Link from 'next/link'
import type { Product } from '@/config/products'
import MediaAsset from './MediaAsset'

// Image 4:5, name, price. Hover swaps to the alternate photo.
export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop#${product.slug}`} className="group block">
      <div data-reveal="clip" className="relative aspect-[4/5] overflow-hidden bg-surface">
        <MediaAsset id="yourPhotos" index={product.photo} sizes="(min-width: 768px) 33vw, 50vw" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
          <MediaAsset id="yourPhotos" index={product.alt} alt="" sizes="(min-width: 768px) 33vw, 50vw" />
        </div>
      </div>
      <h3 className="mt-4 font-heading text-base font-bold leading-tight group-hover:text-muted md:text-lg">{product.name}</h3>
      <p className="type-utility mt-1 text-muted">{product.price}, {product.availability.toLowerCase()}</p>
    </Link>
  )
}
