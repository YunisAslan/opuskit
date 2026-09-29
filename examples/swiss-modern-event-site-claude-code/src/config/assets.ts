// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Paths under files you uploaded during creation point at the real file, already included in this package.
// Replacing a placeholder = replacing the file at that path or editing one line here.
// status: have = owner's file · temporary = stand-in (Unsplash) until the owner's photo arrives · create/find/optional = not in use yet
type Status = "have" | "temporary" | "find" | "create" | "optional"
type Base = { src: string; alt: string; status: Status; usage: string; credit?: string }
export type ImageAsset = Base & { kind: "image"; width: number; height: number }
export type VideoAsset = Base & { kind: "video" }

const photo = (file: string, width: number, height: number, alt: string, credit: string, usage = "Even grid and supporting images"): ImageAsset => ({
  kind: "image", src: `/media/photos/${file}.jpg`, width, height, alt, credit, status: "temporary", usage,
})

export const assets = {
  heroVideo: { kind: "video", src: "/media/heroVideo.mp4", alt: "", status: "have", usage: "Hero (loop or scroll-controlled) — reduced-motion playback on request" },
  scrubReadyEncode: { kind: "video", src: "/media/scrubReadyEncode.mp4", alt: "", status: "have", usage: "Scroll-controlled hero, desktop and tablet (16:9)" },
  mobileVideoEncode: { kind: "video", src: "/media/mobileVideoEncode.mp4", alt: "", status: "have", usage: "Hero on small screens (9:16)" },
  posterImage: { kind: "image", src: "/media/posterImage.jpg", width: 1920, height: 1078, alt: "Polo players riding across the field", status: "have", usage: "Shown before video loads and on reduced motion" },
  posterMobile: { kind: "image", src: "/media/posterMobile.jpg", width: 682, height: 1212, alt: "Polo players riding across the field", status: "have", usage: "Mobile poster" },
  widescreenVersion: { kind: "video", src: "/media/widescreenVersion.mp4", alt: "", status: "create", usage: "Desktop and tablet hero — fills 16:9 screens (AI-expanded master, not made yet)" },
  secondaryVideo: { kind: "video", src: "/media/secondaryVideo.mp4", alt: "", status: "optional", usage: "Chapter transitions" },

  // yourPhotos — Even grid. Temporary Unsplash set (owner asked for horses and related images), one shared grade.
  photoHerd: photo("herd", 2400, 1600, "Four horses running through long grass in mist", "Boys in Bristol Photography"),
  photoRider: photo("rider-grey", 1600, 2400, "A rider on a dark horse walking a sand track", "Dollar Gill"),
  photoJump: photo("jump", 2400, 1590, "A bay horse clearing a striped fence on a grass ring", "Melanie Hartshorn"),
  photoPalomino: photo("palomino", 2400, 1600, "A palomino horse at a stable door in a red halter", "Praswin Prakashan"),
  photoGallop: photo("gallop", 1858, 2400, "A bay horse cantering across a green field", "Michael Starkie"),
  photoBox: photo("box", 2400, 1920, "A dark horse with a white blaze looking out of its box", "Clayton Malquist"),
  photoGroom: photo("groom", 1602, 2400, "A groom in white standing beside a dark bay horse", "Oksana Kurochkina"),
  photoPonies: photo("ponies", 2400, 1838, "Grey ponies grazing in a mountain valley", "Martin Bennie"),

  // supportingImages
  photoStables: photo("stables", 2400, 1800, "The stable block with horses in open stalls", "Kyriacos Georgiou", "RSVP — Location exterior"),
  photoArena: photo("arena", 2400, 1802, "A chestnut horse in the covered arena at sunset", "Filipe dos Santos Mendes", "Venue & travel"),
  photoChestnut: photo("chestnut", 1600, 2400, "A rider on a chestnut horse by the paddock rail", "Philippe Oursel", "Venue & travel"),
} as const satisfies Record<string, ImageAsset | VideoAsset>

export type AssetKey = keyof typeof assets
export type ImageKey = { [K in AssetKey]: (typeof assets)[K] extends { kind: "image" } ? K : never }[AssetKey]

export const galleryKeys = ["photoHerd", "photoRider", "photoJump", "photoPalomino", "photoGallop", "photoBox", "photoGroom", "photoPonies"] as const satisfies readonly ImageKey[]
