// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Paths under files you uploaded during creation point at the real file, already included in this package.
// Replacing a placeholder = replacing the file at that path or editing one line here.
// status: 'have' = real, final asset · 'temporary' = stand-in, shows a badge in dev and must be replaced.
type Status = 'have' | 'temporary'
type Asset = { src: string; alt: string; status: Status; usage: string; width?: number; height?: number; kind: 'video' | 'image' }

export const assets = {
  heroVideo: { kind: 'video', src: "/media/heroVideo.mp4", alt: '', status: 'have', usage: "Hero (loop or scroll-controlled)", width: 1728, height: 992 },
  // From the original: free 2× Real-ESRGAN upscale (864→1728), then CRF 20 with a keyframe every 6 frames — instant seeking, sharp frames.
  scrubReadyEncode: { kind: 'video', src: "/media/scrubReadyEncode.mp4", alt: '', status: 'have', usage: "Scroll-controlled page background", width: 1728, height: 992 },
  // 9:16 centre crop of the upscaled master (CRF 22, keyframe every 6). Replace with a native vertical shoot when available.
  mobileVideoEncode: { kind: 'video', src: "/media/mobileVideoEncode.mp4", alt: '', status: 'have', usage: "Hero on small screens", width: 558, height: 992 },
  posterImage: { kind: 'image', src: "/media/posterImage.jpg", alt: 'A Keepers citrus coffee soda can among splashing orange halves on black', status: 'have', usage: "Shown before video loads and on reduced motion", width: 1728, height: 992 },
  posterMobile: { kind: 'image', src: "/media/posterMobile.jpg", alt: 'A Keepers citrus coffee soda can among splashing orange halves on black', status: 'have', usage: "Mobile poster", width: 1080, height: 1920 },

  // Supporting images — stills taken from the hero film, so the grade matches exactly.
  ingredients: { kind: 'image', src: "/media/ingredients.jpg", alt: 'Lemon slices, green coffee beans and ice cubes falling through the air', status: 'have', usage: "Features: ingredients", width: 1728, height: 992 },
  ringpull: { kind: 'image', src: "/media/ringpull.jpg", alt: 'A hand pulling the ring on a cold Keepers can', status: 'have', usage: "Features: can", width: 1728, height: 992 },
  pour: { kind: 'image', src: "/media/pour.jpg", alt: 'Amber coffee soda pouring into itself with a crown splash', status: 'have', usage: "Features: cold brew", width: 1728, height: 992 },
  canFloat: { kind: 'image', src: "/media/canFloat.jpg", alt: 'A Keepers can floating with a splash of soda and an ice cube', status: 'have', usage: "Product cards", width: 1728, height: 992 },
  canDetail: { kind: 'image', src: "/media/canDetail.jpg", alt: 'Close-up of the Keepers can label reading citrus coffee soda', status: 'have', usage: "Product cards", width: 1728, height: 992 },
  glassPour: { kind: 'image', src: "/media/glassPour.jpg", alt: 'Keepers poured over ice into a glass tumbler', status: 'have', usage: "Product cards", width: 1728, height: 992 },
  glassIce: { kind: 'image', src: "/media/glassIce.jpg", alt: 'A full glass of Keepers over ice with rising bubbles', status: 'have', usage: "Features: carbonation", width: 1728, height: 992 },
  canFinal: { kind: 'image', src: "/media/canFinal.jpg", alt: 'A Keepers can drifting through cold vapour', status: 'have', usage: "Closing CTA", width: 1728, height: 992 },

  // Temporary — Unsplash stand-ins. Replace with real founder portraits and your own roastery photo.
  founderOne: { kind: 'image', src: "/media/founderMarco.jpg", alt: 'Portrait of Marco Ferri, co-founder', status: 'temporary', usage: "About: portrait (Unsplash stand-in)", width: 1200, height: 1800 },
  founderTwo: { kind: 'image', src: "/media/founderLena.jpg", alt: 'Portrait of Lena Aydin, co-founder', status: 'temporary', usage: "About: portrait (Unsplash stand-in)", width: 1200, height: 1800 },
  beans: { kind: 'image', src: "/media/beans.jpg", alt: 'Roasted arabica beans from Huila, Colombia', status: 'temporary', usage: "Features and About: coffee (Unsplash stand-in)", width: 1600, height: 1220 },
} as const satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets
