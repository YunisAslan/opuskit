// Asset reference layer. Components never hardcode media paths — they ask for a key.
// One entry per row of the shot list (recipe/media.md): its files at the exact size and ratio given, so a real photo
// replaces a temporary one file for file. alt starts as what the shot shows — rewrite it from the real photo.
// status 'have': the owner's real photo (credits in media-src/SOURCES.md). To swap one, replace the file in
// public/media/ under the same name and size, then rewrite its alt (and caption) from what the new photo shows.
export type AssetStatus = 'have' | 'temporary' | 'create' | 'find'

export const assets = {
  // Home · First screen — mobile crop (4:5)
  mobileHeroCrop: { src: '/media/mobileHeroCrop.jpg', width: 1600, height: 2000, ratio: '4:5', alt: 'A dim listening room: a lit wall of record sleeves on shelves above small round tables and dark chairs, a warm lamp glowing out of focus in front', status: 'have', usage: 'Hero on small screens' },
  // Home · First screen — Full-bleed photo with depth
  hero: { src: '/media/hero.jpg', width: 2800, height: 1575, ratio: '16:9', alt: 'A dim listening room: a lit wall of record sleeves on shelves above small round tables and dark chairs, a warm lamp glowing out of focus in front', status: 'have' },
  // Menu · Gallery — 8 photos, 3:2, 2400×1600
  gallery: {
    src: '/media/gallery-1.jpg',
    files: ['/media/gallery-1.jpg', '/media/gallery-2.jpg', '/media/gallery-3.jpg', '/media/gallery-4.jpg', '/media/gallery-5.jpg', '/media/gallery-6.jpg', '/media/gallery-7.jpg', '/media/gallery-8.jpg'],
    alts: [
      'Crates packed with records, seen from low down, under a red pendant lamp',
      'A tonearm resting on a spinning record, in soft warm light',
      'Biscuits on small white plates beside a glass of dark beer on a wooden bar, people talking behind',
      'A wall of big wood-framed speakers lit orange from below, amplifiers stacked beside them',
      'A hand flicking through records in a crate',
      'People at the bar in warm amber light, seen from outside through the window',
      'An amber drink on ice in a tumbler and a glass carafe on the wooden bar',
      'A cook in a cap and white jacket at work in a small, warm-lit kitchen',
    ],
    captions: ['Ten thousand, give or take', 'Needle down', 'Snacks and a stout', 'Built by hand', 'Digging for a side', 'Through the window', 'Something amber, on ice', 'Kitchen, late'],
    width: 2400, height: 1600, ratio: '3:2',
    alt: 'Low Hum: the records, the room, the bar and the kitchen',
    status: 'have',
  },
  // Reservations · Location
  location: { src: '/media/location.jpg', width: 1920, height: 2400, ratio: '4:5', alt: 'A dark green double door at night under a single lamp, a fanlight window above it', status: 'have' },
} as const

export type AssetKey = keyof typeof assets

export function asset(id: AssetKey, index?: number) {
  const a = assets[id] as (typeof assets)[AssetKey] & { files?: readonly string[]; alts?: readonly string[]; captions?: readonly string[] }
  const i = index ?? 0
  return {
    src: a.files?.[i] ?? a.src,
    alt: a.alts?.[i] ?? a.alt,
    caption: a.captions?.[i],
    width: a.width,
    height: a.height,
    ratio: a.ratio,
    temporary: (a.status as AssetStatus) === 'temporary',
  }
}

export const galleryCount = assets.gallery.files.length
