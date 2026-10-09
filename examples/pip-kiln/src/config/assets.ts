// Asset reference layer. Components never hardcode media paths — they ask for a key.
// One entry per row of the shot list (recipe/media.md): its files at the exact size and ratio given, so a real photo
// replaces a temporary one file for file. alt starts as what the shot shows — rewrite it from the real photo.
// status 'temporary': every file below is a plain placeholder (the key written in its corner) until the owner's
// photos arrive — drop the real file into public/media/ under the same name and nothing else changes.
export const assets = {
  // Home · First screen — Product stage
  hero: { src: "/media/hero.jpg", width: 1920, height: 2400, ratio: '4:5', alt: "The Morning Person Mug alone on a calm ground, from its best angle", status: 'temporary' },
  // Home · Categories
  categories: { src: "/media/categories-1.jpg", files: ["/media/categories-1.jpg","/media/categories-2.jpg","/media/categories-3.jpg","/media/categories-4.jpg"], width: 1333, height: 2000, ratio: '2:3', alt: "one picture per category: its best piece", status: 'temporary' },
  // Home · Product Grid; Shop · Product Grid; Product · Product Grid; Cart · Product Grid
  productGrid: { src: "/media/productGrid-1.jpg", files: ["/media/productGrid-1.jpg","/media/productGrid-2.jpg","/media/productGrid-3.jpg","/media/productGrid-4.jpg","/media/productGrid-5.jpg","/media/productGrid-6.jpg"], width: 1333, height: 2000, ratio: '2:3', alt: "each product alone on the same ground, from the same angle, in the same light", status: 'temporary' },
  // Home · Collection; Shop · Collection
  collection: { src: "/media/collection-1.jpg", files: ["/media/collection-1.jpg","/media/collection-2.jpg","/media/collection-3.jpg","/media/collection-4.jpg"], width: 1600, height: 2400, ratio: '2:3', alt: "one picture per range: its best piece, all styled and lit the same way", status: 'temporary' },
  // Shop · Product Highlight
  productHighlight: { src: "/media/productHighlight.jpg", width: 2400, height: 2400, ratio: '1:1', alt: "the main product up close: in hand or in use, its material visible", status: 'temporary' },
  // Product · Product buy box — one set per product: replace {product} with each product's slug
  productPageBuy: { src: "/media/productPageBuy/{product}-1.jpg", files: ["/media/productPageBuy/{product}-1.jpg","/media/productPageBuy/{product}-2.jpg","/media/productPageBuy/{product}-3.jpg"], width: 1333, height: 2000, ratio: '2:3', alt: "the product from the front, at three-quarters and one close detail — the same ground and light as the grid", status: 'temporary' },
  // Product · Product Highlight — one set per product: replace {product} with each product's slug
  productPageHighlight: { src: "/media/productPageHighlight/{product}-1.jpg", width: 2400, height: 2400, ratio: '1:1', alt: "the main product up close: in hand or in use, its material visible", status: 'temporary' },
  // Workshops · Gallery
  gallery: { src: "/media/gallery-1.jpg", files: ["/media/gallery-1.jpg","/media/gallery-2.jpg","/media/gallery-3.jpg","/media/gallery-4.jpg","/media/gallery-5.jpg","/media/gallery-6.jpg","/media/gallery-7.jpg","/media/gallery-8.jpg"], width: 2400, height: 1600, ratio: '3:2', alt: "the place and what it makes, as a set: wide views, close details, people at work — one light, one grade", status: 'temporary' },
} as const

export type AssetKey = keyof typeof assets

export type ResolvedMedia = { src: string; width: number; height: number; alt: string; temporary: boolean }

/** One file of an asset: `index` picks from `files` (0-based), `product` fills the {product} slot. */
export function media(id: AssetKey, opts: { index?: number; product?: string; alt?: string } = {}): ResolvedMedia {
  const a = assets[id]
  const list: readonly string[] = 'files' in a ? a.files : [a.src]
  const raw = list[Math.min(opts.index ?? 0, list.length - 1)]
  const src = opts.product ? raw.replace('{product}', opts.product) : raw
  return { src, width: a.width, height: a.height, alt: opts.alt ?? a.alt, temporary: (a.status as string) === 'temporary' }
}

export const assetCount = (id: AssetKey) => {
  const a = assets[id]
  return 'files' in a ? a.files.length : 1
}
