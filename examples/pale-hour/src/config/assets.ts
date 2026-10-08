// Asset reference layer. Components never hardcode media paths — they ask for a key.
// One entry per row of the shot list (recipe/media.md): its files at the exact size and ratio given, so a real photo
// replaces a temporary one file for file. alt starts as what the shot shows — rewrite it from the real photo.
// Every file is the owner's real photograph (credits in media-src/SOURCES.md). To swap one, drop the new file into
// public/media/ under the same name; if it has another ratio, change its width/height here — layouts that keep native
// ratios (the gallery wall) follow it. Per-picture alt text for sets lives with its copy in src/content/site.ts.
import { getImageProps } from 'next/image'

export type AssetStatus = 'have' | 'temporary' | 'create' | 'find'

export const assets = {
  // Home · First screen on phones — 4:5 crop of the hero
  mobileHeroCrop: { src: "/media/mobileHeroCrop.jpg", width: 1600, height: 2000, ratio: '4:5', alt: "A white exhibition hall with tall factory windows, a dark landscape painting on the near wall and morning sun lying across the floor.", status: 'have', usage: "Hero on small screens" },
  // Home · First screen — Full-bleed photo with depth
  hero: { src: "/media/hero.jpg", width: 2800, height: 1575, ratio: '16:9', alt: "A white exhibition hall with tall factory windows, a dark landscape painting on the near wall and morning sun lying across the floor.", status: 'have' },
  // Home · Featured Work; Exhibitions · Featured Work
  featuredWork: { src: "/media/featuredWork-1.jpg", files: ["/media/featuredWork-1.jpg","/media/featuredWork-2.jpg","/media/featuredWork-3.jpg","/media/featuredWork-4.jpg"], width: 1800, height: 2400, ratio: '3:4', alt: "A work from each of the year's exhibitions.", status: 'have' },
  // Home · Journal
  journal: { src: "/media/journal-1.jpg", files: ["/media/journal-1.jpg","/media/journal-2.jpg","/media/journal-3.jpg"], width: 2000, height: 1333, ratio: '3:2', alt: "The picture that opens each journal post.", status: 'have' },
  // Exhibitions · Gallery
  gallery: { src: "/media/gallery-1.jpg", files: ["/media/gallery-1.jpg","/media/gallery-2.jpg","/media/gallery-3.jpg","/media/gallery-4.jpg","/media/gallery-5.jpg","/media/gallery-6.jpg","/media/gallery-7.jpg","/media/gallery-8.jpg"], width: 2400, height: 1600, ratio: '3:2', alt: "The rooms of the old print works and what happens in them.", status: 'have' },
  // Visit · Location
  location: { src: "/media/location.jpg", width: 1800, height: 2400, ratio: '3:4', alt: "Old timber doors standing open under a brick arch, a cobbled path running through to white buildings beyond.", status: 'have' },
  // About · About
  about: { src: "/media/about.jpg", width: 1800, height: 2400, ratio: '3:4', alt: "A woman with long dark hair in profile, in a knitted jumper, against a pale wall. Black and white.", status: 'have' },
  // About · Team
  team: { src: "/media/team-1.jpg", files: ["/media/team-1.jpg","/media/team-2.jpg","/media/team-3.jpg","/media/team-4.jpg"], width: 1500, height: 2000, ratio: '3:4', alt: "Portraits of the people who run Pale Hour, in black and white.", status: 'have' },
} as const

export type AssetKey = keyof typeof assets

export type Media = { src: string; width: number; height: number; alt: string; temporary: boolean; key: string }

/** One file of an asset: `media('gallery', 2)` is gallery-3. `alt` overrides the shot-list description. */
export function media(key: AssetKey, index = 0, alt?: string): Media {
  const a = assets[key]
  const files = 'files' in a ? (a.files as readonly string[]) : [a.src]
  const src = files[index] ?? files[0]
  return {
    src,
    width: a.width,
    height: a.height,
    alt: alt ?? a.alt,
    temporary: (a.status as AssetStatus) === 'temporary',
    key: src.replace(/^.*\/|\.\w+$/g, ''),
  }
}

/** Every file of an asset, in order. */
export function mediaSet(key: AssetKey, alts?: readonly string[]): Media[] {
  const a = assets[key]
  const n = 'files' in a ? a.files.length : 1
  return Array.from({ length: n }, (_, i) => media(key, i, alts?.[i]))
}

/** The source for a plain <img> shown about `cssWidth` px wide (the cursor trail), from next/image's own address
 *  logic, so it follows next.config: optimiser URLs on a Next server, the file itself in a static export. */
export function sized(m: Media, cssWidth: number) {
  const { props } = getImageProps({ src: m.src, alt: '', width: cssWidth, height: Math.round((cssWidth * m.height) / m.width) })
  return { src: props.src, srcSet: props.srcSet }
}
