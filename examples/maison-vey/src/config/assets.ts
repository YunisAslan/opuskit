// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Every file below is a TEMPORARY placeholder (scripts/make-placeholders.py): a plain tone with its key in a corner,
// at the exact ratio and size of the shot list in recipe/media.md. Replacing one = dropping the real photo into
// public/media/ under the same name (or editing one line here). Nothing else changes.
export type AssetStatus = 'have' | 'temporary' | 'create' | 'find' | 'optional'
export type Asset = { src: string; alt: string; width: number; height: number; status: AssetStatus; usage: string }

export const assets = {
  productPhotography: { src: '/media/productPhotography.jpg', alt: "A Maison Vey bottle alone on an oxblood ground", width: 1600, height: 2000, status: 'temporary', usage: "Empty bag state" },
  lifestyleImages: { src: '/media/lifestyleImages.jpg', alt: "The workshop bench in Sète in late light", width: 2400, height: 1600, status: 'temporary', usage: "404 page" },
  turntableSequence: { src: '/media/turntableSequence.jpg', alt: "", width: 2400, height: 2400, status: 'temporary', usage: "Optional scroll-rotating product (not used yet; one frame of 24–48)" },
  hero: { src: '/media/hero.jpg', alt: "A Salt Quay bottle standing on a stone ledge in early harbour light", width: 2800, height: 1575, status: 'temporary', usage: "Home hero, desktop" },
  "hero-mobile": { src: '/media/hero-mobile.jpg', alt: "A Salt Quay bottle standing on a stone ledge in early harbour light", width: 2240, height: 2800, status: 'temporary', usage: "Home hero, phones" },
  "editorial-place": { src: '/media/editorial-place.jpg', alt: "The harbour at Sète before six, boats still moored", width: 2400, height: 1600, status: 'temporary', usage: "Home editorial story, opening image" },
  "editorial-hands": { src: '/media/editorial-hands.jpg', alt: "Hands pouring a batch through a glass funnel at the bench", width: 1920, height: 2400, status: 'temporary', usage: "Home editorial story, second image" },
  "highlight-salt-quay": { src: '/media/highlight-salt-quay.jpg', alt: "Salt Quay held in a hand, the glass stopper catching the light", width: 1920, height: 2400, status: 'temporary', usage: "Shop product highlight" },
  "about-portrait": { src: '/media/about-portrait.jpg', alt: "Hélène and Tomas Vey at the workshop bench in Sète", width: 1920, height: 2400, status: 'temporary', usage: "About portrait" },
  "product-salt-quay": { src: '/media/product-salt-quay.jpg', alt: "Salt Quay alone on an oxblood ground", width: 1600, height: 2000, status: 'temporary', usage: "Product grids, buy box (front)" },
  "product-salt-quay-angle": { src: '/media/product-salt-quay-angle.jpg', alt: "Salt Quay turned three-quarters to the light", width: 1600, height: 2000, status: 'temporary', usage: "Grid hover image, buy box (3/4)" },
  "product-salt-quay-detail": { src: '/media/product-salt-quay-detail.jpg', alt: "Close view of the Salt Quay label and stopper", width: 2400, height: 2400, status: 'temporary', usage: "Buy box (detail), Product page highlight" },
  "collection-salt-quay": { src: '/media/collection-salt-quay.jpg', alt: "Salt Quay styled in its place, lit like the rest of the range", width: 1920, height: 2400, status: 'temporary', usage: "Collection strips (Home, Shop)" },
  "product-orangery": { src: '/media/product-orangery.jpg', alt: "Orangery alone on an oxblood ground", width: 1600, height: 2000, status: 'temporary', usage: "Product grids, buy box (front)" },
  "product-orangery-angle": { src: '/media/product-orangery-angle.jpg', alt: "Orangery turned three-quarters to the light", width: 1600, height: 2000, status: 'temporary', usage: "Grid hover image, buy box (3/4)" },
  "product-orangery-detail": { src: '/media/product-orangery-detail.jpg', alt: "Close view of the Orangery label and stopper", width: 2400, height: 2400, status: 'temporary', usage: "Buy box (detail), Product page highlight" },
  "collection-orangery": { src: '/media/collection-orangery.jpg', alt: "Orangery styled in its place, lit like the rest of the range", width: 1920, height: 2400, status: 'temporary', usage: "Collection strips (Home, Shop)" },
  "product-fig-courtyard": { src: '/media/product-fig-courtyard.jpg', alt: "Fig Courtyard alone on an oxblood ground", width: 1600, height: 2000, status: 'temporary', usage: "Product grids, buy box (front)" },
  "product-fig-courtyard-angle": { src: '/media/product-fig-courtyard-angle.jpg', alt: "Fig Courtyard turned three-quarters to the light", width: 1600, height: 2000, status: 'temporary', usage: "Grid hover image, buy box (3/4)" },
  "product-fig-courtyard-detail": { src: '/media/product-fig-courtyard-detail.jpg', alt: "Close view of the Fig Courtyard label and stopper", width: 2400, height: 2400, status: 'temporary', usage: "Buy box (detail), Product page highlight" },
  "collection-fig-courtyard": { src: '/media/collection-fig-courtyard.jpg', alt: "Fig Courtyard styled in its place, lit like the rest of the range", width: 1920, height: 2400, status: 'temporary', usage: "Collection strips (Home, Shop)" },
  "product-reading-room": { src: '/media/product-reading-room.jpg', alt: "Reading Room alone on an oxblood ground", width: 1600, height: 2000, status: 'temporary', usage: "Product grids, buy box (front)" },
  "product-reading-room-angle": { src: '/media/product-reading-room-angle.jpg', alt: "Reading Room turned three-quarters to the light", width: 1600, height: 2000, status: 'temporary', usage: "Grid hover image, buy box (3/4)" },
  "product-reading-room-detail": { src: '/media/product-reading-room-detail.jpg', alt: "Close view of the Reading Room label and stopper", width: 2400, height: 2400, status: 'temporary', usage: "Buy box (detail), Product page highlight" },
  "collection-reading-room": { src: '/media/collection-reading-room.jpg', alt: "Reading Room styled in its place, lit like the rest of the range", width: 1920, height: 2400, status: 'temporary', usage: "Collection strips (Home, Shop)" },
  "product-night-ferry": { src: '/media/product-night-ferry.jpg', alt: "Night Ferry alone on an oxblood ground", width: 1600, height: 2000, status: 'temporary', usage: "Product grids, buy box (front)" },
  "product-night-ferry-angle": { src: '/media/product-night-ferry-angle.jpg', alt: "Night Ferry turned three-quarters to the light", width: 1600, height: 2000, status: 'temporary', usage: "Grid hover image, buy box (3/4)" },
  "product-night-ferry-detail": { src: '/media/product-night-ferry-detail.jpg', alt: "Close view of the Night Ferry label and stopper", width: 2400, height: 2400, status: 'temporary', usage: "Buy box (detail), Product page highlight" },
  "collection-night-ferry": { src: '/media/collection-night-ferry.jpg', alt: "Night Ferry styled in its place, lit like the rest of the range", width: 1920, height: 2400, status: 'temporary', usage: "Collection strips (Home, Shop)" },
  "product-discovery-set": { src: '/media/product-discovery-set.jpg', alt: "The Five Hours discovery set alone on an oxblood ground", width: 1600, height: 2000, status: 'temporary', usage: "Product grids, buy box (front)" },
  "product-discovery-set-angle": { src: '/media/product-discovery-set-angle.jpg', alt: "The Five Hours discovery set turned three-quarters to the light", width: 1600, height: 2000, status: 'temporary', usage: "Grid hover image, buy box (3/4)" },
  "product-discovery-set-detail": { src: '/media/product-discovery-set-detail.jpg', alt: "Close view of the The Five Hours discovery set label and stopper", width: 2400, height: 2400, status: 'temporary', usage: "Buy box (detail), Product page highlight" },
  "collection-discovery-set": { src: '/media/collection-discovery-set.jpg', alt: "The Five Hours discovery set styled in its place, lit like the rest of the range", width: 1920, height: 2400, status: 'temporary', usage: "Collection strips (Home, Shop)" },
} satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets
export const asset = (key: AssetKey): Asset => assets[key]
