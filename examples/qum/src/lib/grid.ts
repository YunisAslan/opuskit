import { assets } from '@/config/assets'
import { money, products, type Product } from '@/data/shop'
import { posts } from '@/data/journal'

// Data in the shape the ready sections take.
export const gridItems = (list: Product[] = products) => list.map((p) => ({
  name: p.extra ? `${p.name}, the small extra` : p.name,
  price: money(p.price),
  image: assets[p.images[0]].src, alt: assets[p.images[0]].alt,
  hoverImage: p.images[1] ? assets[p.images[1]].src : undefined,
  href: `/shop/${p.slug}`,
}))

export const journalEntries = (skip?: string) => posts.filter((p) => p.slug !== skip).map((p) => ({
  title: p.title, date: p.date, category: p.kicker, href: `/journal/${p.slug}`, image: assets[p.image].src, alt: assets[p.image].alt,
}))
