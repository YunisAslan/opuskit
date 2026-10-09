// Asset reference layer. Components never hardcode media paths — they ask for a key.
// One entry per row of the shot list (recipe/media.md): its files at the exact size and ratio given, so a real photo
// replaces a temporary one file for file. alt starts as what the shot shows — rewrite it from the real photo.
//
// TEMPORARY: every file below is a plain placeholder (the key written in its corner) until the owner's photos arrive.
// To replace one, drop the real photo into public/media/ under the same name, then set its status to 'have' here and
// in assets/manifest.json. Nothing else changes.
export const assets = {
  // Home · First screen on phones — the same subject, cropped 4:5 with the focal point in the centre 60%
  mobileHeroCrop: { src: "/media/mobileHeroCrop.jpg", width: 1440, height: 1800, ratio: '4:5', alt: "Hero on small screens", status: 'temporary', usage: "Hero on small screens" },
  // Home · First screen — Editorial image hero
  hero: { src: "/media/hero.jpg", width: 1920, height: 2400, ratio: '4:5', alt: "The opening picture of Kelp Line: the place, the thing it makes or the person, at its best light, with calm space where the headline sits", status: 'temporary' },
  // Home · Editorial Story — seedlings on a line: hands lifting a seeded line out of the water
  storyHome: { src: "/media/storyHome.jpg", width: 1800, height: 2400, ratio: '3:4', alt: "Hands lifting a seeded line of young kelp out of the water", status: 'temporary' },
  // Our mission · Editorial Story — the waterline: a wide view of the cold coast and the water over the reef
  storyMission: { src: "/media/storyMission.jpg", width: 1800, height: 2400, ratio: '3:4', alt: "A wide view of the cold coast and the water over the reef", status: 'temporary' },
  // Stories · Editorial Story — a Saturday on the north reef: divers in a small boat on a grey sea
  storyStories: { src: "/media/storyStories.jpg", width: 1800, height: 2400, ratio: '3:4', alt: "Divers in a small boat on a grey sea over the north reef", status: 'temporary' },
  // Home · Journal
  journal: { src: "/media/journal-1.jpg", files: ["/media/journal-1.jpg","/media/journal-2.jpg","/media/journal-3.jpg"], width: 2000, height: 1333, ratio: '3:2', alt: "one picture per post, the one that opens it", status: 'temporary' },
  // Our mission · About
  about: { src: "/media/about.jpg", width: 1800, height: 2400, ratio: '3:4', alt: "a real portrait of the person or the team, in their own place", status: 'temporary' },
  // Our mission · Team
  team: { src: "/media/team-1.jpg", files: ["/media/team-1.jpg","/media/team-2.jpg","/media/team-3.jpg","/media/team-4.jpg"], width: 1500, height: 2000, ratio: '3:4', alt: "one portrait per person, in the same light and framing, ideally where they work", status: 'temporary' },
  // Stories · Gallery
  gallery: { src: "/media/gallery-1.jpg", files: ["/media/gallery-1.jpg","/media/gallery-2.jpg","/media/gallery-3.jpg","/media/gallery-4.jpg","/media/gallery-5.jpg","/media/gallery-6.jpg","/media/gallery-7.jpg","/media/gallery-8.jpg"], width: 2400, height: 1600, ratio: '3:2', alt: "the place and what it makes, as a set: wide views, close details, people at work — one light, one grade", status: 'temporary' },
  // Contact · Location
  location: { src: "/media/location.jpg", width: 1800, height: 2400, ratio: '3:4', alt: "the way in as visitors arrive — the door, the street, the path", status: 'temporary' },
} as const

export type AssetKey = keyof typeof assets

export type ResolvedAsset = { key: AssetKey; src: string; width: number; height: number; alt: string; temporary: boolean }

/** One file of an asset by key — `index` picks a file from a set (journal, team, gallery). */
export function asset(key: AssetKey, index = 0): ResolvedAsset {
  const a = assets[key]
  const files = 'files' in a ? (a.files as readonly string[]) : [a.src]
  return { key, src: files[index] ?? a.src, width: a.width, height: a.height, alt: a.alt, temporary: a.status === 'temporary' }
}

/** How many files a set holds. */
export const assetCount = (key: AssetKey) => { const a = assets[key]; return 'files' in a ? a.files.length : 1 }
