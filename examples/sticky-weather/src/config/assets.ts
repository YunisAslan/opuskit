// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Replacing a photo = replacing the file at that path or editing one line here. Sources: media-src/SOURCES.md.
// The stickers and the logo are drawn in code (src/components/Stickers.tsx, src/components/Logo.tsx), not files.
export type Asset = { src: string; alt: string; width: number; height: number; status: 'have' | 'temporary'; usage: string }

export const assets = {
  work1: { src: '/media/work-1.jpg', alt: 'A plain orange juice box standing on white plinths against a teal wall', width: 1600, height: 2400, status: 'have', usage: 'Squeeze Club project' },
  work2: { src: '/media/work-2.jpg', alt: 'A pink paper shopping bag with a teal star pattern down its side', width: 1499, height: 2400, status: 'have', usage: 'Starling Goods project' },
  work3: { src: '/media/work-3.jpg', alt: 'Two peach and white skincare boxes on a soft pink set', width: 1600, height: 2400, status: 'have', usage: 'Soft Hours project' },
  work4: { src: '/media/work-4.jpg', alt: 'A sheet of round stickers drawn like latte art', width: 1800, height: 2400, status: 'have', usage: 'Foam Party project' },
  work5: { src: '/media/work-5.jpg', alt: 'Sheets of blue and orange card folded over each other', width: 1800, height: 2400, status: 'have', usage: 'Linden Paper Mill project' },
  work6: { src: '/media/work-6.jpg', alt: 'A kraft box packed with lilac and pink business cards', width: 1600, height: 2400, status: 'have', usage: 'Lilac & Lark project' },
  studio1: { src: '/media/studio-1.jpg', alt: 'A designer at a desk covered in material samples and a cutting mat', width: 2400, height: 1350, status: 'have', usage: 'About' },
  studio2: { src: '/media/studio-2.jpg', alt: 'Paper colour swatches scattered across a white table', width: 2400, height: 1799, status: 'have', usage: 'Practice gallery' },
  studio3: { src: '/media/studio-3.jpg', alt: 'Hands pulling a screen-print frame beside a window', width: 2400, height: 1600, status: 'have', usage: 'Contact location' },
  studio4: { src: '/media/studio-4.jpg', alt: 'A desk of markers, watercolours and loose sketches', width: 2400, height: 1600, status: 'have', usage: 'Practice story' },
  studio5: { src: '/media/studio-5.jpg', alt: 'A fan of colour cards laid out in a circle on grey', width: 2400, height: 1600, status: 'have', usage: 'Practice gallery' },
  team1: { src: '/media/team-1.jpg', alt: 'Rio in a black mesh top in front of a pink and blue backdrop', width: 1600, height: 2400, status: 'have', usage: 'Team' },
  team2: { src: '/media/team-2.jpg', alt: 'Mara in glasses holding a pink gerbera against a pink wall', width: 1600, height: 2400, status: 'have', usage: 'Team' },
  team3: { src: '/media/team-3.jpg', alt: 'Arjun in a black shirt against a yellow wall', width: 1800, height: 2400, status: 'have', usage: 'Team' },
} as const satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets
