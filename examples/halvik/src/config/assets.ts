// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Replacing a photo = replacing the file at that path (plus its -800 / -1600 / -full .webp sizes) or editing one line here.
// status: 'have' = the owner's real file; 'temporary' = stand-in to replace (shows a badge in dev).
type Asset = { src: string; alt: string; width: number; height: number; status: 'have' | 'temporary'; usage: string }

const photo = (name: string, width: number, height: number, alt: string, usage: string): Asset =>
  ({ src: `/media/${name}.jpg`, alt, width, height, status: 'have', usage })

export const assets = {
  hero: photo('hero', 2400, 1600, 'Halvik 65 from the side: cream keycaps over the green aluminium case, resting on its cork base', 'Home hero, product stage'),
  product: photo('product', 1600, 2400, 'Halvik 65 from above at three-quarters, on a felt desk mat', 'Home product highlight'),
  product2: photo('product-2', 1600, 2400, 'A corner of Halvik 65 tilted up close, showing the rounded case edge and Tab, Caps and Shift keys', 'Features product highlight'),
  row1: photo('row-1', 1600, 2400, 'The curved side of the Halvik 65 case, low and close', 'Typing-angle feature'),
  row2: photo('row-2', 2400, 1600, 'Halvik Dial: a small pad with sixteen cream keys and three aluminium knobs', 'Halvik Dial feature'),
  row3: photo('row-3', 2400, 1600, 'One bare switch standing between cream keycaps', 'Hot-swap switches feature'),
} satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets

/** srcset of the .webp sizes written next to each original: 800 and 1600 px on the long side, and full size. */
export function srcSetOf(key: AssetKey) {
  const a: Asset = assets[key]
  const base = a.src.replace(/\.jpg$/, '')
  const w = (long: number) => Math.round((long * a.width) / Math.max(a.width, a.height))
  return `${base}-800.webp ${w(800)}w, ${base}-1600.webp ${w(1600)}w, ${base}-full.webp ${a.width}w`
}
