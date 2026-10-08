// Asset reference layer. Components never hardcode media paths — they ask for a key.
// One entry per row of the shot list (recipe/media.md): its files at the exact size and ratio given, so a photo can be
// replaced file for file. alt says what each real photo shows; a key with several files has one alt per file (`alts`).
// status: 'have' — the owner's own photos; 'temporary' — a placeholder (shows a small badge in development).
export type Asset = {
  src: string
  files?: readonly string[]
  width: number
  height: number
  ratio: string
  alt: string
  alts?: readonly string[]
  status: 'have' | 'temporary'
}

export const assets = {
  // Home · Team — one portrait per person (order matches content/course.ts → team.people)
  team: {
    src: '/media/team-1.jpg',
    files: ['/media/team-1.jpg', '/media/team-2.jpg', '/media/team-3.jpg', '/media/team-4.jpg'],
    width: 2000,
    height: 2000,
    ratio: '1:1',
    alt: 'Black and white portrait of one of the teachers',
    alts: [
      'A woman with short curly hair in a dark top, black and white',
      'A bearded man in a white shirt, black and white',
      'A woman with a silver necklace and cuff, her hand at her chin, black and white',
      'A man in a white open-collar shirt, seated, black and white',
    ],
    status: 'have',
  },
  // Instructor · About
  about: {
    src: '/media/about.jpg',
    width: 2400,
    height: 1800,
    ratio: '4:3',
    alt: 'Hands inking a letterpress forme with a roller, black and white',
    status: 'have',
  },
} satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets
