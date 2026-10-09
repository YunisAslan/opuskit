// Asset reference layer. Components never hardcode media paths — they ask for a key.
// One entry per row of the shot list (recipe/media.md): its files at the exact size and ratio given, so a real photo
// replaces a temporary one file for file. Every photo is cropped centred to its ratio (media-src/fetch.sh).
// status 'have': the owner's photo is in public/media/ and `alts` says what each file really shows (media-src/picks.json).
// status 'temporary': a plain placeholder (the key written in its corner) until the owner's photo arrives — drop the
// real file into public/media/ under the same name, set its status to 'have' and write its alt.
// `fileStatus` sets the status per file where a set is part real, part temporary; `productAlts` gives the alt per
// product (and per file) for sets with a {product} slot.

type Status = 'have' | 'temporary'
type Asset = {
  src: string
  files?: readonly string[]
  width: number
  height: number
  ratio: string
  /** fallback alt — what the shot should show */
  alt: string
  /** what each real file shows, in the order of `files` */
  alts?: readonly string[]
  /** {product} sets: slug → alt per file (an empty slot falls back to the caller's alt, then `alt`) */
  productAlts?: Readonly<Record<string, readonly (string | null)[]>>
  status: Status
  fileStatus?: readonly Status[]
}

const SLUGS = ['morning-person-mug', 'big-hug-mug', 'sunny-side-plate', 'second-helping-plate', 'show-off-vase', 'bud-buddy-vase'] as const

const productGridAlts = [
  'A sunny yellow ceramic mug of black coffee held out by a hand into a plain light-grey frame.',
  'A big round-bellied black mug with a loop handle, alone on a bright sky-blue ground.',
  'An empty glossy mustard-yellow plate seen from above, spotlit on a white ground that falls off to grey at the corners.',
  'An empty deep bottle-green glazed plate with a leafy relief, seen from above on a pale grey-green stone ground with a few fern sprigs.',
  'A tall yellow vase painted with big blue-green leaves, holding yellow tulips, on a plain grey ground.',
  'A small pale-pink vase with a ruffled rim, alone on a white ground.',
] as const

export const assets = {
  // Home · First screen — Product stage
  hero: { src: "/media/hero.jpg", width: 1920, height: 2400, ratio: '4:5', status: 'have',
    alt: "A chunky butter-yellow mug with a black rim, full of milk, on a bright yellow ground with hard sunlight shadows and two eggs lying beside it." },
  // Home · Categories
  categories: { src: "/media/categories-1.jpg", files: ["/media/categories-1.jpg","/media/categories-2.jpg","/media/categories-3.jpg","/media/categories-4.jpg"], width: 1333, height: 2000, ratio: '2:3', status: 'have',
    alt: "one picture per category: its best piece",
    alts: [
      "A yellow, a black, a red and a lilac mug stacked and tipped together on a plain olive-khaki ground.",
      "Glossy red, orange, yellow, pink-violet and blue plates laid overlapping on a pale wooden table, seen from above.",
      "A round teal glazed vase holding yellow gerberas, standing on a white surface against a red wall.",
      "Clay-covered hands shaping a pale grey pot on a turning wheel, in soft daylight.",
    ] },
  // Home · Product Grid; Shop · Product Grid; Product · Product Grid; Cart · Product Grid
  productGrid: { src: "/media/productGrid-1.jpg", files: ["/media/productGrid-1.jpg","/media/productGrid-2.jpg","/media/productGrid-3.jpg","/media/productGrid-4.jpg","/media/productGrid-5.jpg","/media/productGrid-6.jpg"], width: 1333, height: 2000, ratio: '2:3', status: 'have',
    alt: "each product alone on the same ground, from the same angle, in the same light",
    alts: productGridAlts },
  // Home · Collection; Shop · Collection
  collection: { src: "/media/collection-1.jpg", files: ["/media/collection-1.jpg","/media/collection-2.jpg","/media/collection-3.jpg","/media/collection-4.jpg"], width: 1600, height: 2400, ratio: '2:3', status: 'have',
    alt: "one picture per range: its best piece, all styled and lit the same way",
    alts: [
      "A small stack of cream glazed plates with one clementine on top and a mustard linen napkin, on a plain cream ground.",
      "A tipped stack of small cream bowls on a bright yellow ground, with hard sunlight shadows.",
      "An empty peachy-pink glazed plate with a leafy relief, seen from above on a pale grey-green stone ground with a few fern sprigs.",
      "A small sky-blue pebble-shaped plate with a pink lollipop on it, alone on a bright pink ground.",
    ] },
  // Shop · Product Highlight
  productHighlight: { src: "/media/productHighlight.jpg", width: 2400, height: 2400, ratio: '1:1', status: 'have',
    alt: "Two hands with pink nails cradling a cup of tea with a speckled teal rim, over a soft pink ground." },
  // Product · Product buy box — one set per product: replace {product} with each product's slug.
  // File 1 is the product's grid photo (real); files 2–3 (three-quarters, close detail) wait for the owner's shoot.
  productPageBuy: { src: "/media/productPageBuy/{product}-1.jpg", files: ["/media/productPageBuy/{product}-1.jpg","/media/productPageBuy/{product}-2.jpg","/media/productPageBuy/{product}-3.jpg"], width: 1333, height: 2000, ratio: '2:3',
    alt: "the product from the front, at three-quarters and one close detail — the same ground and light as the grid",
    productAlts: Object.fromEntries(SLUGS.map((s, i) => [s, [productGridAlts[i], null, null]])),
    status: 'temporary', fileStatus: ['have', 'temporary', 'temporary'] },
  // Product · Product Highlight — one set per product: replace {product} with each product's slug. Waits for the owner's shoot.
  productPageHighlight: { src: "/media/productPageHighlight/{product}-1.jpg", width: 2400, height: 2400, ratio: '1:1', alt: "the main product up close: in hand or in use, its material visible", status: 'temporary' },
  // Workshops · Gallery
  gallery: { src: "/media/gallery-1.jpg", files: ["/media/gallery-1.jpg","/media/gallery-2.jpg","/media/gallery-3.jpg","/media/gallery-4.jpg","/media/gallery-5.jpg","/media/gallery-6.jpg","/media/gallery-7.jpg","/media/gallery-8.jpg"], width: 2400, height: 1600, ratio: '3:2', status: 'have',
    alt: "the place and what it makes, as a set: wide views, close details, people at work — one light, one grade",
    alts: [
      "A hand pressing into a small clay cup as it spins on a blurred potter's wheel.",
      "Two people's hands working one pot together on a wheel, seen from above in bright light.",
      "Clay-stained hands wedging a lump of clay on a worn wooden table.",
      "A hand brushing a dark butterfly onto a pale plate on a banding wheel; the painter's face is out of frame.",
      "A person in a red sleeve carving small clay cups at a long class table.",
      "Wooden studio shelves stacked with pale bisque bowls, cups and vases waiting to be glazed.",
      "Small pale cups standing on white kiln bricks with orange fire glowing underneath.",
      "A shelf crowded with cheerful hand-painted bowls, cups and dishes in yellow, blue and cream.",
    ] },
} as const satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets

export type ResolvedMedia = { src: string; width: number; height: number; alt: string; temporary: boolean }

/**
 * One file of an asset: `index` picks from `files` (0-based), `product` fills the {product} slot.
 * The alt of a real file is what that photo shows; pass `opts.alt` only where the picture does a different job
 * (a link's name, or "" for a decorative copy) or where the file is still temporary.
 */
export function media(id: AssetKey, opts: { index?: number; product?: string; alt?: string } = {}): ResolvedMedia {
  const a: Asset = assets[id]
  const list = a.files ?? [a.src]
  const i = Math.min(opts.index ?? 0, list.length - 1)
  const src = opts.product ? list[i].replace('{product}', opts.product) : list[i]
  const temporary = (a.fileStatus?.[i] ?? a.status) === 'temporary'
  const real = temporary ? undefined : (opts.product ? a.productAlts?.[opts.product]?.[i] : undefined) ?? a.alts?.[i] ?? a.alt
  const alt = opts.alt ?? real ?? a.alt
  return { src, width: a.width, height: a.height, alt, temporary }
}

export const assetCount = (id: AssetKey) => {
  const a: Asset = assets[id]
  return a.files?.length ?? 1
}
