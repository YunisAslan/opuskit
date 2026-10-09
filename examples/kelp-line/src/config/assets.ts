// Asset reference layer. Components never hardcode media paths — they ask for a key.
// One entry per row of the shot list (recipe/media.md): its files at the exact size and ratio given, so a real photo
// replaces a temporary one file for file. alt starts as what the shot shows — rewrite it from the real photo.
//
// TEMPORARY: every file below is a plain placeholder (the key written in its corner) until the owner's photos arrive.
// To replace one, drop the real photo into public/media/ under the same name, then set its status to 'have' here and
// in assets/manifest.json. Nothing else changes.
export const assets = {
  // Home · First screen on phones — the same subject, cropped 4:5 with the focal point in the centre 60%
  mobileHeroCrop: { src: "/media/mobileHeroCrop.jpg", width: 1440, height: 1800, ratio: '4:5', alt: "Shafts of daylight fall through a dark kelp forest, the fronds hanging in deep green water.", status: 'have', usage: "Hero on small screens" },
  // Home · First screen — Editorial image hero
  hero: { src: "/media/hero.jpg", width: 1920, height: 2400, ratio: '4:5', alt: "Shafts of daylight fall through a dark kelp forest, the fronds hanging in deep green water.", status: 'have' },
  // Home · Editorial Story — seedlings on a line: hands lifting a seeded line out of the water
  storyHome: { src: "/media/storyHome.jpg", width: 1800, height: 2400, ratio: '3:4', alt: "Two hands lift a grown-over line out of cool green water beside a boat.", status: 'have' },
  // Our mission · Editorial Story — the waterline: a wide view of the cold coast and the water over the reef
  storyMission: { src: "/media/storyMission.jpg", width: 1800, height: 2400, ratio: '3:4', alt: "Grey surf washes over a dark shore rock fringed with brown kelp and wrack under a pale overcast sky.", status: 'have' },
  // Stories · Editorial Story — a Saturday on the north reef: divers in a small boat on a grey sea
  storyStories: { src: "/media/storyStories.jpg", width: 1800, height: 2400, ratio: '3:4', alt: "A small yellow rigid inflatable boat carries a group in life jackets across a calm grey-blue sea under a hazy sky.", status: 'have' },
  // Home · Journal
  journal: { src: "/media/journal-1.jpg", files: ["/media/journal-1.jpg","/media/journal-2.jpg","/media/journal-3.jpg"], width: 2000, height: 1333, ratio: '3:2', alt: "Divers in wetsuits sit in a small inflatable boat on a grey sea below a rocky headland.", alts: ["Divers in wetsuits sit in a small inflatable boat on a grey sea below a rocky headland.", "A walker in a blue jacket and backpack crosses a dark stony beach as surf breaks under an overcast sky.", "Two sea otters float among the bulbs and stipes of a kelp canopy at the water's surface."], status: 'have' },
  // Our mission · About
  about: { src: "/media/about.jpg", width: 1800, height: 2400, ratio: '3:4', alt: "A row of people in wetsuits stands at the edge of a wet grey beach facing the sea, a ship on the horizon.", status: 'have' },
  // Our mission · Team
  team: { src: "/media/team-1.jpg", files: ["/media/team-1.jpg","/media/team-2.jpg","/media/team-3.jpg","/media/team-4.jpg"], width: 1500, height: 2000, ratio: '3:4', alt: "A man in a hooded black wetsuit looks into the camera, squinting slightly in outdoor light.", alts: ["A man in a hooded black wetsuit looks into the camera, squinting slightly in outdoor light.", "A young woman with long hair and a dark jacket crouches on rocks by the sea and looks at the camera.", "A man in a dark green field jacket crouches on a scrubby hillside above a grey bay.", "A smiling woman in a beanie and dark puffer jacket stands on a rock at the edge of a grey sea."], status: 'have' },
  // Stories · Gallery
  gallery: { src: "/media/gallery-1.jpg", files: ["/media/gallery-1.jpg","/media/gallery-2.jpg","/media/gallery-3.jpg","/media/gallery-4.jpg","/media/gallery-5.jpg","/media/gallery-6.jpg","/media/gallery-7.jpg","/media/gallery-8.jpg"], width: 2400, height: 1600, ratio: '3:2', alt: "A lone figure stands on snow-streaked rocks looking out over a grey northern sea.", alts: ["A lone figure stands on snow-streaked rocks looking out over a grey northern sea.", "Sunbeams slant through tall kelp in blue-green water.", "Close-up of bladder wrack fronds lying on frosted, snow-dusted rock.", "A split view at the waterline shows a line strung with seaweed floating above a green seagrass bed.", "A long dark beach curves under a low grey sky beside a pale blue-grey sea.", "An underwater view of a shallow rocky seabed covered in golden-brown seaweed beneath a rippling surface.", "Ribbons of brown kelp and green sea lettuce washed up together on the shore.", "Hands haul a fishing net tangled with seaweed on a grey beach, small boats on the water behind."], status: 'have' },
  // Contact · Location
  location: { src: "/media/location.jpg", width: 1800, height: 2400, ratio: '3:4', alt: "A worn track of pebbles leads down a stony beach to the waves under a pale overcast sky.", status: 'have' },
} as const

export type AssetKey = keyof typeof assets

export type ResolvedAsset = { key: AssetKey; src: string; width: number; height: number; alt: string; temporary: boolean }

/** One file of an asset by key — `index` picks a file from a set (journal, team, gallery). */
export function asset(key: AssetKey, index = 0): ResolvedAsset {
  const a = assets[key]
  const files = 'files' in a ? (a.files as readonly string[]) : [a.src]
  const alts = 'alts' in a ? (a.alts as readonly string[]) : [a.alt]
  return { key, src: files[index] ?? a.src, width: a.width, height: a.height, alt: alts[index] ?? a.alt, temporary: (a.status as string) === 'temporary' }
}

/** How many files a set holds. */
export const assetCount = (key: AssetKey) => { const a = assets[key]; return 'files' in a ? a.files.length : 1 }
