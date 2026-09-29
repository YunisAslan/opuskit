// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Paths under files you uploaded during creation point at the real file, already included in this package.
// Replacing a placeholder = replacing the file at that path or editing one line here.
// status: 'have' = real file in place; 'find' / 'create' = not supplied yet (MediaAsset renders a placeholder).
export type AssetStatus = 'have' | 'temporary' | 'find' | 'create' | 'optional'

export type Photo = { src: string; alt: string; width: number; height: number }

export const photos: Photo[] = [
  { src: "/media/yourPhotos-1.jpg", alt: "Mocha frappé with whipped cream and chocolate drizzle", width: 563, height: 1000 },
  { src: "/media/yourPhotos-2.jpg", alt: "Blueberry frappé topped with blueberry cream", width: 570, height: 1000 },
  { src: "/media/yourPhotos-3.jpg", alt: "Slice of blueberry cheesecake", width: 512, height: 512 },
  { src: "/media/yourPhotos-4.png", alt: "Iced matcha latte in a clear cup", width: 1152, height: 2048 },
  { src: "/media/yourPhotos-5.jpg", alt: "Iced caramel latte with ice", width: 736, height: 1308 },
  { src: "/media/yourPhotos-6.jpg", alt: "Iced coffee with a cold cream top", width: 632, height: 1000 },
  { src: "/media/yourPhotos-7.jpg", alt: "Iced mocha with whipped cream and caramel", width: 559, height: 1000 },
  { src: "/media/yourPhotos-8.jpg", alt: "Matcha frappé with whipped cream", width: 595, height: 1000 },
  { src: "/media/yourPhotos-9.jpg", alt: "Strawberry shake with fresh strawberries", width: 736, height: 1349 },
]

export const assets = {
  yourPhotos: { src: photos[0].src, alt: photos[0].alt, status: 'have', usage: "Liquid glass carousel — an endless strip of photos seen through a moving glass lens that bends light.", gallery: photos.map((p) => p.src) },
  heroVideo: { src: "/media/heroVideo.mp4", alt: '', status: 'have', usage: "Hero (loop or scroll-controlled)" },
  posterImage: { src: "/media/posterImage.jpg", alt: '', status: 'have', usage: "Shown before video loads and on reduced motion" },
  posterMobile: { src: "/media/posterMobile.jpg", alt: '', status: 'have', usage: "Poster for the 9:16 phone encode" },
  mobileVideoEncode: { src: "/media/mobileVideoEncode.mp4", alt: '', status: 'have', usage: "Hero on small screens" },
  supportingImages: { src: "/media/supportingImages.jpg", alt: '', status: 'find', usage: "Sections between video moments" },
  portrait: { src: "/media/portrait.jpg", alt: "The KOFİİ team behind the counter", status: 'find', usage: "About — portrait of the owners" },
  exterior: { src: "/media/exterior.jpg", alt: "The KOFİİ shop front from the street", status: 'find', usage: "Reservations — Location exterior image" },
  secondaryVideo: { src: "/media/secondaryVideo.mp4", alt: '', status: 'optional', usage: "Chapter transitions" },
  scrubReadyEncode: { src: "/media/scrubReadyEncode.mp4", alt: '', status: 'have', usage: "Scroll-controlled page background" },
  widescreenVersion: { src: "/media/widescreenVersion.mp4", alt: '', status: 'create', usage: "Desktop and tablet hero — fills 16:9 screens" },
} as const satisfies Record<string, { src: string; alt: string; status: AssetStatus; usage: string; gallery?: string[] }>

export type AssetKey = keyof typeof assets
