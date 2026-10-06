// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Paths under files you uploaded during creation point at the real file, already included in this package.
// Replacing a placeholder = replacing the file at that path or editing one line here.
export const assets = {
  photographySet: { src: "/media/photographySet.jpg", alt: '', status: 'find', usage: "Hero, section media, gallery" },
  mobileHeroCrop: { src: "/media/mobileHeroCrop.jpg", alt: '', status: 'find', usage: "Hero on small screens" },
} as const

export type AssetKey = keyof typeof assets
