// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Paths under files you uploaded during creation point at the real file, already included in this package.
// Replacing a placeholder = replacing the file at that path or editing one line here.
//
// yourPhotos-8.png (from p911-blue.png) arrived as a blank 300×150 canvas, so it is left out of the
// gallery below. Re-export the original, drop it at the same path and put the entry back in position 8.
export const assets = {
  yourPhotos: {
    src: "/media/yourPhotos-1.jpg", alt: '', status: 'have', usage: "Endless rows — rows of photos drifting endlessly in opposite directions.",
    gallery: ["/media/yourPhotos-1.jpg","/media/yourPhotos-2.jpg","/media/yourPhotos-3.jpg","/media/yourPhotos-4.jpg","/media/yourPhotos-5.jpg","/media/yourPhotos-6.jpg","/media/yourPhotos-7.jpg","/media/yourPhotos-9.jpg","/media/yourPhotos-10.jpg","/media/yourPhotos-11.jpg"],
    dims: [[564, 699], [720, 720], [736, 968], [720, 897], [1080, 1340], [720, 887], [1199, 799], [735, 1303], [736, 1307], [1152, 2048]],
    alts: [
      "Arctic Grey 911 GT3 RS with a bare carbon bonnet, parked under palms",
      "Gentian Blue 911 GT3 RS at the kerb outside a garden gate",
      "Black 911 GT3 RS in a concrete garage, a man leaning in at the bonnet",
      "Black 911 GT3 RS head-on, carbon Weissach bonnet",
      "911 GT3 RS from behind in a white studio, wing and light bar",
      "Midnight 911 in profile across a bare studio floor",
      "Black 911 Turbo emerging from a dark studio, tail light glowing",
      "Carmine red 911 GT3 against a red wall, headlight in close-up",
      "Racing Yellow 911 GT3 RS in a sunflower field",
      "Signal Yellow 911 on a road covered in autumn leaves",
    ],
  },
  heroVideo: { src: "/media/heroVideo.mp4", alt: '', status: 'have', usage: "Hero (loop or scroll-controlled)" },
  posterImage: { src: "/media/posterImage.jpg", alt: 'A black 911 GT3 RS headlight in close-up on a rooftop at dusk', status: 'have', usage: "Shown before video loads and on reduced motion" },
  posterMobile: { src: "/media/posterMobile.jpg", alt: 'A black 911 GT3 RS headlight in close-up on a rooftop at dusk', status: 'have', usage: "Mobile poster, 9:16" },
  mobileVideoEncode: { src: "/media/mobileVideoEncode.mp4", alt: '', status: 'have', usage: "Hero on small screens" },
  supportingImages: { src: "/media/supportingImages.jpg", alt: '', status: 'find', usage: "Sections between video moments" },
  secondaryVideo: { src: "/media/secondaryVideo.mp4", alt: '', status: 'have', usage: "Chapter transitions" },
  scrubReadyEncode: { src: "/media/scrubReadyEncode.mp4", alt: '', status: 'have', usage: "Scroll-controlled hero" },
  texture: { src: "/media/texture.png", alt: '', status: 'have', usage: "Subtle paper/grain overlay at ≤ 4% opacity" },
} as const

export type AssetKey = keyof typeof assets
