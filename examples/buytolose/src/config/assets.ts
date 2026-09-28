// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Replacing a placeholder = replacing the file at that path or editing one line here.
// status: 'have' = real, final file · 'temporary' = stand-in (frame or cut from the hero video), replace before launch.

type Status = "have" | "temporary"
type Asset = {
  src: string
  alt: string
  status: Status
  usage: string
  kind: "image" | "video"
  width: number
  height: number
  poster?: string
}

const img = (src: string, alt: string, usage: string, width = 1000, height = 1250, status: Status = "temporary"): Asset =>
  ({ src, alt, status, usage, kind: "image", width, height })

export const assets = {
  heroVideo: { src: "/media/heroVideo.mp4", poster: "/media/posterImage.webp", alt: "", status: "have", kind: "video", width: 1280, height: 960, usage: "Hero loop, played on request under reduced motion" },
  scrubReadyEncode: { src: "/media/scrubReadyEncode.mp4", poster: "/media/posterImage.webp", alt: "", status: "have", kind: "video", width: 1280, height: 960, usage: "Scroll-controlled hero (GOP 4, H.264, 5.3MB)" },
  mobileVideoEncode: { src: "/media/mobileVideoEncode.mp4", poster: "/media/posterMobile.webp", alt: "", status: "temporary", kind: "video", width: 720, height: 1280, usage: "Hero on small screens (9:16 centre crop of the hero)" },
  secondaryVideo: { src: "/media/secondaryVideo.mp4", poster: "/media/collection-wide.webp", alt: "", status: "temporary", kind: "video", width: 1280, height: 960, usage: "404 loop (cut from the hero)" },
  posterImage: img("/media/posterImage.webp", "", "Shown before video loads and on reduced motion", 1280, 960, "have"),
  posterMobile: img("/media/posterMobile.webp", "", "Mobile hero poster", 720, 1280, "have"),

  collectionWide: img("/media/collection-wide.webp", "A figure in grey fleece lies flat on a city crosswalk, bag and drink scattered", "Home collection, desktop", 1600, 900),
  collectionTall: img("/media/collection-tall.webp", "A figure in grey fleece lies flat on a city crosswalk", "Home collection, mobile"),
  highlight1: img("/media/highlight-1.webp", "Close view of the blue star-print sling and its black strap", "Shop highlight chapter 1", 1600, 1200),
  highlight2: img("/media/highlight-2.webp", "The sling mid-air as its wearer falls", "Shop highlight chapter 2", 1600, 1200),
  highlight3: img("/media/highlight-3.webp", "The sling landing on the crosswalk", "Shop highlight chapter 3", 1600, 1200),
  aboutPortrait: img("/media/about-portrait.webp", "Young man in a grey zip hoodie, glasses and a backwards blue cap, holding an iced coffee", "About portrait"),
  closingWide: img("/media/closing-wide.webp", "A crisp packet thrown into the air over a crosswalk", "Contact closing media", 1600, 900),

  hoodieA: img("/media/product-hoodie-a.webp", "Grey zip hoodie worn with a star-print sling", "Product"),
  hoodieB: img("/media/product-hoodie-b.webp", "Grey zip hoodie, front zip detail", "Product alternate"),
  pantA: img("/media/product-pant-a.webp", "Wide grey fleece sweatpants over blue shoes", "Product"),
  pantB: img("/media/product-pant-b.webp", "Grey sweatpants mid-stride on a crosswalk", "Product alternate"),
  slingA: img("/media/product-sling-a.webp", "Blue star-print sling with black strap", "Product"),
  slingB: img("/media/product-sling-b.webp", "Star-print sling in the air", "Product alternate"),
  capA: img("/media/product-cap-a.webp", "Backwards blue cap with clear-frame glasses", "Product", 800, 1000),
  capB: img("/media/product-cap-b.webp", "Backwards blue cap, side light", "Product alternate", 800, 1000),
  cupA: img("/media/product-cup-a.webp", "Clear iced-drink cup with straw", "Product"),
  cupB: img("/media/product-cup-b.webp", "Clear cup tipping mid-fall", "Product alternate"),
  crispsA: img("/media/product-crisps-a.webp", "Open silver crisp packet with orange lightning print", "Product"),
  crispsB: img("/media/product-crisps-b.webp", "Silver crisp packet held out at arm's length", "Product alternate"),
} as const satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets
