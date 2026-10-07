// Maps the copy deck's scents onto what the sections take, so every page lists products the same way.
import type { Product } from '@/components/sections/ProductGrid'
import type { Piece } from '@/components/sections/Collection'
import { getScent, gridPrice, scents, type Scent } from './products'

export const toProduct = (s: Scent): Product => ({
  slug: s.slug,
  name: s.name,
  price: gridPrice(s),
  image: s.images.front,
  alt: s.alt.front,
  hoverImage: s.images.angle,
  href: `/shop/${s.slug}`,
  place: s.place,
  hour: s.hour || undefined,
  availability: s.availability,
  badge: s.badge,
  quickSize: s.sizes.find((z) => z.label === '50 ml')?.label ?? s.sizes[0].label,
})

export const toPiece = (slug: string): Piece => {
  const s = getScent(slug)!
  return { name: s.name, price: gridPrice(s), image: `collection-${s.slug}` as Piece['image'], alt: `${s.name} in its place`, href: `/shop/${s.slug}`, place: s.place, hour: s.hour || undefined }
}

export const allProducts = scents.map(toProduct)
export const otherProducts = (slug: string, n = 3) => scents.filter((s) => s.slug !== slug).slice(0, n).map(toProduct)
