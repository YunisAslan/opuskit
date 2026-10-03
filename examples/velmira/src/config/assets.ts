// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Replacing a file = dropping a new one at the same path, or editing one line here.
// status: 'have' = the owner's real file (sources in media-src/SOURCES.md), 'temporary' = stand-in to replace.
export type Asset = {
  src: string
  alt: string
  status: 'have' | 'temporary'
  usage: string
  width?: number
  height?: number
  /** Video only: the first frame, shown instantly and when the film can't play. */
  poster?: string
  /** Video only: the 9:16 phone encode and its first frame. */
  mobileSrc?: string
  mobilePoster?: string
}

const img = (file: string, width: number, height: number, alt: string, usage: string): Asset =>
  ({ src: `/media/${file}`, width, height, alt, usage, status: 'have' })

const all = {
  heroVideo: {
    src: '/media/heroVideo.mp4', mobileSrc: '/media/mobileVideoEncode.mp4',
    poster: '/media/posterImage.jpg', mobilePoster: '/media/posterMobile.jpg',
    width: 1920, height: 1080, alt: 'Mist drifting slowly over the dark water of the lake', status: 'have', usage: 'Home hero loop',
  },
  ambientSound: { src: '/media/ambientSound.mp3', alt: '', status: 'have', usage: 'The sound switch (AmbientSound), off until the visitor turns it on' },

  room1: img('room-1.jpg', 1600, 2400, 'Room 2: a low white bed under a high moulded ceiling, pale blue walls and an old standing mirror', 'Rooms'),
  room2: img('room-2.jpg', 1600, 2400, 'Room 5: a white bed pushed up against tall old wire-glass windows in soft daylight', 'Rooms'),
  room3: img('room-3.jpg', 1800, 2400, 'Room 8: white muslin bedding and taupe pillows below two plain wall lights', 'Rooms'),
  bath: img('bath.jpg', 2400, 1600, 'The bathhouse pool under a wooden roof, steam on the water and snowy firs outside', 'Feature rows, gallery'),
  lake: img('lake.jpg', 2400, 1600, 'An old wooden dock running out into still water lost in fog', 'Feature rows, gallery'),
  sauna: img('sauna.jpg', 2400, 1702, 'The wood-fired sauna: plank benches, stacked logs, an iron stove and a long bright window', 'Feature rows, gallery'),
  gallery1: img('gallery-1.jpg', 1600, 2400, 'A freestanding bath filling by a hazy window', 'Gallery, journal'),
  gallery2: img('gallery-2.jpg', 1600, 2400, 'The tops of fir trees fading into thick fog', 'Gallery, journal'),
  gallery3: img('gallery-3.jpg', 1600, 2400, 'A white cup with a tea infuser on a pale wooden table beside willow branches', 'Gallery, journal'),
  gallery4: img('gallery-4.jpg', 2400, 1600, 'Folded towels stacked on a white stool against a bare wall', 'Gallery, journal'),
  arrival: img('arrival.jpg', 2400, 1600, 'The dark gabled house among firs on the lake shore, mist rolling down the hill behind it', 'Collection, Getting here'),
} satisfies Record<string, Asset>

export type AssetKey = keyof typeof all
export const assets: Record<AssetKey, Asset> = all
