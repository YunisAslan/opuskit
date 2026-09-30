// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Paths under files you uploaded during creation point at the real file, already included in this package.
// Replacing a placeholder = replacing the file at that path or editing one line here.
export type AssetStatus = 'have' | 'temporary' | 'create' | 'find' | 'optional'
export type Asset = { src: string; alt: string; status: AssetStatus; usage: string; thumb?: string; width?: number; height?: number }

// Film grain — inline SVG noise, tiled at ≤ 4% opacity. No file to load.
const grain = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>')}`

// Temporary stills, pulled from your own hero film (same grade as the video). Replace with real photos
// at the same path — 2400px long edge — or point these keys somewhere else.
const still = (n: string, alt: string): Asset => ({ src: `/media/stills/still-${n}.jpg`, thumb: `/media/stills/still-${n}-sm.jpg`, alt, status: 'temporary', usage: 'Temporary still from the hero film', width: 1280, height: 720 })

export const assets = {
  heroVideo: { src: '/media/heroVideo.mp4', alt: '', status: 'have', usage: 'Hero (loop or scroll-controlled)', width: 1920, height: 1080 },
  scrubReadyEncode: { src: '/media/scrubReadyEncode.mp4', alt: '', status: 'have', usage: 'Scroll-controlled hero', width: 1920, height: 1080 },
  mobileVideoEncode: { src: '/media/mobileVideoEncode.mp4', alt: '', status: 'have', usage: 'Hero on small screens', width: 720, height: 1280 },
  posterImage: { src: '/media/posterImage.jpg', alt: 'A man in a fur-collared coat stands in falling snow', status: 'have', usage: 'Shown before video loads and on reduced motion', width: 1920, height: 1080 },
  posterMobile: { src: '/media/posterMobile.jpg', alt: 'A man in a fur-collared coat stands in falling snow', status: 'have', usage: 'Phone poster', width: 720, height: 1280 },
  texture: { src: grain, alt: '', status: 'have', usage: 'Subtle grain overlay at ≤ 4% opacity' },

  stillSnow: still('00', 'A man in a fur collar, snow caught on his face'),
  stillNightCity: still('01', 'A dark street at night, one red sign lit'),
  stillNoodleBar: still('02', 'A crowded street bar under neon in the rain'),
  stillWindow: still('03', 'One lit window in a dark building'),
  stillAdvert: still('04', 'A woman in a glowing advertisement looks out'),
  stillDesert: still('05', 'A lone figure walks through orange haze'),
  stillOrangeFace: still('06', 'A face lit orange, looking up into the haze'),
  stillNeon: still('07', 'A giant violet hologram points down at a street'),
  stillClouds: still('08', 'Seen from above, a man stands in grey snow'),
  stillHand: still('09', 'A man studies his open hand in pale fog'),
  stillHands: still('10', 'Hands pressed over a head in a strip-lit room'),
  stillStage: still('11', 'A figure stands before an empty lit stage'),
  stillScreenFace: still('12', 'A face flickers on a small screen in the dark'),
  stillFlower: still('13', 'A man holds a small yellow flower'),
  stillCorridor: still('14', 'A silhouette in a fog-filled underpass, headlights behind'),
  stillCar: still('15', 'A man in a long coat walks away from his car on grey sand'),
  stillCigarette: still('17', 'A hand lights a cigarette for a man leaning back'),
  stillTwoFigures: still('18', 'Two figures in blue darkness, one kneeling'),
  stillCrowd: still('19', 'A woman in a red fur coat on a crowded neon street'),
  stillWhiteRoom: still('20', 'A man smiles in a white room'),
} as const satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets

export const photoSet: AssetKey[] = [
  'stillSnow', 'stillNoodleBar', 'stillDesert', 'stillNeon', 'stillHand',
  'stillWindow', 'stillOrangeFace', 'stillStage', 'stillFlower', 'stillCar',
  'stillAdvert', 'stillClouds', 'stillScreenFace', 'stillCorridor', 'stillCigarette',
  'stillNightCity', 'stillHands', 'stillTwoFigures', 'stillCrowd', 'stillWhiteRoom',
]
